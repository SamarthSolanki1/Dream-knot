import React from "react";
import "../styles/HotelsVendors.css"; // External CSS file for styling

const images = [
  "https://fabrikbrands.com/wp-content/uploads/Hotel-Brand-Logos-5-1200x750.png",
  "https://marketplace.canva.com/EAFShvkmO2k/1/0/1600w/canva-vintage-and-luxury-hotel-decorative-ornamental-logo-uCd_8hymU48.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJHw4awjXgJ2c_ie2M3TGRWL43bLA2f0Ad5w&s",
  "https://fabrikbrands.com/wp-content/uploads/Hotel-Brand-Logos-4-1200x750.png",
  "https://i.pinimg.com/564x/fc/79/68/fc79683d38ba80c0153351b37892332f.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSN52WwI02A-bHAv_ShQ8h0F6RGH36jNCm7w&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtlDPpD-DBTHcm4wmlh6KtZkGFqWIgtc2Spg&s",
];

const HotelsVendors = () => {
  return (
    <div className="scrolling-container">
      <div className="scrolling-wrapper">
        {images.concat(images).map((img, index) => (
          <div className="scrolling-item" key={index}>
            <img src={img} alt="Vendor or Hotel" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelsVendors;
