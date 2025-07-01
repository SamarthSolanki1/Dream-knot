import React, { useState, useRef } from "react";
import "../styles/AddDetails.css";
import api from "../api";

const CarRentalDetails = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    carModel: "",
    pricePerDay: "",
    seatingCapacity: "",
    color: "",
    registrationNumber: "",
    driverName: "",
    driverContact: "",
    description: ""
  });
  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const validate = () => {
    const newErrors = {};

    if (!image) newErrors.image = "Image is required.";
    if (!formData.carModel.trim()) newErrors.carModel = "Car model is required.";
    if (!formData.pricePerDay || parseFloat(formData.pricePerDay) <= 0)
      newErrors.pricePerDay = "Enter a valid price greater than 0.";
    if (!formData.seatingCapacity || parseInt(formData.seatingCapacity) <= 0)
      newErrors.seatingCapacity = "Seating capacity must be greater than 0.";
    if (!formData.registrationNumber.trim())
      newErrors.registrationNumber = "Registration number is required.";
    else if (!/^[A-Za-z0-9\s-]+$/.test(formData.registrationNumber))
      newErrors.registrationNumber = "Registration number is invalid.";
    if (!formData.driverName.trim()) newErrors.driverName = "Driver name is required.";
    if (!formData.driverContact.trim())
      newErrors.driverContact = "Driver contact is required.";
    else if (!/^[6-9]\d{9}$/.test(formData.driverContact))
      newErrors.driverContact = "Enter a valid 10-digit mobile number.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const formattedData = {
        modelName: formData.carModel,
        pricePerDay: parseFloat(formData.pricePerDay),
        capacity: parseInt(formData.seatingCapacity),
        registrationNumber: formData.registrationNumber,
        contactPerson: formData.driverName,
        contactNumber: formData.driverContact,
        description: formData.description,
        image: image
      };

      await api.post("/api/car-rental/add", formattedData, {
        headers: { "Content-Type": "application/json" }
      });

      alert("Car rental details saved successfully!");
      setFormData({
        carModel: "",
        pricePerDay: "",
        seatingCapacity: "",
        color: "",
        registrationNumber: "",
        driverName: "",
        driverContact: "",
        description: ""
      });
      setImage(null);
      setErrors({});
    } catch (error) {
      console.error("Error:", error);
      alert(
        `Error saving car rental details: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <div className="add-details-container">
      <div className="form-wrapper">
        <h1 className="form-title">Add Car Rental Details</h1>

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
                <p>Drag and drop a car image here, or click to select</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="file-input"
              accept="image/*"
            />
            {errors.image && <p className="error-message">{errors.image}</p>}
          </div>

          <div className="form-group">
            <label>Car Model:</label>
            <input
              type="text"
              name="carModel"
              value={formData.carModel}
              onChange={handleInputChange}
              placeholder="Enter car model"
              required
            />
            {errors.carModel && <p className="error-message">{errors.carModel}</p>}
          </div>

          <div className="form-group">
            <label>Price Per Day:</label>
            <input
              type="number"
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleInputChange}
              placeholder="Enter price per day"
              required
            />
            {errors.pricePerDay && <p className="error-message">{errors.pricePerDay}</p>}
          </div>

          <div className="form-group">
            <label>Seating Capacity:</label>
            <input
              type="number"
              name="seatingCapacity"
              value={formData.seatingCapacity}
              onChange={handleInputChange}
              placeholder="Enter seating capacity"
              required
            />
            {errors.seatingCapacity && (
              <p className="error-message">{errors.seatingCapacity}</p>
            )}
          </div>

          <div className="form-group">
            <label>Registration Number:</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              placeholder="Enter registration number"
              required
            />
            {errors.registrationNumber && (
              <p className="error-message">{errors.registrationNumber}</p>
            )}
          </div>

          <div className="form-group">
            <label>Driver Name:</label>
            <input
              type="text"
              name="driverName"
              value={formData.driverName}
              onChange={handleInputChange}
              placeholder="Enter driver name"
              required
            />
            {errors.driverName && <p className="error-message">{errors.driverName}</p>}
          </div>

          <div className="form-group">
            <label>Driver Contact:</label>
            <input
              type="tel"
              name="driverContact"
              value={formData.driverContact}
              onChange={handleInputChange}
              placeholder="Enter driver contact number"
              required
            />
            {errors.driverContact && (
              <p className="error-message">{errors.driverContact}</p>
            )}
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter detailed description"
              required
            />
            {errors.description && (
              <p className="error-message">{errors.description}</p>
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

export default CarRentalDetails;
