// /src/pages/admin/UserManagement.jsx
import React, { useState } from 'react';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import './UserManagement.css';

const mockUsers = [
  { id: 1, name: 'Lensa Tadesse', email: 'lensa@example.com', role: 'Customer', status: 'Active' },
  { id: 2, name: 'Abebe Kebede', email: 'abebe.k@bank.com', role: 'Staff', status: 'Active' },
  { id: 3, name: 'Chaltu Benti', email: 'chaltu.b@bank.com', role: 'Admin', status: 'Inactive' },
];

const UserManagement = () => {
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <AdminLayout searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)}>
      <div className="user-management-container">
        <div className="page-header">
          <h1>User Management</h1>
          <button className="add-user-btn"><FaUserPlus /> Add New User</button>
        </div>
        <div className="table-wrapper">
          <table className="custom-table">
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td><td>{user.email}</td><td>{user.role}</td>
                  <td><span className={`status ${user.status.toLowerCase()}`}>{user.status}</span></td>
                  <td className="actions-cell">
                    <button className="action-btn edit"><FaEdit /> Edit</button>
                    <button className="action-btn delete"><FaTrash /> Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};
export default UserManagement;