import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EmployeeDashboard.css";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const cardData = [
    { 
      id: "venue", 
      name: "Venue", 
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/01/e4/9c/more-far.jpg?w=900&h=500&s=1", 
      description: "Elegant venue setup for your dream event",
      path: "/EmployeeDashboard/venue-details"  
    },
    { 
      id: "mandap", 
      name: "Mandap", 
      image: "https://onehorizonproductions.com/wp-content/uploads/2022/08/ananthya-3.jpg", 
      description: "Beautiful mandap decorations",
      path: "/EmployeeDashboard/mandap-details"  
    },
    { 
      id: "entrance", 
      name: "Entrance", 
      image: "https://thumbs.dreamstime.com/b/wedding-decoration-element-flashing-light-arch-entrance-beautiful-wallpaper-background-lights-gate-flowers-couple-stage-path-way-167162930.jpg", 
      description: "Grand entrance with floral arches",
      path: "/EmployeeDashboard/entrance-details"  
    },
    { 
      id: "pathway", 
      name: "Pathway", 
      image: "https://i.pinimg.com/736x/b2/b9/f8/b2b9f839c3c8647363e3e7899e349bb4.jpg", 
      description: "Lantern-lit sandy pathway",
      path: "/EmployeeDashboard/pathway-details"  
    },
    { 
      id: "dining", 
      name: "Dining", 
      image: "https://www.brides.com/thmb/LK1RzmwmCFOhQUDgv63YkxcHcFY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/recirc-abf595cad747445687dd314c92435986.jpg", 
      description: "Beachfront dining arrangement",
      path: "/EmployeeDashboard/dining-details"  
    },
    { 
      id: "lighting", 
      name: "Lighting", 
      image: "https://shaadiwish.com/blog/wp-content/uploads/2022/08/outdoor-wedding-fairy-lights-13-wishtree-weddings.jpg",
      description: "Warm ambient lighting with fairy lights",
      path: "/EmployeeDashboard/lighting-details"  
    }
  ];

  return (
    <div className="employee-dashboard">
      <h1 className="section-title1">Employee Dashboard</h1>
      <div className="cards-grid">
        {cardData.map((card) => (
          <div
            key={card.id}
            className="dashboard-card"
            onClick={() => navigate(card.path)}
          >
            <div className="card-image-container">
              <img src={card.image} alt={card.name} className="card-image" />
            </div>
            <div className="card-content">
              <h3 className="card-title">{card.name}</h3>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
