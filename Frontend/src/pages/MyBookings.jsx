import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/MyBookings.css"; // Include the CSS file for styling

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null); // State to hold the selected booking for details view

  useEffect(() => {
    const fetchBookings = async () => {
      const userId = JSON.parse(localStorage.getItem("user"))?.id; // Check if user exists in localStorage
      if (!userId) {
        setError("User not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/api/bookings/${userId}`);
        console.log(response.data);

        if (Array.isArray(response.data)) {
          setBookings(response.data);
        } else {
          setBookings([]); // Reset to an empty array if the data is not in the expected format
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to load bookings. Please try again later.");
        setLoading(false);
      }
    };

    fetchBookings();
  }, []); // Empty dependency array means it runs only once when the component is mounted

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
  };

  const handleCloseDetails = () => {
    setSelectedBooking(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading your bookings...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="bookings-container">
      <h1 className="page-title">My Bookings</h1>

      {selectedBooking ? (
        <div className="booking-details-expanded">
          <h2 className="detail-title">Booking Details</h2>
          <div className="details-content">
            <img
              className="detail-image"
              src={selectedBooking.bookingPackage?.image}
              alt={selectedBooking.bookingPackage?.title}
            />
            <div className="details-info">
              <h3>{selectedBooking.bookingPackage?.title || "No Package Title"}</h3>
              <p>
                <strong>Description:</strong>{" "}
                {selectedBooking.bookingPackage?.description || "No Description"}
              </p>
              <p>
                <strong>Price:</strong>{" "}
                {selectedBooking.bookingPackage?.price || "Not Available"}
              </p>
              <p>
                <strong>Venue:</strong> {selectedBooking.venue?.name || "No Venue"}
              </p>
              <p>
                <strong>Location:</strong>{" "}
                {selectedBooking.venue?.location || "No Location"}
              </p>
              <p>
                <strong>Manager:</strong>{" "}
                {selectedBooking.venue?.manager || "No Manager"}
              </p>
              <p>
                <strong>Employee Name:</strong>{" "}
                {selectedBooking.employee?.name || "Not Available"}
              </p>
              <p>
                <strong>Employee Number:</strong>{" "}
                {selectedBooking.employee?.phone || "Not Available"}
              </p>
              <p>
                <strong>Employee Email:</strong>{" "}
                {selectedBooking.employee?.email || "Not Available"}
              </p>
            </div>
          </div>
          <button className="close-details-btn" onClick={handleCloseDetails}>
            Close
          </button>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.length === 0 ? (
            <p>No bookings found. You can create a new booking now!</p>
          ) : (
            bookings.map((booking) => (
              <div className="booking-card" key={booking.id}>
                <div className="booking-header">
                  <h3 className="venue-title">
                    {booking.venue?.name || "Venue Not Available"}
                  </h3>
                  <span className="booking-date">
                    {booking.bookingDate && Array.isArray(booking.bookingDate)
                      ? new Date(
                          booking.bookingDate[0],
                          booking.bookingDate[1] - 1,
                          booking.bookingDate[2]
                        ).toLocaleDateString()
                      : "Date not available"}
                  </span>
                </div>
                <div className="booking-details">
                  <p>
                    <strong>Package:</strong>{" "}
                    {booking.bookingPackage?.title || "Not Available"}
                  </p>
                  <p>
                    <strong>Event Date:</strong>{" "}
                    {booking.eventDate && Array.isArray(booking.eventDate)
                      ? new Date(
                          booking.eventDate[0],
                          booking.eventDate[1] - 1,
                          booking.eventDate[2]
                        ).toLocaleDateString()
                      : "Date not available"}
                  </p>
                  <p>
                    <strong>Employee:</strong> {booking.employee?.name || "Not Available"}
                  </p>
                  <p>
                    <strong>Employee Number:</strong> {booking.employee?.phone || "Not Available"}
                  </p>
                  <p>
                    <strong>Employee Email:</strong> {booking.employee?.email || "Not Available"}
                  </p>
                  <p>
                    <strong>Venue Type:</strong> {booking.venue?.type || "Not Available"}
                  </p>
                </div>
                <button
                  className="view-details-btn"
                  onClick={() => handleViewDetails(booking)}
                >
                  View Details
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
