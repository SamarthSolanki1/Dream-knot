import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
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

  // State to hold validation errors
  const [validationErrors, setValidationErrors] = useState({});

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

    // Lighting Type
    if (!formData.lightingType.trim()) {
      errors.lightingType = "Lighting type is required.";
      isValid = false;
    } else if (formData.lightingType.trim().length < 3) {
      errors.lightingType = "Lighting type must be at least 3 characters.";
      isValid = false;
    }

    // Price
    if (!formData.price) {
      errors.price = "Price is required.";
      isValid = false;
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      errors.price = "Price must be a positive number.";
      isValid = false;
    }

    // Number of Units
    if (!formData.numberOfUnits) {
      errors.numberOfUnits = "Number of units is required.";
      isValid = false;
    } else if (isNaN(formData.numberOfUnits) || parseInt(formData.numberOfUnits) <= 0) {
      errors.numberOfUnits = "Number of units must be a positive integer.";
      isValid = false;
    }

    // Power Requirement
    if (!formData.powerRequirement.trim()) {
      errors.powerRequirement = "Power requirement is required.";
      isValid = false;
    } else if (formData.powerRequirement.trim().length < 3) {
        errors.powerRequirement = "Power requirement must be at least 3 characters.";
        isValid = false;
    }

    // Duration
    if (!formData.duration.trim()) {
      errors.duration = "Duration is required.";
      isValid = false;
    } else if (formData.duration.trim().length < 3) {
        errors.duration = "Duration must be at least 3 characters.";
        isValid = false;
    }

    // Installation Time
    if (!formData.installationTime.trim()) {
      errors.installationTime = "Installation time is required.";
      isValid = false;
    } else if (formData.installationTime.trim().length < 3) {
        errors.installationTime = "Installation time must be at least 3 characters.";
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

    // Contact Phone
    if (!formData.contactPhone.trim()) {
      errors.contactPhone = "Contact phone is required.";
      isValid = false;
    } else if (!/^\+?[0-9\s-()]{7,15}$/.test(formData.contactPhone.trim())) {
      errors.contactPhone = "Please enter a valid phone number.";
      isValid = false;
    }

    // Contact Email
    if (!formData.contactEmail.trim()) {
      errors.contactEmail = "Contact email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail.trim())) {
      errors.contactEmail = "Please enter a valid email address.";
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
        numberOfUnits: parseInt(formData.numberOfUnits),
        image: image // Ensure image is included
      };
  
      const response = await api.post('/api/lighting/add', formattedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      alert('Lighting details saved successfully!');
  
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
      setValidationErrors({}); // Clear validation errors on successful submission
    } catch (error) {
      console.error('Error:', error);
      alert(`Error saving lighting details: ${error.response?.data?.message || error.message}`);
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
            <label>Lighting Type:</label>
            <input
              type="text"
              name="lightingType"
              value={formData.lightingType}
              onChange={handleInputChange}
              placeholder="Enter lighting type (LED, Traditional, etc.)"
              // Removed `required` HTML attribute
            />
            {validationErrors.lightingType && (
              <p className="error-message">{validationErrors.lightingType}</p>
            )}
          </div>

          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              step="0.01" // Allow decimal values for currency
            />
            {validationErrors.price && (
              <p className="error-message">{validationErrors.price}</p>
            )}
          </div>

          <div className="form-group">
            <label>Number of Units:</label>
            <input
              type="number"
              name="numberOfUnits"
              value={formData.numberOfUnits}
              onChange={handleInputChange}
              placeholder="Enter number of lighting units"
            />
            {validationErrors.numberOfUnits && (
              <p className="error-message">{validationErrors.numberOfUnits}</p>
            )}
          </div>

          <div className="form-group">
            <label>Power Requirement:</label>
            <input
              type="text"
              name="powerRequirement"
              value={formData.powerRequirement}
              onChange={handleInputChange}
              placeholder="Enter power requirement (e.g., 1000W)"
            />
            {validationErrors.powerRequirement && (
              <p className="error-message">{validationErrors.powerRequirement}</p>
            )}
          </div>

          <div className="form-group">
            <label>Duration:</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="Enter duration (e.g., 6 hours)"
            />
            {validationErrors.duration && (
              <p className="error-message">{validationErrors.duration}</p>
            )}
          </div>

          <div className="form-group">
            <label>Installation Time:</label>
            <input
              type="text"
              name="installationTime"
              value={formData.installationTime}
              onChange={handleInputChange}
              placeholder="Enter installation time required"
            />
            {validationErrors.installationTime && (
              <p className="error-message">{validationErrors.installationTime}</p>
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
            <label>Contact Phone:</label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleInputChange}
              placeholder="Enter contact phone"
            />
            {validationErrors.contactPhone && (
              <p className="error-message">{validationErrors.contactPhone}</p>
            )}
          </div>

          <div className="form-group">
            <label>Contact Email:</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleInputChange}
              placeholder="Enter contact email"
            />
            {validationErrors.contactEmail && (
              <p className="error-message">{validationErrors.contactEmail}</p>
            )}
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description of lighting setup"
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

export default LightingDetails;