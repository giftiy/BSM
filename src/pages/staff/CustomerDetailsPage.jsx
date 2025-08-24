// /src/pages/staff/CustomerDetailsPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import StaffLayout from '../../components/layout/staff/StaffLayout';
import { FaUser, FaEnvelope, FaPhone, FaArrowLeft, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import './CustomerDetailsPage.css'; // Faayilii CSS haaraa ni uumna

// Daataa fakkeenyaaf - Appii dhugaa keessatti kuni API irraa dhufa
const mockCustomersData = [
  { id: 101, fullName: 'Lensa Tadesse', email: 'lensa.t@example.com', phone: '0911223344', joinDate: '2025-08-22', status: 'Active', accountNumber: '100012345678', accountType: 'Savings', balance: 5450.75, address: 'Bole, Addis Ababa' },
  { id: 102, fullName: 'Bona Megersa', email: 'bona.m@example.com', phone: '0922334455', joinDate: '2025-08-21', status: 'Active', accountNumber: '100098765432', accountType: 'Business', balance: 15200.00, address: 'CMC, Addis Ababa' },
];
const mockTransactions = [{id:1, date:'2025-08-22', type:'Deposit', amount:500}, {id:2, date:'2025-08-20', type:'Withdrawal', amount:-150}];


const CustomerDetailsPage = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Daataa maamilaa 'fech' gochuu (fakkeessu)
  useEffect(() => {
    const foundCustomer = mockCustomersData.find(c => c.id === parseInt(id));
    setCustomer(foundCustomer);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // API call to save data would go here
    console.log('Saving data:', customer);
    setIsEditing(false);
  };
  
  if (!customer) {
    return <StaffLayout><div><h2>Customer not found!</h2></div></StaffLayout>;
  }

  return (
    <StaffLayout>
      <div className="customer-details-container">
        <Link to="/staff/manage-customers" className="back-link"><FaArrowLeft /> Back to Customers</Link>

        <div className="details-grid">
          {/* Kutaa Bitaa: Piroofaayilii */}
          <div className="profile-section">
            <div className="details-card profile-header">
              <img src={`https://i.pravatar.cc/100?u=${customer.id}`} alt="Customer" />
              <h2>{customer.fullName}</h2>
              <p>Account: {customer.accountNumber}</p>
              {!isEditing && <button className="edit-btn" onClick={() => setIsEditing(true)}><FaEdit /> Edit Profile</button>}
            </div>

            <div className="details-card">
              <h3>Personal Information</h3>
              {isEditing ? (
                  <div className="edit-form">
                    <div className="form-group"><label>Full Name</label><input type="text" name="fullName" value={customer.fullName} onChange={handleInputChange} /></div>
                    <div className="form-group"><label>Email</label><input type="email" name="email" value={customer.email} onChange={handleInputChange} /></div>
                    <div className="form-group"><label>Phone</label><input type="text" name="phone" value={customer.phone} onChange={handleInputChange} /></div>
                    <div className="form-group"><label>Address</label><input type="text" name="address" value={customer.address} onChange={handleInputChange} /></div>
                  </div>
              ) : (
                  <div className="view-info">
                    <p><strong><FaUser /> Full Name:</strong> {customer.fullName}</p>
                    <p><strong><FaEnvelope /> Email:</strong> {customer.email}</p>
                    <p><strong><FaPhone /> Phone:</strong> {customer.phone}</p>
                  </div>
              )}
            </div>
             {isEditing && (
                <div className="form-actions">
                    <button className="action-btn save" onClick={handleSave}><FaSave /> Save Changes</button>
                    <button className="action-btn cancel" onClick={() => setIsEditing(false)}><FaTimes /> Cancel</button>
                </div>
            )}
          </div>
          
          {/* Kutaa Mirgaa: Odeeffannoo Herregaa */}
          <div className="activity-section">
            <div className="details-card">
                <h3>Account Summary</h3>
                <div className="summary-grid">
                    <p><strong>Balance:</strong><span>${customer.balance.toFixed(2)}</span></p>
                    <p><strong>Account Type:</strong><span>{customer.accountType}</span></p>
                    <p><strong>Joined:</strong><span>{customer.joinDate}</span></p>
                    <p><strong>Status:</strong><span className={`status ${customer.status.toLowerCase()}`}>{customer.status}</span></p>
                </div>
            </div>
            <div className="details-card">
                <h3>Recent Transactions</h3>
                <table className="mini-transactions-table">
                    <tbody>
                        {mockTransactions.map(tx => (
                            <tr key={tx.id}>
                                <td>{tx.date}</td>
                                <td>{tx.type}</td>
                                <td className={tx.amount > 0 ? 'amount-deposit' : 'amount-withdraw'}>${tx.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
};

export default CustomerDetailsPage;