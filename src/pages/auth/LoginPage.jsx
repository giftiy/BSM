// Faayilii: /src/pages/auth/LoginPage.jsx
// Waan duraan keessa jiru hunda kanaan bakka buusaa

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
// import ThemeToggle from '../../components/common/ThemeToggle.jsx'; // Yoo barbaaddan
import '../../assets/styles/Auth.css'; // Faayilii CSS waliinii fayyadamna

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { user, loading, login } = useAuth();

  // Yoo duraan seenee jiraate, ofumaan gara daashbordii geessa
  useEffect(() => {
    if (!loading && user) {
      if (user.role === 'staff') navigate('/staff/dashboard');
      else if (user.role === 'customer') navigate('/dashboard');
      else if (user.role === 'admin') navigate('/admin/dashboard');
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return alert("Please provide a User ID (e.g., 'admin', 'staff', 'customer')");
    
    try {
      await login({ userId, password });
      // Navigatiin ofumaan 'useEffect' keessatti hojjetama
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check credentials.");
    }
  };

  if (loading || user) {
    return <div className="auth-container"><div>Loading...</div></div>;
  }

  return (
    <div className="auth-container">
      <div className="auth-bg"></div>
      {/* <ThemeToggle /> */}
      <div className="auth-card">
        <div className="auth-panel branding-panel">
          <h1 className="logo">Bank Management System</h1>
          <p className="description">Advanced, secure, and intuitive financial solutions for the modern world.</p>
        </div>
        <div className="auth-panel form-panel">
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-header">
              <h2 className="title">Welcome Back</h2>
              <p className="subtitle">Please enter your details to sign in.</p>
            </div>
            <div className="form-group">
              <input type="text" placeholder="User ID (e.g., admin, staff, customer)" className="form-input" value={userId} onChange={(e) => setUserId(e.target.value)} required />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="form-options">
              <label className="form-checkbox"> <input type="checkbox" /> Stay signed in </label>
              <Link to="/forgot-password" className="form-link">Forgot Password?</Link>
            </div>
            <button type="submit" className="form-button">LOGIN</button>
            <p className="form-footer">
              Don't have an account? <Link to="/register" className="form-link">Create one</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;