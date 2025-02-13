import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/login.css"
import "../styles/signin.css"

const Login = () => {
  const [userRole, setUserRole] = useState("User");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { email, password, role: userRole });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("user_name", response.data.name);
      setError("");

      if (userRole === "Employee") {
        navigate("/EmployeeDashboard");
      } else if (userRole === "Admin") {
        navigate("/AdminDashboard");
      } else {
        navigate("/Customer");
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  const handleSignIn = () => {
    const card = document.querySelector('.signin-card'); // Changed from 'login-card' to 'signin-card'
    if (card) {
      card.classList.add('flip-out-right');
      setTimeout(() => {
        navigate("/signin");
      }, 500);
    } else {
      // Fallback if animation fails
      navigate("/signin");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="card-illustration">
          <div className="illustration-content">
            <div className="character-emoji">🤵</div>
            <h3>Welcome Back!</h3>
            <p>Sign in to continue planning your perfect wedding</p>
          </div>
        </div>
        
        <div className="form-side">
          <div className="wedding-header">
            <div className="rings-animation">
              <div className="ring"></div>
              <div className="ring"></div>
            </div>
            <h2>{userRole} Login</h2>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <select 
                value={userRole} 
                onChange={(e) => setUserRole(e.target.value)} 
                className="form-input"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
              </select>
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <button type="submit" className="auth-button">
              Login
            </button>

            {userRole === "User" && (
              <button type="button" className="flip-button" onClick={handleSignIn}>
                Create Account
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
