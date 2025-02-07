import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/Viewbookings.css";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Avatar from 'react-avatar';

function Viewbookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api
      .get("/api/allbookings")
      .then((response) => setBookings(response.data))
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  return (
    <div className="container">
      <h2 className="heading">All Bookings</h2>
      <Grid container spacing={3}>
        {bookings.map((booking) => (
          <Grid item xs={12} sm={6} md={4} key={booking.id}>
            <Card className="booking-card">
              <CardContent>
                <div className="user-info">
                <Avatar name={booking.user.name} size="30" round />
                  <div>
                    <Typography variant="h6">{booking.user.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {booking.user.email} | {booking.user.mobileNumber}
                    </Typography>
                  </div>
                </div>
                <img
                  src={booking.venue.image}
                  alt={booking.venue.name}
                  className="venue-image"
                />
                <Typography variant="h6" className="venue-title">
                  {booking.venue.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <LocationOnIcon fontSize="small" /> {booking.venue.location}
                </Typography>
                <Typography variant="body1" className="package-title">
                  {booking.bookingPackage.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {booking.bookingPackage.description}
                </Typography>
                <Typography variant="h6" className="price">
                  ₹{booking.bookingPackage.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <EventIcon fontSize="small" /> Event Date:{" "}
                  {booking.eventDate.join("-")}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <EventIcon fontSize="small" /> Booked Date:{" "}
                  {booking.bookingDate.join("-")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Viewbookings;
