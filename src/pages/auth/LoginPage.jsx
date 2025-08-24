// Faayilii: /src/pages/auth/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { FaShieldAlt, FaMobileAlt, FaUniversity } from 'react-icons/fa';
import '../../assets/styles/Auth.css';

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return alert("Please provide a User ID");
    
    setIsSubmitting(true);
    try {
      const loggedInUser = await login({ userId, password });
      
      // Navigatiin ofumaan AppRoutes keessatti akka hojjetuuf xiqqoo eegna
      // Haa ta'u malee, UX saffisaa ta'eef asitti qajeelchuun gaariidha.
      if (loggedInUser.role === 'staff') navigate('/staff/dashboard', { replace: true });
      else if (loggedInUser.role === 'customer') navigate('/dashboard', { replace: true });
      else if (loggedInUser.role === 'admin') navigate('/admin/dashboard', { replace: true });

    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-panel branding-panel">
            <div className="brand-content">
                <div className="logo-container"> <FaShieldAlt /> <span>SecureBank</span> </div>
                <h1 className="tagline">Digital Banking, Redefined.</h1>
                <p className="description">Experience seamless and secure banking right at your fingertips. Your financial partner for a brighter future.</p>
                <div className="feature-showcase">
                    <div className="feature-item"> <FaMobileAlt /> <span>Mobile Access</span> </div>
                    <div className="feature-item"> <FaUniversity /> <span>Global Reach</span> </div>
                    <div className="feature-item"> <FaShieldAlt /> <span>Trusted Security</span> </div>
                </div>
            </div>
        </div>
        <div className="auth-panel form-panel">
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-header">
              <h2 className="title">Sign In</h2>
              <p className="subtitle">Welcome back! Please enter your details.</p>
            </div>
            <div className="form-group">
              <input type="text" placeholder="User ID (admin, staff, customer)" className="form-input" value={userId} onChange={(e) => setUserId(e.target.value)} required disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isSubmitting} />
            </div>
            {/* "Forgot Password" fi "Remember me" haqamaniiru */}
            <button type="submit" className="form-button" disabled={isSubmitting}>
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
            <p className="form-footer">
              Don't have an account? <Link to="/register" className="form-link">Register Now</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;