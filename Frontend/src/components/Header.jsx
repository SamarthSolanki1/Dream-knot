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
    return location.pathname === '/Customer' 
    
  }
  const shouldShowButtons2 = () => {
    return location.pathname === '/EmployeeDashboard'
    
  }
  const shouldShowButtons3 = () => {
    return location.pathname === '/AdminDashboard'
    
  }

  const handle = () => {
    
    navigate('/login');
    localStorage.removeItem("user");
    localStorage.removeItem("user_name");
    localStorage.removeItem("token");
    
  };
  const handleclick = () => {
    navigate('/bookings');
  }
  const handleclick1 = () => {
    navigate('/Employeebookings');
  }
  const handleclick5 = () => {
    navigate('/');
  }

  return (
    <header className="header">
      <div className="header-logo">
        <img src="https://media.gettyimages.com/id/1334907287/video/seamless-loop-animation-infinity-symbol-neon-glowing-blue-light-on-black-background-eternity.jpg?s=640x640&k=20&c=KrVola9TZlWI68QwkY7RItO2wCjSx4WnYSBhNDIiB9k=" alt="Wedding Planner Logo" onClick={handleclick}/>
        <h1 onClick={handleclick5}>DreamKnots</h1>
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
        <button className="btn" onClick={handleclick}>My Bookings</button>
        <button className="btn" onClick={handle}>Logout</button>
      </div>
      )}

       {shouldShowButtons2() && (
        <div className="header-buttons">
        <button className="btn" onClick={handleclick1}>My Bookings</button>
        <button className="btn" onClick={handle}>Logout</button>
      </div>
      
      )}
      {shouldShowButtons3() && (
        <div className="header-buttons">
        <button className="btn" onClick={handle}>Logout</button>
      </div>
      
      )}
    </header>
  );
};

export default Header;