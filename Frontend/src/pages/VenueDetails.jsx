import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "../styles/AddDetails.css";
import api from "../api";

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

  // State to hold validation errors
  const [validationErrors, setValidationErrors] = useState({});

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
        // Clear image error if file is successfully dropped
        setValidationErrors((prevErrors) => ({ ...prevErrors, image: "" }));
      } else {
        alert('Please upload an image file');
        setValidationErrors((prevErrors) => ({ ...prevErrors, image: "Please upload an image file." }));
      }
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
      // Clear image error if file is successfully selected
      setValidationErrors((prevErrors) => ({ ...prevErrors, image: "" }));
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
    // Clear validation error for the field as user types
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // --- Validation Function ---
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Venue Name
    if (!formData.name.trim()) {
      errors.name = "Venue name is required.";
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      errors.name = "Venue name must be at least 3 characters.";
      isValid = false;
    }

    // Price
    if (!formData.price) {
      errors.price = "Price per day is required.";
      isValid = false;
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      errors.price = "Price per day must be a positive number.";
      isValid = false;
    }

    // Capacity
    if (!formData.capacity) {
      errors.capacity = "Capacity is required.";
      isValid = false;
    } else if (isNaN(formData.capacity) || parseInt(formData.capacity) <= 0) {
      errors.capacity = "Capacity must be a positive integer.";
      isValid = false;
    }

    // Area Size
    if (!formData.areaSize.trim()) {
      errors.areaSize = "Area size is required.";
      isValid = false;
    } else if (formData.areaSize.trim().length < 3) {
      errors.areaSize = "Area size must be at least 3 characters.";
      isValid = false;
    }

    // Contact Person
    if (!formData.contactPerson.trim()) {
      errors.contactPerson = "Contact person is required.";
      isValid = false;
    } else if (formData.contactPerson.trim().length < 3) {
      errors.contactPerson = "Contact person name must be at least 3 characters.";
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.contactPerson.trim())) {
        errors.contactPerson = "Contact person name can only contain letters and spaces.";
        isValid = false;
    }

    // Description
    if (!formData.description.trim()) {
      errors.description = "Description is required.";
      isValid = false;
    } else if (formData.description.trim().length < 20) {
      errors.description = "Description must be at least 20 characters.";
      isValid = false;
    }

    // Image validation
    if (!image) {
        errors.image = "An image is required.";
        isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Perform validation before submission
    if (!validateForm()) {
      alert("Please correct the errors in the form.");
      return; // Stop submission if validation fails
    }

    try {
      const formattedData = {
        ...formData,
        price: parseFloat(formData.price),
        capacity: parseInt(formData.capacity),
        image: image
      };
  
      const response = await api.post('/api/venue/add', formattedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      alert('Venue details saved successfully!');
      
      // Reset form
      setFormData({
        name: "",
        price: "",
        capacity: "",
        areaSize: "",
        contactPerson: "",
        description: ""
      });
      setImage(null);
      setValidationErrors({}); // Clear validation errors on successful submission
    } catch (error) {
      console.error('Error:', error);
      alert(`Error saving venue details: ${error.response?.data?.message || error.message}`);
    }
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
                    // Set image error if it's removed and required
                    setValidationErrors((prevErrors) => ({ ...prevErrors, image: "An image is required." }));
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
          {validationErrors.image && (
            <p className="error-message">{validationErrors.image}</p>
          )}

          <div className="form-group">
            <label>Venue Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter venue name"
              // Removed `required` HTML attribute
            />
            {validationErrors.name && (
              <p className="error-message">{validationErrors.name}</p>
            )}
          </div>

          <div className="form-group">
            <label>Price per Day:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price per day"
              step="0.01" // Allow decimal values for currency
            />
            {validationErrors.price && (
              <p className="error-message">{validationErrors.price}</p>
            )}
          </div>

          <div className="form-group">
            <label>Capacity:</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              placeholder="Enter venue capacity"
            />
            {validationErrors.capacity && (
              <p className="error-message">{validationErrors.capacity}</p>
            )}
          </div>

          <div className="form-group">
            <label>Area Size:</label>
            <input
              type="text"
              name="areaSize"
              value={formData.areaSize}
              onChange={handleInputChange}
              placeholder="Enter area size"
            />
            {validationErrors.areaSize && (
              <p className="error-message">{validationErrors.areaSize}</p>
            )}
          </div>

          <div className="form-group">
            <label>Contact Person:</label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleInputChange}
              placeholder="Enter contact person name"
            />
            {validationErrors.contactPerson && (
              <p className="error-message">{validationErrors.contactPerson}</p>
            )}
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
            />
            {validationErrors.description && (
              <p className="error-message">{validationErrors.description}</p>
            )}
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