import React, { useState } from 'react';
import { X } from 'lucide-react';
import api from "../api.js"

const SlidingCart = ({ cart, onClose, onRemoveItem, calculateTotal ,selectedDate }) => {
  const [eventDate, setEventDate] = useState(selectedDate);
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
      updatedCart = []
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
                  <h3>{item.name || item.modelName || item.themeType || item.diningStyle || item.lightingType ||  item.themeType1 || 'Unknown Item'}</h3>
                  
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
          <button className="proceed-to-checkout-button" onClick={confirmBooking}>
            Proceed to Checkout
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default SlidingCart;
