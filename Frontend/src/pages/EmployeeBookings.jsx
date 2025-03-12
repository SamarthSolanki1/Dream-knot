import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/employeeBookings.css";

const EmployeeBookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [pastBookings, setPastBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const employeeData = JSON.parse(localStorage.getItem("user"));
  const employeeId = employeeData?.id;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!employeeId) throw new Error("Employee ID not found.");

        const response = await api.get(`api/bookings/employee/${employeeId}`);
        if (response.data && Array.isArray(response.data)) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const past = [];
          const upcoming = [];

          response.data.forEach((booking) => {
            const eventDate = new Date(
              booking.eventDate[0],
              booking.eventDate[1] - 1,
              booking.eventDate[2]
            );
            eventDate.setHours(0, 0, 0, 0);

            if (eventDate < today) {
              past.push(booking);
            } else {
              upcoming.push(booking);
            }
          });

          setPastBookings(past);
          setUpcomingBookings(upcoming);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [employeeId]);

  if (loading) return <div className="loading1">Loading bookings...</div>;
  if (error) return <div className="error1">{error}</div>;

  return (
    <div className="bookings-container1">
      <h2 className="title1">My Bookings</h2>
      <div className="tabs-container">
        <button 
          className={activeTab === "upcoming" ? "tab active" : "tab"} 
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Assigned Bookings ({upcomingBookings.length})
        </button>
        <button 
          className={activeTab === "past" ? "tab active" : "tab"} 
          onClick={() => setActiveTab("past")}
        >
          Past Assigned Bookings ({pastBookings.length})
        </button>
      </div>

      <div className="bookings-grid1">
        {(activeTab === "upcoming" ? upcomingBookings : pastBookings).map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

const BookingCard = ({ booking }) => {
  const eventDate = new Date(
    booking.eventDate[0],
    booking.eventDate[1] - 1,
    booking.eventDate[2]
  ).toLocaleDateString();

  return (
    <div className="booking-card1">
      <div className="booking-header">
        <h3 className="venue-name">{booking.venue.name}</h3>
        <span className="event-badge">{eventDate}</span>
      </div>
      <p><strong>Package:</strong> {booking.bookingPackage.title}</p>
      <p><strong>Event Date:</strong> {eventDate}</p>
      <p><strong>Employee:</strong> {booking.user.name}</p>
      <p><strong>Employee Number:</strong> {booking.user.mobileNumber}</p>
      <p><strong>Employee Email:</strong> {booking.user.email}</p>
      <p><strong>Venue Type:</strong> {booking.venue.type}</p>
      <button className="view-details">View Details</button>
    </div>
  );
};

export default EmployeeBookings;
