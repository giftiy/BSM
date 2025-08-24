// Faayilii: /src/pages/auth/RegisterPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { FaShieldAlt, FaUserPlus, FaCreditCard, FaHeadset } from 'react-icons/fa'; // Icon haaraa
import '../../assets/styles/Auth.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', role: 'customer', password: '', confirmPassword: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) { return alert("Passwords do not match!"); }
    
    setIsSubmitting(true);
    try {
      const registeredUser = await register(formData);
      if (registeredUser.role === 'staff') navigate('/staff/dashboard');
      else if (registeredUser.role === 'customer') navigate('/dashboard');
      else if (registeredUser.role === 'admin') navigate('/admin/dashboard');
    // eslint-disable-next-line no-unused-vars
    } catch (error) { 
        alert("Registration failed. Please try again."); 
        setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-panel form-panel">
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-header">
              <h2 className="title">Create Your Secure Account</h2>
              <p className="subtitle">Begin your seamless banking journey with us.</p>
            </div>
            <div className="form-group"> <input type="text" name="fullName" placeholder="Full Name" className="form-input" onChange={handleChange} required disabled={isSubmitting}/> </div>
            <div className="form-group"> <input type="email" name="email" placeholder="Email Address" className="form-input" onChange={handleChange} required disabled={isSubmitting}/> </div>
            <div className="form-group">
              <select name="role" value={formData.role} onChange={handleChange} className="form-input" disabled={isSubmitting}>
                <option value="customer">Register as Customer</option> <option value="staff">Register as Staff</option> <option value="admin">Register as Admin</option>
              </select>
            </div>
            <div className="form-group"> <input type="password" name="password" placeholder="Password" className="form-input" onChange={handleChange} required disabled={isSubmitting}/> </div>
            <div className="form-group"> <input type="password" name="confirmPassword" placeholder="Confirm Password" className="form-input" onChange={handleChange} required disabled={isSubmitting}/> </div>
            <button type="submit" className="form-button" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
            <p className="form-footer"> Already have an account? <Link to="/login" className="form-link">Sign In</Link> </p>
          </form>
        </div>
        <div className="auth-panel branding-panel">
            <div className="brand-content">
                <div className="logo-container"> <FaShieldAlt /> <span>SecureBank</span> </div>
                <h1 className="tagline">Your Financial Future Starts Here.</h1>
                <p className="description">Join thousands of satisfied users who trust us with their financial needs. Quick, easy, and secure registration.</p>
               
                <div className="feature-showcase">
                    <div className="feature-item">
                        <FaUserPlus />
                        <span>Fast Onboarding</span>
                    </div>
                     <div className="feature-item">
                        <FaCreditCard />
                        <span>Instant Card</span>
                    </div>
                     <div className="feature-item">
                        <FaHeadset />
                        <span>24/7 Support</span>
                    </div>
                </div>
                
            </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;