import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Card.css';

const Cards = () => {
  const cardsData = [
    {
      id: 1,
      title: 'Beach Wedding',
      description: 'A beautiful beachside wedding with stunning views.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVS46Xsgnc3E4Iogm8HK8FQhn6JYrCanopdA&s',
    },
    {
      id: 2,
      title: 'Royal Palace Wedding',
      description: 'An extravagant royal wedding with luxury decor.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxD_oUfaiSiYcwWipqr9D63m2fCM6R4v45Eg&s',
    },
    {
      id: 3,
      title: 'Garden Wedding',
      description: 'A romantic garden wedding surrounded by flowers.',
      image: 'https://www.theknot.com/tk-media/images/354958f7-9d64-46d5-90ca-8f7847253ba3.jpg',
    },
    {
      id: 4,
      title: 'Destination Wedding',
      description: 'Choose your favourite Destination for your Dream Knot',
      image: 'https://www.behindthescene.co.in/wp-content/uploads/2024/05/bts-302-min.jpg',
    },
  ];

  return (
    <div className="cards-container">
      {cardsData.map((card) => (
        <div key={card.id} className="card">
          <Link to={`/cards/${card.id}`}>
            <img src={card.image} alt={card.title} />
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Cards;
