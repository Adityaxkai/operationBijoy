import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import * as jwt_decode from 'jwt-decode';
import validate from "./LoginValidation";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwt_decode(token); // Use jwt_decode correctly
        if (decoded && decoded.exp * 1000 < Date.now()) {
          // Token expired, log out
          localStorage.removeItem('authToken');
          localStorage.removeItem('isLoggedIn');
        }
      } catch (e) {
        console.error("Token decode error:", e);
        localStorage.removeItem('authToken');
        localStorage.removeItem('isLoggedIn');
      }
    }
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST', 
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,    
          password: formData.password
        }),
      });
      
      // First check if we got any response at all
      if (!response) {
        throw new Error('No response from server - check your connection');
      }

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(data.user)); 
        navigate('/');
      } else {
        // More specific error messages based on status code
        let errorMessage = 'Login failed';
        if (response.status === 401) {
          errorMessage = data.message || 'Invalid email or password';
        } else if (response.status === 500) {
          errorMessage = 'Server error - please try again later';
        }
        setErrors({ submit: errorMessage });
      }
    } catch (error) {
      // More detailed error handling
      let errorMessage = error.message;
      if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Cannot connect to server - check your internet connection';
      }
      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  }
};

  return (
    <div className="auth-container fs-3 fw-normal no-scrollbar d-flex flex-column ">
      <Link to="/" className="auth-logo btn btn-primary cta-button control">Home Page</Link>
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
              {errors.submit && (
              <div className="alert alert-danger">
                {errors.submit}
              </div>
              )}
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