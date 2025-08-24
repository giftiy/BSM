// Faayilii: /src/pages/auth/RegisterPage.jsx
// Waan duraan keessa jiru hunda kanaan bakka buusaa

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
// import ThemeToggle from '../../components/common/ThemeToggle.jsx';
import '../../assets/styles/Auth.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'customer',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }
    try {
      const registeredUser = await register(formData);
      // Gara daashbordii sirriitti qajeelchuu
      if (registeredUser.role === 'staff') navigate('/staff/dashboard');
      else if (registeredUser.role === 'customer') navigate('/dashboard');
      else if (registeredUser.role === 'admin') navigate('/admin/dashboard');
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-bg"></div>
      {/* <ThemeToggle /> */}
      <div className="auth-card">
        <div className="auth-panel form-panel">
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-header">
              <h2 className="title">Create an Account</h2>
              <p className="subtitle">Join us to manage your finances efficiently.</p>
            </div>
            <div className="form-group">
              <input type="text" name="fullName" placeholder="Full Name" className="form-input" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="email" name="email" placeholder="Email Address" className="form-input" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <select name="role" value={formData.role} onChange={handleChange} className="form-input">
                <option value="customer">Register as Customer</option>
                <option value="staff">Register as Staff</option>
                <option value="admin">Register as Admin</option>
              </select>
            </div>
            <div className="form-group">
              <input type="password" name="password" placeholder="Password" className="form-input" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="password" name="confirmPassword" placeholder="Confirm Password" className="form-input" onChange={handleChange} required />
            </div>
            <button type="submit" className="form-button">CREATE ACCOUNT</button>
            <p className="form-footer">
              Already have an account? <Link to="/login" className="form-link">Sign In</Link>
            </p>
          </form>
        </div>
        <div className="auth-panel branding-panel">
          <h1 className="logo">Start Your Journey</h1>
          <p className="description">Access premium features and manage your finances with our cutting-edge digital banking solutions.</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;