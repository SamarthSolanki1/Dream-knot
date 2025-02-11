import React, { useState } from 'react';
import { X } from 'lucide-react';
import api from "../api.js"

const SlidingCart = ({ cart, onClose, onRemoveItem, calculateTotal }) => {
  const [eventDate, setEventDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const sectionTitles = {
    venues: 'Wedding Venues',
    mandaps: 'Mandap Designs',
    entrance: 'Entrance Decorations',
    pathways: 'Pathways',
    dining: 'Dining Setup',
    lighting: 'Lighting Arrangements',
    cars: 'Car Rentals',
    photographers: 'Photographers'
  };

  const handleCheckout = () => {
    setShowDatePicker(true);
  };

  console.log(cart);

  const cleanBase64 = (image) => {
    if (!image) return null;
    return image.includes(",") ? image.split(",")[1] : image;
  };

  const confirmBooking = async () => {
    if (!eventDate) {
      alert('Please select an event date.');
      return;
    }
    
    const bookingDate = new Date().toISOString().split('T')[0]; 
    const user1 = JSON.parse(localStorage.getItem("user"));

    // Clean all images in the cart before sending
    const updatedCart = cart.map(item => ({
      ...item,
      image: cleanBase64(item.image)
    }));

    const bookingData = {
      user: user1,
      customVenue: updatedCart[0],  
      dining: updatedCart[1],  
      lighting: updatedCart[2],  
      entrance: updatedCart[3],  
      pathway: updatedCart[4],  
      mandap: updatedCart[5],  
      photographer: updatedCart[6],  
      carRental: updatedCart[7],  
      employee: null,  
      bookingDate,  
      eventDate,  
      status: "Pending"
    };

    console.log("Sending bookingData:", JSON.stringify(bookingData, null, 2));
    
    try {
      await api.post('/api/custom-bookings', bookingData);
      alert('Booking successful!');
      setShowDatePicker(false);
    } catch (error) {
      console.error('Error booking:', error);
      alert('Booking failed! Please try again.');
    }
  };

  return (
    <div className="sliding-cart-overlay">
      <div className="sliding-cart">
        <div className="sliding-cart-header">
          <h2>Your Cart</h2>
          <button onClick={onClose} className="close-cart-button">
            <X size={24} />
          </button>
        </div>
        <div className="sliding-cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart-message">Your cart is empty</p>
          ) : (
            cart.map((item, index) => (
              <div key={`cart-item-${index}`} className="cart-item">
                <img 
                  src={item.image || '/api/placeholder/100/100'} 
                  alt={item.name || 'Cart Item'} 
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3 className="cart-item-section">
                    {sectionTitles[item.section] || 'Unknown Section'}
                  </h3>
                  <h3>{item.name}</h3>
                  <p>₹{(item.price || item.pricePerDay || 0).toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => onRemoveItem(index)} 
                  className="remove-cart-item-button"
                >
                  <X size={20} />
                </button>
              </div>
            ))
          )}
        </div>
        <div className="sliding-cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>₹{calculateTotal().toLocaleString()}</span>
          </div>
          <button className="proceed-to-checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
        {showDatePicker && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h3>Select Your Event Date</h3>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                style={styles.dateInput}
              />
              <div style={styles.modalButtons}>
                <button onClick={confirmBooking} style={styles.confirmButton}>
                  Confirm Booking
                </button>
                <button onClick={() => setShowDatePicker(false)} style={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1001
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    width: '300px',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)'
  },
  dateInput: {
    width: '100%',
    padding: '8px',
    marginTop: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px'
  },
  modalButtons: {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  confirmButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};
export default SlidingCart;
