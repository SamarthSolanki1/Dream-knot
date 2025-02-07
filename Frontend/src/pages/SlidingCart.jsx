import React from 'react';
import { X } from 'lucide-react';

const SlidingCart = ({ cart, onClose, onRemoveItem, calculateTotal }) => {
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
          <button className="proceed-to-checkout-button">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlidingCart;