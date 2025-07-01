import React, { useState, useRef } from "react";
import "../styles/AddDetails.css";
import api from "../api";

const PhotographerDetails = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
    pricePerDay: "",
    equipment: "",
    contactNumber: "",
    email: ""
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
      if (file.type.startsWith("image/")) {
        handleFile(file);
        // Clear image error if file is successfully dropped
        setValidationErrors((prevErrors) => ({ ...prevErrors, image: "" }));
      } else {
        alert("Please upload an image file");
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
      setImage(e.target.result); // This will store the base64 string directly
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
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

    // Name
    if (!formData.name.trim()) {
      errors.name = "Photographer name is required.";
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      errors.name = "Photographer name must be at least 3 characters.";
      isValid = false;
    } else if (!/^[a-zA-Z\s.-]+$/.test(formData.name.trim())) { // Allow letters, spaces, dots, and hyphens for names
      errors.name = "Name can only contain letters, spaces, dots, or hyphens.";
      isValid = false;
    }

    // Specialization
    if (!formData.specialization.trim()) {
      errors.specialization = "Specialization is required.";
      isValid = false;
    } else if (formData.specialization.trim().length < 3) {
      errors.specialization = "Specialization must be at least 3 characters.";
      isValid = false;
    }

    // Experience
    if (!formData.experience) {
      errors.experience = "Experience is required.";
      isValid = false;
    } else if (isNaN(formData.experience) || parseInt(formData.experience) < 0) {
      errors.experience = "Experience must be a non-negative number.";
      isValid = false;
    }

    // Price Per Day
    if (!formData.pricePerDay) {
      errors.pricePerDay = "Price per day is required.";
      isValid = false;
    } else if (isNaN(formData.pricePerDay) || parseFloat(formData.pricePerDay) <= 0) {
      errors.pricePerDay = "Price per day must be a positive number.";
      isValid = false;
    }

    // Equipment
    if (!formData.equipment.trim()) {
      errors.equipment = "Equipment details are required.";
      isValid = false;
    } else if (formData.equipment.trim().length < 5) {
      errors.equipment = "Equipment details must be at least 5 characters.";
      isValid = false;
    }

    // Contact Number
    if (!formData.contactNumber.trim()) {
      errors.contactNumber = "Contact number is required.";
      isValid = false;
    } else if (!/^\+?[0-9\s-()]{7,15}$/.test(formData.contactNumber.trim())) {
      errors.contactNumber = "Please enter a valid phone number (7-15 digits, allows +, -, (, )).";
      isValid = false;
    }

    // Email
    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
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
      alert("Please correct the errors in the form before submitting.");
      return; // Stop submission if validation fails
    }

    try {
      const formattedData = {
        name: formData.name,
        specialization: formData.specialization,
        experience: parseInt(formData.experience),
        pricePerDay: parseFloat(formData.pricePerDay),
        equipment: formData.equipment,
        contactNumber: formData.contactNumber,
        email: formData.email,
        image: image // Ensure image is included
      };
  
      console.log('Sending photographer data:', formattedData);
  
      const response = await api.post('/api/photographer/add', formattedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      alert('Photographer details saved successfully!');
      
      // Reset form
      setFormData({
        name: "",
        specialization: "",
        experience: "",
        pricePerDay: "",
        equipment: "",
        contactNumber: "",
        email: ""
      });
      setImage(null);
      setValidationErrors({}); // Clear validation errors on successful submission
    } catch (error) {
      console.error('Error:', error);
      alert(`Error saving photographer details: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="add-details-container">
      <div className="form-wrapper">
        <h1 className="form-title">Add Photographer Details</h1>

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
            <label>Photographer Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter photographer name"
              // Removed `required` HTML attribute
            />
            {validationErrors.name && (
              <p className="error-message">{validationErrors.name}</p>
            )}
          </div>

          <div className="form-group">
            <label>Specialization:</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              placeholder="Enter specialization (e.g., Wedding, Portrait)"
            />
            {validationErrors.specialization && (
              <p className="error-message">{validationErrors.specialization}</p>
            )}
          </div>

          <div className="form-group">
            <label>Experience (years):</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="Enter years of experience"
            />
            {validationErrors.experience && (
              <p className="error-message">{validationErrors.experience}</p>
            )}
          </div>

          <div className="form-group">
            <label>Price Per Day:</label>
            <input
              type="number"
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleInputChange}
              placeholder="Enter price per day"
              step="0.01" // Allow decimal values for currency
            />
            {validationErrors.pricePerDay && (
              <p className="error-message">{validationErrors.pricePerDay}</p>
            )}
          </div>

          <div className="form-group">
            <label>Equipment:</label>
            <input
              type="text"
              name="equipment"
              value={formData.equipment}
              onChange={handleInputChange}
              placeholder="Enter equipment details"
            />
            {validationErrors.equipment && (
              <p className="error-message">{validationErrors.equipment}</p>
            )}
          </div>

          <div className="form-group">
            <label>Contact Number:</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              placeholder="Enter contact number"
            />
            {validationErrors.contactNumber && (
              <p className="error-message">{validationErrors.contactNumber}</p>
            )}
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
            />
            {validationErrors.email && (
              <p className="error-message">{validationErrors.email}</p>
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

export default PhotographerDetails;