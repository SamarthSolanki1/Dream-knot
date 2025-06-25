import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Customer.css";

const GenerateCardPrompt = () => {
  const navigate = useNavigate();

  const goToGenerator = () => {
    navigate("/generatecard");
  };

  return (
    <div className="card prompt-card">
      <img 
        src="https://marketplace.canva.com/EAGNzWelnG0/1/0/1135w/canva-purple-gold-aesthetic-watercolor-flower-wedding-invitation-bhQbaJQdK3c.jpg" 
        alt="Generate Wedding Card" 
        className="card-image"
      />
      <div className="card-content">
        <h3 className="card-title">Design Your Own Wedding Card</h3>
        <p className="card-price">Make your special day more memorable</p>
        <button className="book-button" onClick={goToGenerator}>
          Generate Now 💌
        </button>
      </div>
    </div>
  );
};

export default GenerateCardPrompt;
