import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Import Axios helper

const Login = () => {
  const [userRole, setUserRole] = useState("Customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error handling state
  const navigate = useNavigate();

  const handlelogin = async () => {
    try {
      const response = await api.post("/login", { email, password }); // Replace "/login" with your endpoint
      console.log("Backend Response:", response.data);

      // Handle login success (e.g., save token to localStorage)
      localStorage.setItem("token", response.data.token);
      setError("");
      navigate(`/${userRole.toLowerCase()}`); // Navigate based on role
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials!");
    }
  };

  const handlesignin = () => {
    navigate("/signin");
  };

  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">{userRole} Login</h2>
        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <label>User Role</label>
          <select value={userRole} onChange={handleRoleChange} className="form-input">
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
            <option value="Employee">Employee</option>
          </select>
        </div>

        <div className="form-group">
          <label>Email Id</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </div>

        <button onClick={handlelogin} className="login-button">
          Login
        </button>

        {userRole === "Customer" && (
          <button className="register" onClick={handlesignin}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
