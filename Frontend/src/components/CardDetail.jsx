import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../api";
import "../styles/CardDetail.css";


const CardDetails = () => {
  const { cardId } = useParams();
  const [venueData, setVenueData] = useState(null);
  const [decorDetails, setDecorDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const venueResponse = await api.get(`/api/venues/${cardId}`);
        setVenueData(venueResponse.data);

        const decorResponse = await api.get(`/api/decor/${cardId}`);
        if (Array.isArray(decorResponse.data)) {
          const transformedDecor = decorResponse.data.reduce((acc, detail) => {
            acc[detail.type.toLowerCase()] = {
              description: detail.description,
              image: detail.image,
            };
            return acc;
          }, {});
          setDecorDetails(transformedDecor);
        } else {
          setDecorDetails(decorResponse.data);
        }

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch wedding details');
        setLoading(false);
      }
    };

    fetchData();
  }, [cardId]);

  const handleBooking = async () => {
    if (!selectedDate) {
      toast.error('Please select a date!');
      return;
    }
  
    const user1 = JSON.parse(localStorage.getItem("user"));  // Fetching the userId from localStorage
    const employeeName = venueData.manager; // Assuming venue manager is the employee name
  
    try {
      // Correctly insert the employeeName into the URL
      const response = await api.post(`/api/booking?employeeName=${encodeURIComponent(employeeName)}`, {
        user: user1,           // Pass the userId
        venue: venueData,      // Pass venue data
        bookingPackage: venueData.package, // Pass the booking package id
        bookingDate: new Date().toISOString().split('T')[0], // Current date as booking date
        eventDate: selectedDate,  // Date selected by the user
      });
  
      if (response.status === 200) {
        setShowModal(false);
        toast.success('Booking done!');
      } else {
        toast.error('Choose another date!');
      }
    } catch (error) {
      console.error('Error booking package:', error);
      toast.error('Error during booking. Please try again!');
    }
  };
  

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error || !venueData) {
    return <div className="error-message">{error || 'Wedding theme not found!'}</div>;
  }

  return (
    <div className="wedding-details-container">
      <ToastContainer />
      <div className="decor-section">
        <h2 className="section-title1">Decoration Details</h2>
        <div className="decor-grid1">
          {Object.entries(decorDetails).map(([key, value]) => (
            <div key={key} className="decor-card">
              <div className="decor-image-container">
                <img src={value.image} alt={key} className="decor-image" />
              </div>
              <div className="decor-content">
                <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                <p>{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="venue-section">
        <h2 className="section-title">Venue Details</h2>
        <div className="venue-content">
          <img src={venueData.image} alt={venueData.name} className="venue-image" />
          <div className="venue-info-grid">
            {['name', 'location', 'manager', 'contactNo', 'email'].map((field) => (
              <div className="venue-detail" key={field}>
                <span className="detail-label">
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </span>
                <span className="detail-value">{venueData[field]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="booking-section">
        <div className="price-summary">
          <h3>Total Package Price</h3>
          <p className="total-price">₹ {venueData.price}</p>
          <p className="price-note">*Includes all decoration and venue charges</p>
        </div>
        <button className="book-plan-btn" onClick={() => setShowModal(true)}>
          Book This Package
        </button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Select a Date</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleBooking}>Confirm Booking</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDetails;