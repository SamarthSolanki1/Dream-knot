import React, { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Avatar from 'react-avatar'; // Import Avatar component
import api from "../api"; // Ensure API is correctly configured
import "../styles/Viewemployee.css";

const Viewusers = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState();

  useEffect(() => {
    // Fetch users from backend
    api.get("/employee")
      .then(response => {
        const filteredUsers = response.data.filter(user => user.role === "Employee");
        setUsers(filteredUsers);
      })
      .catch(error => console.error("Error fetching users:", error));
  }, []);

    const handleOpen = (userId) => {
        setSelectedUserId(userId);
        api.get(`/api/bookings/employee/${userId}`)
          .then(response => {
            console.log("Booking details response:", response.data);
            const bookingData = response.data[0];  // Assuming response is an array, take the first element
            setBookingDetails(bookingData);
            setOpen(true);
          })
          .catch(error => console.error("Error fetching booking details:", error));
      };
      

  const handleClose = () => {
    setOpen(false);
    setBookingDetails(null);
    setSelectedUserId(null);
  };

  return (
    <div className="view-users-container">
      <h2 className="title">All Employee</h2>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow className="table-header">
              <TableCell>Profile</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map(user => (
                <TableRow key={user.id} className="table-row">
                  <TableCell><Avatar name={user.name} size="30" round /></TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.mobileNumber}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" className="bookings-btn" onClick={() => handleOpen(user.id)}>
                      Bookings
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="no-data">No users found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal to show booking details */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent>
          {bookingDetails ? (
            <div>
              <h4><strong>Venue:</strong> {bookingDetails.venue?.name || "N/A"}</h4>
              <p><strong>Venue Type:</strong> {bookingDetails.venue?.type || "N/A"}</p>
              <p><strong>Location:</strong> {bookingDetails.venue?.location || "N/A"}</p>
              <img src={bookingDetails.venue?.image} alt="Venue" style={{ width: "100%", height: "auto" }} />
              <p><strong>Booking Package:</strong> {bookingDetails.bookingPackage?.title || "N/A"}</p>
              <p><strong>Package Description:</strong> {bookingDetails.bookingPackage?.description || "N/A"}</p>
              <p><strong>Package Price:</strong> ₹{bookingDetails.bookingPackage?.price || "0"}</p>
              <p><strong>Booked By:</strong> {bookingDetails.user?.name || "0"}</p>
              <p><strong>Client email:</strong> {bookingDetails.user?.email || "0"}</p>
              <p><strong>Booked Date:</strong> {
                bookingDetails.bookingDate?.length === 3
                  ? new Date(bookingDetails.bookingDate[0], bookingDetails.bookingDate[1] - 1, bookingDetails.bookingDate[2]).toLocaleDateString()
                  : "N/A"
              }</p>
              
              <p><strong>Event Date:</strong> {
                bookingDetails.eventDate?.length === 3
                  ? new Date(bookingDetails.eventDate[0], bookingDetails.eventDate[1] - 1, bookingDetails.eventDate[2]).toLocaleDateString()
                  : "N/A"
              }</p>
            </div>
          ) : (
            <p>No bookings Assigned</p>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Viewusers;
