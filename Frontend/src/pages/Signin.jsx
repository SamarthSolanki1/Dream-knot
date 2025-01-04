import React, { useState } from "react";
import "../styles/signin.css";
import api from "../api"; // Import Axios helper

const Sign = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(""); // Error message state
  const [success, setSuccess] = useState(""); // Success message state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setSuccess("");
      return;
    }

    try {
      // Call backend API to register user
      const response = await api.post("/register", {
        name: formData.name,
        email: formData.email,
        mobileNumber: formData.mobile, // Corrected from mobilenumber to mobile
        password: formData.password,
        login : formData.confirmPassword
      });

      // On successful response
      setSuccess("Account created successfully!");
      setError("");
      console.log("Backend Response:", response.data);

      // Clear form fields after successful submission
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      // Handle error response
      setError(err.response?.data?.message || "An error occurred!");
      setSuccess("");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1 className="signin-title">Sign In</h1>

        {/* Display success or error messages */}
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        {/* Form Fields */}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name} // Corrected from Name to name
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Email Id</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            placeholder="Enter your mobile number"
            value={formData.mobile} // Corrected from mobilenumber to mobile
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <button onClick={handleSubmit} className="signin-button">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Sign;
