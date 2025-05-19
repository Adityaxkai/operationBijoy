import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import validate from "./LoginValidation";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value // Store direct value instead of array
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8081/login', {
          method: 'POST', 
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,    
            password: formData.password
          }),
        });
  
        const data = await response.json();
        
        if (response.ok) {
          // Assuming the response contains a token
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('isLoggedIn', 'true');
          navigate('/');
        } else {
          setErrors({ submit: data.message || 'Login failed. Please check credentials.' });
        }
      } catch (error) {
        setErrors({ submit: `Network error: ${error.message}` });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="auth-container fs-3 fw-normal no-scrollbar">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Please enter your credentials to log in.</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className={`form-input fs-4 ${errors.email ? "is-invalid" : ""}`}
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleInput}
              name="email"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className={`form-input fs-4 ${errors.password ? "is-invalid" : ""}`}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInput}
              name="password"
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          
          <button type="submit" className="cta-button" disabled={isLoading}>{isLoading?"Login...":"Login"}</button>
        </form>
        
        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/signup" className="auth-link fs-4 text-decoration-none">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;