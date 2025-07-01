import React, { useState, useRef } from "react";
import "../styles/AddDetails.css";
import api from "../api";

const MandapDetails = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    capacity: "",
    decorationType: "",
    contactPerson: "",
    description: ""
  });
  const [errors, setErrors] = useState({});
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

  const validate = () => {
    const newErrors = {};

    if (!image) newErrors.image = "Image is required.";

    if (!formData.name || formData.name.trim().length < 3)
      newErrors.name = "Name must be at least 3 characters.";

    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0)
      newErrors.price = "Price must be a positive number.";

    if (!formData.capacity || isNaN(formData.capacity) || parseInt(formData.capacity) <= 0)
      newErrors.capacity = "Capacity must be a positive number.";

    if (!formData.decorationType || formData.decorationType.trim().length < 3)
      newErrors.decorationType = "Decoration Type must be at least 3 characters.";

    if (!formData.contactPerson || formData.contactPerson.trim().length < 3)
      newErrors.contactPerson = "Contact Person must be at least 3 characters.";

    if (!formData.description || formData.description.trim().length < 10)
      newErrors.description = "Description must be at least 10 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const formattedData = {
        ...formData,
        price: parseFloat(formData.price),
        capacity: parseInt(formData.capacity),
        image: image
      };

      await api.post('/api/mandap/add', formattedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('Mandap details saved successfully!');

      // Reset form
      setFormData({
        name: "",
        price: "",
        capacity: "",
        decorationType: "",
        contactPerson: "",
        description: ""
      });
      setImage(null);
      setErrors({});
    } catch (error) {
      console.error('Error:', error);
      alert(`Error saving mandap details: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="add-details-container">
      <div className="form-wrapper">
        <h1 className="form-title">Add Mandap Details</h1>

        <form className="details-form" onSubmit={handleSubmit}>
          <div
            ref={dropZoneRef}
            className={`upload-area ${isDragging ? "dragging" : ""} ${image ? "has-image" : ""}`}
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
          {errors.image && <p className="error-text">{errors.image}</p>}

          {["name", "price", "capacity", "decorationType", "contactPerson", "description"].map((field) => (
            <div className="form-group" key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}:</label>
              {field !== "description" ? (
                <input
                  type={["price", "capacity"].includes(field) ? "number" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field}`}
                  required
                />
              ) : (
                <textarea
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  required
                />
              )}
              {errors[field] && <p className="error-text">{errors[field]}</p>}
            </div>
          ))}

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MandapDetails;
