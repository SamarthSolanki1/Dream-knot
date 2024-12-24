import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [userRole, setUserRole] = useState("Customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlesignin = () => {
    navigate('./Signin');
  }
  const handlelogin = () => {
    navigate('./Customer')
  }

  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Dynamic Title */}
        <h2 className="login-title">{userRole} Login</h2>

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
        
        {/* Only show Sign In button when userRole is Customer */}
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
