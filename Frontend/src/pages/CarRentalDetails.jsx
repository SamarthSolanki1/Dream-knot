import React, { useState, useRef } from "react";
import "../styles/AddDetails.css";

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
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ ...formData, image });
    
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
    
        const response = await fetch('http://localhost:8080/api/car-rental/add', {
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
        alert('Car rental details saved successfully!');
        // Reset form
        setFormData({
            carModel: "",
            pricePerDay: "",
            seatingCapacity: "",
            registrationNumber: "",
            driverName: "",
            driverContact: "",
            description: ""
        });
        setImage(null);
    } catch (error) {
        console.error('Error:', error);
        alert(`Error saving car rental details: ${error.message}`);
    }
};

  return (
    <div className="add-details-container">
      <div className="form-wrapper">
        <h1 className="form-title">Add Car Rental Details</h1>

        <form className="details-form" onSubmit={handleSubmit}>
          {/* Keep the image upload area as is */}
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