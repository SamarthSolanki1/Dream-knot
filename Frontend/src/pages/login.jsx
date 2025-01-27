import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Import Axios helper

const Login = () => {
  const [userRole, setUserRole] = useState("User");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error handling state
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { email, password, role: userRole });

      console.log("Backend Response:", response.data);

      // Save token and user info to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("user_name", response.data.name);
      setError("");

      // Navigate to role-specific page
      if (userRole === "Employee") {
        navigate("/EmployeeDashboard");
      } else {
        navigate("/Customer");
      }
    } catch (err) {
      alert("Invalid Credentials");
      // setError(err.response?.data?.message || "Invalid credentials!");
    }
  };

  const handleSignIn = () => {
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
          <select value={userRole} onChange={handleRoleChange} className="form-input">
            <option value="User">User</option>
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

        <button onClick={handleLogin} className="login-button">
          Login
        </button>

        {userRole === "User" && (
          <button className="register" onClick={handleSignIn}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
