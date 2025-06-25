import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/EmployeeBookings.css";

const EmployeeBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming"); // Default to upcoming tab

  useEffect(() => {
    const fetchBookings = async () => {
      const employeeId = JSON.parse(localStorage.getItem("user"))?.id;
      if (!employeeId) {
        setError("Employee not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`api/bookings/employee/${employeeId}`);
        console.log(response.data);

        if (Array.isArray(response.data)) {
          setBookings(response.data);
        } else {
          setBookings([]);
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to load bookings. Please try again later.");
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
  };

  const handleCloseDetails = () => {
    setSelectedBooking(null);
  };

  // Separate bookings into past and upcoming
  const getCurrentDate = () => {
    const today = new Date();
    return today;
  };

  const isUpcoming = (bookingDate) => {
    if (!bookingDate || !Array.isArray(bookingDate)) return false;
    
    const eventDate = new Date(
      bookingDate[0],
      bookingDate[1] - 1,
      bookingDate[2]
    );
    return eventDate >= getCurrentDate();
  };

  const upcomingBookings = bookings.filter(booking => 
    isUpcoming(booking.eventDate || booking.bookingDate)
  );
  
  const pastBookings = bookings.filter(booking => 
    !isUpcoming(booking.eventDate || booking.bookingDate)
  );

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading assigned bookings...</h2>
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
      <h1 className="page-title">My Assigned Events</h1>
      
      {/* Tab Navigation */}
      <div className="booking-tabs">
        <button 
          className={`tab-button ${activeTab === "upcoming" ? "active" : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Events ({upcomingBookings.length})
        </button>
        <button 
          className={`tab-button ${activeTab === "past" ? "active" : ""}`}
          onClick={() => setActiveTab("past")}
        >
          Past Events ({pastBookings.length})
        </button>
      </div>

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
                <strong>Customer Name:</strong>{" "}
                {selectedBooking.user?.name || "Not Available"}
              </p>
              <p>
                <strong>Customer Phone:</strong>{" "}
                {selectedBooking.user?.phone || "Not Available"}
              </p>
              <p>
                <strong>Customer Email:</strong>{" "}
                {selectedBooking.user?.email || "Not Available"}
              </p>
              <p>
                <strong>Event Date:</strong>{" "}
                {selectedBooking.eventDate && Array.isArray(selectedBooking.eventDate)
                  ? new Date(
                      selectedBooking.eventDate[0],
                      selectedBooking.eventDate[1] - 1,
                      selectedBooking.eventDate[2]
                    ).toLocaleDateString()
                  : "Date not available"}
              </p>
              <p>
                <strong>Special Requirements:</strong>{" "}
                {selectedBooking.specialRequirements || "None"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedBooking.status || "Confirmed"}
              </p>
            </div>
          </div>
          <button className="close-details-btn" onClick={handleCloseDetails}>
            Close
          </button>
        </div>
      ) : (
        <div className="bookings-list">
          {activeTab === "upcoming" && upcomingBookings.length === 0 && (
            <div className="no-bookings-message">
              <p>No upcoming events assigned to you.</p>
            </div>
          )}
          
          {activeTab === "past" && pastBookings.length === 0 && (
            <div className="no-bookings-message">
              <p>No past events found.</p>
            </div>
          )}
          
          {activeTab === "upcoming" && upcomingBookings.map((booking) => (
            <div className="booking-card" key={booking.id}>
              <div className="booking-header">
                <h3 className="venue-title">
                  {booking.venue?.name || "Venue Not Available"}
                </h3>
                <span className="booking-date">
                  {booking.eventDate && Array.isArray(booking.eventDate)
                    ? new Date(
                        booking.eventDate[0],
                        booking.eventDate[1] - 1,
                        booking.eventDate[2]
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
                  <strong>Customer:</strong> {booking.user?.name || "Not Available"}
                </p>
                <p>
                  <strong>Customer Phone:</strong> {booking.user?.phone || "Not Available"}
                </p>
                <p>
                  <strong>Venue Type:</strong> {booking.venue?.type || "Not Available"}
                </p>
                <p>
                  <strong>Status:</strong> {booking.status || "Confirmed"}
                </p>
              </div>
              <button
                className="view-details-btn"
                onClick={() => handleViewDetails(booking)}
              >
                View Details
              </button>
            </div>
          ))}
          
          {activeTab === "past" && pastBookings.map((booking) => (
            <div className="booking-card past-booking" key={booking.id}>
              <div className="booking-header">
                <h3 className="venue-title">
                  {booking.venue?.name || "Venue Not Available"}
                </h3>
                <span className="booking-date">
                  {booking.eventDate && Array.isArray(booking.eventDate)
                    ? new Date(
                        booking.eventDate[0],
                        booking.eventDate[1] - 1,
                        booking.eventDate[2]
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
                  <strong>Customer:</strong> {booking.user?.name || "Not Available"}
                </p>
                <p>
                  <strong>Customer Phone:</strong> {booking.user?.phone || "Not Available"}
                </p>
                <p>
                  <strong>Venue Type:</strong> {booking.venue?.type || "Not Available"}
                </p>
                <p>
                  <strong>Status:</strong> {booking.status || "Completed"}
                </p>
              </div>
              <button
                className="view-details-btn"
                onClick={() => handleViewDetails(booking)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeBookings;