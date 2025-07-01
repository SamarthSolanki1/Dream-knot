// DiningDetails.js
import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "../styles/AddDetails.css";
import api from "../api";

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
    // Clear validation error for the field as user types
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // --- Validation Function ---
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Dining Style
    if (!formData.diningStyle.trim()) {
      errors.diningStyle = "Dining style is required.";
      isValid = false;
    } else if (formData.diningStyle.trim().length < 3) {
      errors.diningStyle = "Dining style must be at least 3 characters.";
      isValid = false;
    }

    // Capacity
    if (!formData.capacity) {
      errors.capacity = "Capacity is required.";
      isValid = false;
    } else if (isNaN(formData.capacity) || parseInt(formData.capacity) <= 0) {
      errors.capacity = "Capacity must be a positive number.";
      isValid = false;
    }

    // Menu Options
    if (!formData.menuOptions.trim()) {
      errors.menuOptions = "Menu options are required.";
      isValid = false;
    } else if (formData.menuOptions.trim().length < 10) {
      errors.menuOptions = "Menu options must be at least 10 characters.";
      isValid = false;
    }

    // Staffing Options
    if (!formData.staffingOptions.trim()) {
      errors.staffingOptions = "Staffing options are required.";
      isValid = false;
    } else if (formData.staffingOptions.trim().length < 10) {
      errors.staffingOptions = "Staffing options must be at least 10 characters.";
      isValid = false;
    }

    // Food Service Price
    if (!formData.foodServicePrice) {
      errors.foodServicePrice = "Food service price is required.";
      isValid = false;
    } else if (isNaN(formData.foodServicePrice) || parseFloat(formData.foodServicePrice) < 0) {
      errors.foodServicePrice = "Food service price must be a non-negative number.";
      isValid = false;
    }

    // Staffing Price
    if (!formData.staffingPrice) {
      errors.staffingPrice = "Staffing price is required.";
      isValid = false;
    } else if (isNaN(formData.staffingPrice) || parseFloat(formData.staffingPrice) < 0) {
      errors.staffingPrice = "Staffing price must be a non-negative number.";
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

    // Image validation (optional, as you have drag/drop validation already)
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
        image: image, // Make sure image is included
      };

      const response = await api.post('/api/dining/add', formDataToSubmit, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });

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
      setValidationErrors({}); // Clear validation errors on successful submission
    } catch (error) {
      console.error('Error:', error);
      alert(`Error saving dining details: ${error.response?.data?.message || error.message}`);
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

          {/* Form Fields with Error Display */}
          <div className="form-group">
            <label>Dining Style:</label>
            <input
              type="text"
              name="diningStyle"
              value={formData.diningStyle}
              onChange={handleInputChange}
              placeholder="Enter dining style"
              // Removed `required` HTML attribute to rely solely on JS validation for consistent error handling
            />
            {validationErrors.diningStyle && (
              <p className="error-message">{validationErrors.diningStyle}</p>
            )}
          </div>

          <div className="form-group">
            <label>Capacity:</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              placeholder="Enter dining capacity"
            />
            {validationErrors.capacity && (
              <p className="error-message">{validationErrors.capacity}</p>
            )}
          </div>

          <div className="form-group">
            <label>Menu Options:</label>
            <textarea
              name="menuOptions"
              value={formData.menuOptions}
              onChange={handleInputChange}
              placeholder="Enter available menu options"
            />
            {validationErrors.menuOptions && (
              <p className="error-message">{validationErrors.menuOptions}</p>
            )}
          </div>

          <div className="form-group">
            <label>Staffing Options:</label>
            <textarea
              name="staffingOptions"
              value={formData.staffingOptions}
              onChange={handleInputChange}
              placeholder="Enter available staffing options"
            />
            {validationErrors.staffingOptions && (
              <p className="error-message">{validationErrors.staffingOptions}</p>
            )}
          </div>

          <div className="form-group">
            <label>Food Service Price:</label>
            <input
              type="number"
              name="foodServicePrice"
              value={formData.foodServicePrice}
              onChange={handleInputChange}
              placeholder="Enter food service price"
              step="0.01" // Allow decimal values for currency
            />
            {validationErrors.foodServicePrice && (
              <p className="error-message">{validationErrors.foodServicePrice}</p>
            )}
          </div>

          <div className="form-group">
            <label>Staffing Price:</label>
            <input
              type="number"
              name="staffingPrice"
              value={formData.staffingPrice}
              onChange={handleInputChange}
              placeholder="Enter staffing price"
              step="0.01" // Allow decimal values for currency
            />
            {validationErrors.staffingPrice && (
              <p className="error-message">{validationErrors.staffingPrice}</p>
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

export default DiningDetails;