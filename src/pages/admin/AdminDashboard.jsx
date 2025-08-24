// /src/pages/admin/AdminDashboard.jsx

import React from 'react';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import { FaUsers, FaUniversity, FaExclamationTriangle, FaClipboardList } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './AdminDashboard.css';

// ... Daataa akkuma duraanitti ...
const summaryData = [ { name: 'Customers', value: 1250 }, { name: 'Staff', value: 75 }, { name: 'Admins', value: 5 }, ];
const activityData = [ { name: 'Logins', count: 540 }, { name: 'Transfers', count: 210 }, { name: 'Approvals', count: 45 }, { name: 'New Accounts', count: 15 },];


const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="admin-dashboard-container">
        <div className="page-header">
          <h1>Admin Dashboard</h1>
          <p>System-wide overview and key performance metrics.</p>
        </div>

        <div className="stats-grid">
            <div className="stat-card"> <div className="stat-icon blue"><FaUsers /></div> <div className="stat-info"><h3>Total Users</h3><p>1,330</p></div> </div>
            <div className="stat-card"> <div className="stat-icon green"><FaUniversity /></div> <div className="stat-info"><h3>Total Accounts</h3><p>1,500</p></div> </div>
            <div className="stat-card"> <div className="stat-icon purple"><FaClipboardList /></div> <div className="stat-info"><h3>Pending Approvals</h3><p>12</p></div> </div>
            <div className="stat-card"> <div className="stat-icon red"><FaExclamationTriangle /></div> <div className="stat-info"><h3>Security Alerts</h3><p>3</p></div> </div>
        </div>
        
        <div className="charts-grid">
            <div className="chart-card">
                <h3>User Roles Distribution</h3>
                {/* VVVV --- Dheerinyi fi Margin Jijjiiramaniiru --- VVVV */}
                <ResponsiveContainer width="100%" height={210}>
                    <BarChart data={summaryData} margin={{ top: 5, right: 20, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="chart-card">
                <h3>System Activity Today</h3>
                {/* VVVV --- Dheerinyi fi Margin Jijjiiramaniiru --- VVVV */}
                <ResponsiveContainer width="100%" height={210}>
                    <BarChart data={activityData} margin={{ top: 5, right: 20, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#82ca9d" barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;