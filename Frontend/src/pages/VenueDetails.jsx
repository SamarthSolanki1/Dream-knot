// VenueDetails.js
import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "../styles/AddDetails.css";

const VenueDetails = () => {
  const { cardId } = useParams();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    capacity: "",
    areaSize: "",
    contactPerson: "",
    description: ""
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...formData, image });
  };

  return (
    <div className="add-details-container">
      <div className="form-wrapper">
        <h1 className="form-title">Add Venue Details</h1>

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
            <label>Venue Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter venue name"
              required
            />
          </div>

          <div className="form-group">
            <label>Price per Day:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price per day"
              required
            />
          </div>

          <div className="form-group">
            <label>Capacity:</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              placeholder="Enter venue capacity"
              required
            />
          </div>

          <div className="form-group">
            <label>Area Size:</label>
            <input
              type="text"
              name="areaSize"
              value={formData.areaSize}
              onChange={handleInputChange}
              placeholder="Enter area size"
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

export default VenueDetails;