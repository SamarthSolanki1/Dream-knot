import React, { useState, useEffect } from "react";
import '../styles/Customer.css';
import { useNavigate } from "react-router-dom";
import api from "../api";

const Customer = () => {
  const [cardsData, setCardsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
        
        const response = await api.get("/packages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.data.message === "Unauthorized") {
          throw new Error("Unauthorized access. Please log in.");
        }
        
        console.log("Fetched packages:", response.data);

        const customCard = {
          id: 5,
          title: 'Custom Wedding',
          price: 'Starting from 25,00,000',
          image: 'https://www.ptaufiqphotography.com/wp-content/uploads/2024/06/ptaufiq-indian-wedding-rajkot-India-ceremony-couple-portraits.jpg',
        };

        setCardsData([...response.data, customCard]);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const featureSets = {
    1: [
      { emoji: '☀️', label: 'Sunny Weather' },
      { emoji: '🌊', label: 'Sea View' },
      { emoji: '🏖️', label: 'Beachside' }
    ],
    2: [
      { emoji: '🏰', label: 'Royal Palace' },
      { emoji: '🎭', label: 'Cultural Experience' },
      { emoji: '🍷', label: 'Luxury Dining' }
    ],
    3: [
      { emoji: '🌳', label: 'Lush Gardens' },
      { emoji: '🦋', label: 'Nature Vibes' },
      { emoji: '🐦', label: 'Bird Watching' }
    ],
    4: [
      { emoji: '✈️', label: 'Exotic Location' },
      { emoji: '🏝️', label: 'Island Feel' },
      { emoji: '🌅', label: 'Scenic Views' }
    ]
  };

  const handleBooking = (cardId) => {
    if (cardId === 5) {
      navigate(`/customwedding`);
    } else {
      navigate(`/cards/${cardId}`);
    }
  };

  return (
    <div className="outer">
      <h1 id="text">Wedding Plans</h1>
      <div className="cards-container">
        {cardsData.map((card) => (
          <div key={card.id} className="card">
            <img src={card.image} alt={card.title} className="card-image" />
            <div className="card-content">
              <h3 className="card-title">{card.title}</h3>
              <p className="card-price">{card.price}</p>
              {card.id !== 5 && (
                <div className="feature-list">
                  {featureSets[card.id]?.map((feature, index) => (
                    <span key={index} className="feature-badge">
                      {feature.emoji} {feature.label}
                    </span>
                  ))}
                </div>
              )}
              <button 
                className="book-button" 
                onClick={() => handleBooking(card.id)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customer;