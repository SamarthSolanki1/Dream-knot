import React from "react";
import '../styles/Customer.css';
import { useNavigate } from "react-router-dom";

const cardsData = [
  {
    id: 1,
    title: 'Beach Wedding',
    price: 'Starting from 20,00000',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVS46Xsgnc3E4Iogm8HK8FQhn6JYrCanopdA&s',
  },
  {
    id: 2,
    title: 'Royal Palace Wedding',
    price: 'Starting from 35,00000',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxD_oUfaiSiYcwWipqr9D63m2fCM6R4v45Eg&s',
  },
  {
    id: 3,
    title: 'Garden Wedding',
    price: 'Starting from 12,00000',
    image: 'https://www.theknot.com/tk-media/images/354958f7-9d64-46d5-90ca-8f7847253ba3.jpg',
  },
  {
    id: 4,
    title: 'Destination Wedding',
    price: 'Starting from 25,00000',
    image: 'https://www.behindthescene.co.in/wp-content/uploads/2024/05/bts-302-min.jpg',
  },
];

const Customer = () => {
  const navigate = useNavigate();

  const handleBooking = (cardId) => {
    navigate(`/cards/${cardId}`);
  };

  return (
    <div className="bg-gradient-to-b from-pink-50 to-white min-h-screen p-8">
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