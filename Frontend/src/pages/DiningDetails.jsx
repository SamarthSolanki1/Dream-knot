// DiningDetails.js
import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "../styles/AddDetails.css";

const DiningDetails = () => {
  const { cardId } = useParams();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    diningStyle: "",
    capacity: "",
    menuOptions: "",
    staffingOptions: "",
    foodServicePrice: "",
    staffingPrice: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    description: "",
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
      const formDataToSubmit = {
        diningStyle: formData.diningStyle,
        capacity: formData.capacity ? parseInt(formData.capacity) : null,
        menuOptions: formData.menuOptions,
        staffingOptions: formData.staffingOptions,
        foodServicePrice: formData.foodServicePrice ? parseFloat(formData.foodServicePrice) : null,
        staffingPrice: formData.staffingPrice ? parseFloat(formData.staffingPrice) : null,
        contactPerson: formData.contactPerson,
        contactPhone: formData.contactPhone,
        contactEmail: formData.contactEmail,
        description: formData.description,
        image: image
      };

      // Validate required fields
      if (!formDataToSubmit.diningStyle || !formDataToSubmit.capacity) {
        throw new Error('Dining style and capacity are required');
      }

      const response = await fetch('http://localhost:8080/api/dining/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formDataToSubmit)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to save dining details');
      }

      alert('Dining details saved successfully!');
      
      // Reset form
      setFormData({
        diningStyle: "",
        capacity: "",
        menuOptions: "",
        staffingOptions: "",
        foodServicePrice: "",
        staffingPrice: "",
        contactPerson: "",
        contactPhone: "",
        contactEmail: "",
        description: "",
      });
      setImage(null);

    } catch (error) {
      console.error('Error:', error);
      alert(`Error saving dining details: ${error.message}`);
    }
  };

  return (
    <div className="add-details-container">
      <div className="form-wrapper">
        <h1 className="form-title">Add Dining Details</h1>

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
            <label>Dining Style:</label>
            <input
              type="text"
              name="diningStyle"
              value={formData.diningStyle}
              onChange={handleInputChange}
              placeholder="Enter dining style"
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
              placeholder="Enter dining capacity"
              required
            />
          </div>

          <div className="form-group">
            <label>Menu Options:</label>
            <textarea
              name="menuOptions"
              value={formData.menuOptions}
              onChange={handleInputChange}
              placeholder="Enter available menu options"
              required
            />
          </div>

          <div className="form-group">
            <label>Staffing Options:</label>
            <textarea
              name="staffingOptions"
              value={formData.staffingOptions}
              onChange={handleInputChange}
              placeholder="Enter available staffing options"
              required
            />
          </div>

          <div className="form-group">
            <label>Food Service Price:</label>
            <input
              type="number"
              name="foodServicePrice"
              value={formData.foodServicePrice}
              onChange={handleInputChange}
              placeholder="Enter food service price"
              required
            />
          </div>

          <div className="form-group">
            <label>Staffing Price:</label>
            <input
              type="number"
              name="staffingPrice"
              value={formData.staffingPrice}
              onChange={handleInputChange}
              placeholder="Enter staffing price"
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

export default DiningDetails;
