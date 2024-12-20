import React from 'react';
import { useParams } from 'react-router-dom';
import "../styles/CardDetail.css"
import { useNavigate } from 'react-router-dom';

const CardDetails = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  console.log("Current cardId from URL:", cardId);
  const handleBooking = () => {
    navigate('/login');
  }

  // Sample data with expanded details for all cards
  const cardsData = [
    {
      id: 1,
      title: 'Beach Wedding Theme',
      description: 'Royal Wedding Theme is the best plan which will contain all the royal things such as bands, stage n all we will provide the car, premium condition chair.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVS46Xsgnc3E4Iogm8HK8FQhn6JYrCanopdA&s',
      location: 'Goa',
      venue: {
        name: 'Taj hotel - Mumbai CST',
        type: 'Hotels',
        location: 'Mumbai',
        ticketPrice: '2000000',
        manager: 'Sachin Kumar',
        contactNo: '1234578901',
        email: 'sachin@demo.com'
      }
    },
    {
      id: 2,
      title: 'Royal Wedding Theme',
      description: 'A beautiful beachside wedding with stunning views and ocean breeze.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxD_oUfaiSiYcwWipqr9D63m2fCM6R4v45Eg&s',
      location: 'Udaipur',
      venue: {
        name: 'Taj Resort & Spa',
        type: 'Resort',
        location: 'Goa',
        Price: '2500000',
        manager: 'Rahul Sharma',
        contactNo: '9876543210',
        email: 'rahul@demo.com'
      }
    },
    {
      id: 3,
      title: 'Garden Wedding Theme',
      description: 'A romantic garden wedding surrounded by flowers and nature.',
      image: 'https://www.theknot.com/tk-media/images/354958f7-9d64-46d5-90ca-8f7847253ba3.jpg',
      location: 'Delhi',
      venue: {
        name: 'Green Paradise Gardens',
        type: 'Garden',
        location: 'Delhi',
        Price: '1800000',
        manager: 'Priya Singh',
        contactNo: '8765432109',
        email: 'priya@demo.com'
      }
    },
    {
      id: 4,
      title: 'Destination Wedding Theme',
      description: 'Choose your favourite Destination for your Dream Knot',
      image: 'https://www.behindthescene.co.in/wp-content/uploads/2024/05/bts-302-min.jpg',
      location: 'Multiple Locations',
      venue: {
        name: 'Customizable',
        type: 'Various',
        location: 'As per choice',
        Price: '2000000',
        manager: 'Amit Patel',
        contactNo: '7654321098',
        email: 'amit@demo.com'
      }
    }
  ];

  const card = cardsData.find((item) => item.id === parseInt(cardId));
  console.log("Found card:", card);

  if (!card) {
    return (
      <div className="error-container">
        <p className="error-message">Wedding theme not found! Please check the URL or return to the themes page.</p>
      </div>
    );
  }

  return (
    <div className="wedding-details-container">
      <div className="details-section">
        <h2 className="section-title">Wedding Plan Details</h2>
        
        <div className="plan-content">
          <div className="image-container">
            <img src={card.image} alt={card.title} className="plan-image" />
          </div>
          
          <div className="plan-info">
            <h3 className="plan-title">{card.title}</h3>
            <p className="plan-description">{card.description}</p>
            <p className="plan-location">Location: {card.location}</p>
            <button className="book-plan-btn" onClick={handleBooking}>Book Plan</button>
          </div>
        </div>
      </div>

      <div className="venue-section">
        <h2 className="section-title">Venue Details</h2>
        
        <div className="venue-grid">
          <div className="venue-detail">
            <span className="detail-label">Venue Name:</span>
            <span className="detail-value">{card.venue.name}</span>
          </div>
          
          <div className="venue-detail">
            <span className="detail-label">Venue Type:</span>
            <span className="detail-value">{card.venue.type}</span>
          </div>
          
          <div className="venue-detail">
            <span className="detail-label">Location:</span>
            <span className="detail-value">{card.venue.location}</span>
          </div>
          
          <div className="venue-detail">
            <span className="detail-label">Price:</span>
            <span className="detail-value">₹ {card.venue.Price}</span>
          </div>
          
          <div className="venue-detail">
            <span className="detail-label">Manager:</span>
            <span className="detail-value">{card.venue.manager}</span>
          </div>
          
          <div className="venue-detail">
            <span className="detail-label">Contact No:</span>
            <span className="detail-value">{card.venue.contactNo}</span>
          </div>
          
          <div className="venue-detail">
            <span className="detail-label">Email Id:</span>
            <span className="detail-value">{card.venue.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;