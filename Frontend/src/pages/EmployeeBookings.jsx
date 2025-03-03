import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/employeeBookings.css";

const EmployeeBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const employeeData = JSON.parse(localStorage.getItem("user"));
  const employeeId = employeeData.id;  // Assuming employeeId is 1 for now, update if necessary.
  console.log(employeeId);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!employeeId) {
          throw new Error("Employee ID not found.");
        }

        const response = await api.get(
          `api/bookings/employee/${employeeId}`
        );
        console.log(response.data);

        if (response.data && Array.isArray(response.data)) {
          setBookings(response.data);
        } else {
          setBookings([]);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [employeeId]);

  if (loading) {
    return <div className="loading">Loading bookings...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!bookings.length) {
    return <div className="no-bookings">No bookings assigned to you yet.</div>;
  }

  return (
    <div className="bookings-container1">
      <h2 className="title1">Your Bookings</h2>
      <div className="bookings-grid1">
        {bookings.map((booking) => {
          // Ensure that booking data is valid
          if (
            !booking.bookingDate ||
            !booking.eventDate ||
            !booking.bookingPackage ||
            !booking.venue ||
            !booking.user
          ) {
            return null; // Skip this booking if data is incomplete
          }

          const bookingDate = new Date(
            booking.bookingDate[0], // Year
            booking.bookingDate[1] - 1, // Month (zero-indexed)
            booking.bookingDate[2] // Day
          ).toLocaleDateString();

          const eventDate = new Date(
            booking.eventDate[0], // Year
            booking.eventDate[1] - 1, // Month (zero-indexed)
            booking.eventDate[2] // Day
          ).toLocaleDateString();

          return (
            <div key={booking.id} className="booking-card1">
              <h3 className="booking-title1">Booking #{booking.id}</h3>
              <p>
                <strong>Booking Date:</strong> {bookingDate}
              </p>
              <p>
                <strong>Event Date:</strong> {eventDate}
              </p>
              <p>
                <strong>Package:</strong> {booking.bookingPackage.title}
              </p>
              <p>
                <strong>Package Description:</strong> {booking.bookingPackage.description}
              </p>
              <p>
                <strong>Price:</strong> {booking.bookingPackage.price}
              </p>
              <p>
                <strong>Venue:</strong> {booking.venue.name}
              </p>
              <p>
                <strong>Venue Location:</strong> {booking.venue.location}
              </p>
              <p>
                <strong>User Name:</strong> {booking.user.name}
              </p>
              <p>
                <strong>User Contact:</strong> {booking.user.mobileNumber}
              </p>
              <div className="venue-image-container1">
                <img
                  src={booking.venue.image}
                  alt={booking.venue.name}
                  className="venue-image1"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeBookings;
