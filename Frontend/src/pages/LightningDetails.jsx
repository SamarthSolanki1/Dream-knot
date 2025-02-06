import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "../styles/AddDetails.css";

const LightingDetails = () => {
  const { cardId } = useParams();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    lightingType: "",
    price: "",
    numberOfUnits: "",
    powerRequirement: "",
    duration: "",
    installationTime: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    description: ""
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        handleFile(file);
      } else {
        alert('Please upload an image file');
      }
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    
    
    try {
      const formattedData = {
        ...formData,
        price: parseFloat(formData.price),
        numberOfUnits: parseInt(formData.numberOfUnits),
        image: image
      };
      
      const response = await fetch('http://localhost:8080/api/lighting/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData)
      });
      
      if (response.status === 401) {
        
        alert('Session expired. Please login again.');
        
        return;
      }
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Server responded with status ${response.status}: ${errorData}`);
      }
      
      const responseData = await response.json();
      alert('Lighting details saved successfully!');
      
      // Reset form
      setFormData({
        lightingType: "",
        price: "",
        numberOfUnits: "",
        powerRequirement: "",
        duration: "",
        installationTime: "",
        contactPerson: "",
        contactPhone: "",
        contactEmail: "",
        description: ""
      });
      setImage(null);
    } catch (error) {
      console.error('Error:', error);
      alert(`Error saving mandap details: ${error.message}`);
    }
  };


  return (
    <div className="add-details-container">
      <div className="form-wrapper">
        <h1 className="form-title">Add Lighting Details</h1>

        <form className="details-form" onSubmit={handleSubmit}>
          <div
            ref={dropZoneRef}
            className={`upload-area ${isDragging ? "dragging" : ""} ${
              image ? "has-image" : ""
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {image ? (
              <div className="image-preview">
                <img src={image} alt="Preview" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImage(null);
                  }}
                  className="remove-image"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="upload-prompt">
                <span className="upload-icon">📁</span>
                <p>Drag and drop an image here, or click to select</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="file-input"
              accept="image/*"
            />
          </div>

          <div className="form-group">
            <label>Lighting Type:</label>
            <input
              type="text"
              name="lightingType"
              value={formData.lightingType}
              onChange={handleInputChange}
              placeholder="Enter lighting type (LED, Traditional, etc.)"
              required
            />
          </div>

          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              required
            />
          </div>

          <div className="form-group">
            <label>Number of Units:</label>
            <input
              type="number"
              name="numberOfUnits"
              value={formData.numberOfUnits}
              onChange={handleInputChange}
              placeholder="Enter number of lighting units"
              required
            />
          </div>

          <div className="form-group">
            <label>Power Requirement:</label>
            <input
              type="text"
              name="powerRequirement"
              value={formData.powerRequirement}
              onChange={handleInputChange}
              placeholder="Enter power requirement (e.g., 1000W)"
              required
            />
          </div>

          <div className="form-group">
            <label>Duration:</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="Enter duration (e.g., 6 hours)"
              required
            />
          </div>

          <div className="form-group">
            <label>Installation Time:</label>
            <input
              type="text"
              name="installationTime"
              value={formData.installationTime}
              onChange={handleInputChange}
              placeholder="Enter installation time required"
              required
            />
          </div>

          <div className="form-group">
            <label>Contact Person:</label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleInputChange}
              placeholder="Enter contact person name"
              required
            />
          </div>

          <div className="form-group">
            <label>Contact Phone:</label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleInputChange}
              placeholder="Enter contact phone"
              required
            />
          </div>

          <div className="form-group">
            <label>Contact Email:</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleInputChange}
              placeholder="Enter contact email"
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description of lighting setup"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LightingDetails;
