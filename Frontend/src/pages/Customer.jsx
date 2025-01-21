import React, { useState, useEffect } from "react";
import '../styles/Customer.css';
import { useNavigate } from "react-router-dom";
import api from "../api";

const Customer = () => {
  const [cardsData, setCardsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch packages from the database
    const fetchPackages = async () => {
      try {
        const response = await api.get("/packages"); // Using axios to fetch data
        if (response.data.message === "Unauthorized") {
          throw new Error("Unauthorized access. Please log in.");
        }
        console.log("Fetched packages:", response.data);

        // Add the custom card with id = 5
        const customCard = {
          id: 5,
          title: 'Custom Wedding',
          price: 'Starting from 25,00000',
          image: 'https://www.ptaufiqphotography.com/wp-content/uploads/2024/06/ptaufiq-indian-wedding-rajkot-India-ceremony-couple-portraits.jpg',
        };

        // Update state by combining the fetched data with the custom card
        setCardsData([...response.data, customCard]);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const handleBooking = (cardId) => {
    if (cardId === 5) {
      navigate(`/customwedding`);
    } else {
      navigate(`/cards/${cardId}`);
    }
  };

  return (
    <div className="outer">
      <h1 id="text">
        Wedding Plans
      </h1>

      <div className="cards-container">
        {cardsData.map((card) => (
          <div key={card.id} className="card">
            <img src={card.image} alt={card.title} className="card-image" />
            <div className="card-content">
              <h3 className="card-title">{card.title}</h3>
              <p className="card-price">{card.price}</p>
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
