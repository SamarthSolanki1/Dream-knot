import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to check if buttons should be displayed
  const shouldShowButtons = () => {
    return location.pathname === '/' || location.pathname === '/carddetails';
  };
  const shouldShowButtons1 = () => {
    return location.pathname === '/customer'
  }

  const handle = () => {
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-logo">
        <img src="/logo.jpg" alt="Wedding Planner Logo" />
        <h1>DreamKnots</h1>
      </div>
      
      {/* Only show buttons on home page and carddetails page */}
      {shouldShowButtons() && (
        <div className="header-buttons">
          <button className="btn" onClick={handle}>Book Plan</button>
          <button className="btn" onClick={handle}>Login</button>
        </div>
      )}
      {shouldShowButtons1() && (
        <div className="header-buttons">
        <button className="btn" onClick={handle}>My Bookings</button>
        <button className="btn" onClick={handle}>Logout</button>
      </div>
      )}
    </header>
  );
};

export default Header;