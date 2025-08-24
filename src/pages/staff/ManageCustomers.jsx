// /src/pages/staff/ManageCustomers.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StaffLayout from '../../components/layout/staff/StaffLayout';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import './ManageCustomers.css'; // Faayilii CSS haaraa ni uumna

// Daataa fakkeenyaaf kan fooyya'e
const mockCustomers = [
  { id: 101, fullName: 'Lensa Tadesse', accountNumber: '100012345678', joinDate: '2025-08-22', status: 'Active' },
  { id: 102, fullName: 'Bona Megersa', accountNumber: '100098765432', joinDate: '2025-08-21', status: 'Active' },
  { id: 103, fullName: 'Hana Girma', accountNumber: '100055554444', joinDate: '2025-08-20', status: 'Inactive' },
  { id: 104, fullName: 'Kebede Alemu', accountNumber: '100011112222', joinDate: '2025-08-19', status: 'Active' },
];

const ManageCustomers = () => {
  const [customers, setCustomers] = useState(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  const filteredCustomers = customers.filter(c =>
    c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.accountNumber.includes(searchTerm)
  );
  
  return (
    // Fuulli kun guutuun StaffLayout keessa jira
    <StaffLayout searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)}>
      <div className="manage-customers-container">
        <div className="page-header">
          <h1>Manage Customers</h1>
          <p>View, edit, or delete customer information from this panel.</p>
        </div>

        <div className="customers-table-wrapper">
          <table className="customers-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Account Number</th>
                <th>Join Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => (
                <tr key={customer.id}>
                  <td>{customer.fullName}</td>
                  <td>{customer.accountNumber}</td>
                  <td>{customer.joinDate}</td>
                  <td><span className={`status ${customer.status.toLowerCase()}`}>{customer.status}</span></td>
                  <td className="actions-cell">
                    {/* Liinkiin gara fuula bal'inaatti geessu */}
                    <Link to={`/staff/customer-details/${customer.id}`} className="action-btn view">
                        <FaEye /> View
                    </Link>
                    <button className="action-btn edit">
                        <FaEdit /> Edit
                    </button>
                    <button className="action-btn delete" onClick={() => handleDelete(customer.id)}>
                        <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              
              {/* Yoo maamilli hin argamne */}
              {filteredCustomers.length === 0 && (
                  <tr>
                      <td colSpan="5" className="no-results">No customers found matching your search.</td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </StaffLayout>
  );
};

export default ManageCustomers;