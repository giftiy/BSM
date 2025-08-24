// /src/pages/common/ProfilePage.jsx

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaEnvelope, FaShieldAlt, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ProfilePage.css'; 

import StaffLayout from '../../components/layout/staff/StaffLayout';
import AdminLayout from '../../components/layout/admin/AdminLayout';

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading profile...</div>;
  }

  
  const Layout = user.role === 'admin' ? AdminLayout : StaffLayout;

 
  const backPath = user.role === 'admin' ? '/admin/dashboard' : '/staff/dashboard';

  return (
    <Layout>
      <div className="profile-page-container">
        <Link to={backPath} className="back-link"><FaArrowLeft /> Back to Dashboard</Link>
        <h1>My Profile</h1>
        <div className="profile-card">
          <div className="profile-header">
            <img src={`https://i.pravatar.cc/100?u=${user.id}`} alt="Profile" />
            <h2>{user.fullName}</h2>
            <p className="role-badge">{user.role}</p>
          </div>
          <div className="profile-body">
            <h3>User Information</h3>
            <p><strong><FaUser /> Full Name:</strong> {user.fullName}</p>
            <p><strong><FaEnvelope /> Email:</strong> {user.email}</p>
            <p><strong><FaShieldAlt /> Role:</strong> {user.role}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;