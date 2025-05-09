import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "../styles/AddDetails.css";
import api from "../api";

const EntranceDetails = () => {
  const { cardId } = useParams();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    themeType: "",
    price: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    description: "",
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  // Drag-and-Drop Handlers
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
      if (file.type.startsWith("image/")) {
        handleFile(file);
      } else {
        alert("Please upload an image file");
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

  // Form Field Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formattedData = {
        ...formData,
        price: parseFloat(formData.price),
        image: image
      };
  
      const response = await api.post('/api/entrance/add', formattedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      alert('Entrance details saved successfully!');
      
      // Reset form
      setFormData({
        themeType: "",
        price: "",
        contactPerson: "",
        contactPhone: "",
        contactEmail: "",
        description: ""
      });
      setImage(null);
    } catch (error) {
      console.error('Error:', error);
      alert(`Error saving entrance details: ${error.response?.data?.message || error.message}`);
    }
  };
  

  return (
    <div className="add-details-container">
      <div className="form-wrapper">
        <h1 className="form-title">Add Entrance Details</h1>

        <form className="details-form" onSubmit={handleSubmit}>
          {/* Drag and Drop Image Upload Section */}
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

          {/* Form Fields */}
          <div className="form-group">
            <label>Theme Type:</label>
            <input
              type="text"
              name="themeType"
              value={formData.themeType}
              onChange={handleInputChange}
              placeholder="Enter entrance theme type"
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
              placeholder="Enter description"
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

export default EntranceDetails;
