import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/CardDetail.css"

const CardDetails = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();

  const cardsData = [
    {
      id: 1,
      title: 'Beach Wedding Theme',
      description: 'A beautiful beachside wedding with stunning views and ocean breeze',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVS46Xsgnc3E4Iogm8HK8FQhn6JYrCanopdA&s',
      location: 'Goa',
      decorDetails: {
        mandap: {
          description: 'Elegant beachside mandap with floral arrangements',
          image: 'https://gallery.theweddingcompany.com/cdn/shop/files/87c70a1b9a05be046e998325e696bba6_550x.jpg?v=1709882504'
        },
        entrance: {
          description: 'Shell and flower decorated entrance arch',
          image: 'https://gallery.theweddingcompany.com/cdn/shop/files/5_4a9ddcd4-8792-4699-8e23-4ece5ae2e97d_1100x.jpg?v=1707394832'
        },
        pathway: {
          description: 'Lantern-lit sandy pathway',
          image: 'https://gallery.theweddingcompany.com/cdn/shop/files/b74a9e60e030737d4b7ad248d365c674.jpg?v=1711972280&width=4096'
        },
        lighting: {
          description: 'Warm ambient lighting with fairy lights',
          image: 'https://gallery.theweddingcompany.com/cdn/shop/files/bd9add9b2b3419467cf2ddca79c31d65.jpg?v=1709033626&width=4096'
        },
        seating: {
          description: 'Comfortable beach-themed seating for 200 guests',
          image: 'https://img.weddingbazaar.com/shaadisaga_production/photos/pictures/005/030/657/new_medium/framed.memoirs.jpg?1665076124'
        },
        dining: {
          description: 'Beachfront dining arrangement',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4b1OMg5rnJ84__gE_kjnUmxMaGQjPfd_mGZY-eCH7MKtvhoCLM3oEJxr8JrtPoAPHM-g&usqp=CAU'
        }
      },
      venue: {
        name: 'Taj Cidade de Goa Horizon, Goa',
        type: 'Hotels',
        location: 'Goa',
        price: '2000000',
        image: 'https://images.trvl-media.com/lodging/47000000/46210000/46205200/46205118/6a0edcf5.jpg?impolicy=resizecrop&rw=1200&ra=fit',
        manager: 'Sachin Kumar',
        contactNo: '1234578901',
        email: 'sachin@demo.com'
      }
    },
    // ... (other card data)
  ];

  const handleBooking = () => {
    navigate('/booking-form');
  };

  const card = cardsData.find((item) => item.id === parseInt(cardId));

  if (!card) {
    return <div className="error-message">Wedding theme not found!</div>;
  }

  return (
    <div className="wedding-details-container">
      {/* Main details section */}
      

      {/* Decoration details section */}
      <div className="decor-section">
        <h2 className="section-title">Decoration Details</h2>
        <div className="decor-grid">
          {Object.entries(card.decorDetails).map(([key, value]) => (
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

      {/* Venue details section */}
      <div className="venue-section">
        <h2 className="section-title">Venue Details</h2>
        <div className="venue-content">
          <img src={card.venue.image} alt={card.venue.name} className="venue-image" />
          <div className="venue-info-grid">
            <div className="venue-detail">
              <span className="detail-label">Venue Name:</span>
              <span className="detail-value">{card.venue.name}</span>
            </div>
            <div className="venue-detail">
              <span className="detail-label">Location:</span>
              <span className="detail-value">{card.venue.location}</span>
            </div>
            <div className="venue-detail">
              <span className="detail-label">Manager:</span>
              <span className="detail-value">{card.venue.manager}</span>
            </div>
            <div className="venue-detail">
              <span className="detail-label">Contact:</span>
              <span className="detail-value">{card.venue.contactNo}</span>
            </div>
            <div className="venue-detail">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{card.venue.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking section */}
      <div className="booking-section">
        <div className="price-summary">
          <h3>Total Package Price</h3>
          <p className="total-price">₹ {card.venue.price}</p>
          <p className="price-note">*Includes all decoration and venue charges</p>
        </div>
        <button className="book-plan-btn" onClick={handleBooking}>
          Book This Package
        </button>
      </div>
    </div>
  );
};

export default CardDetails;