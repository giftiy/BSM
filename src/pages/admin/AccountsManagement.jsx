import React, { useState } from 'react';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import '../staff/ManageCustomers.css'; 

const mockAccounts = [
  { id: '100012345678', owner: 'Lensa Tadesse', type: 'Savings', balance: 5450.75, status: 'Active' },
  { id: '100098765432', owner: 'Bona Megersa', type: 'Business', balance: 15200.00, status: 'Active' },
  { id: '100055554444', owner: 'Hana Girma', type: 'Savings', balance: 1200.00, status: 'Frozen' },
];

const AccountsManagement = () => {
  const [accounts, setAccounts] = useState(mockAccounts);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleStatus = (id) => {
    setAccounts(accounts.map(acc => 
      acc.id === id ? { ...acc, status: acc.status === 'Active' ? 'Frozen' : 'Active' } : acc
    ));
  };

  const filteredAccounts = accounts.filter(acc =>
    acc.owner.toLowerCase().includes(searchTerm.toLowerCase()) || acc.id.includes(searchTerm)
  );

  return (
    <AdminLayout searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)}>
      <div className="manage-customers-container">
        <div className="page-header">
          <h1>Accounts Management</h1>
          <p>Oversee and manage all customer accounts.</p>
        </div>
        <div className="customers-table-wrapper">
          <table className="customers-table">
            <thead>
              <tr><th>Account Number</th><th>Owner</th><th>Type</th><th>Balance</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filteredAccounts.map(account => (
                <tr key={account.id}>
                  <td>{account.id}</td><td>{account.owner}</td><td>{account.type}</td>
                  <td>${account.balance.toFixed(2)}</td>
                  <td><span className={`status ${account.status.toLowerCase()}`}>{account.status}</span></td>
                  <td className="actions-cell">
                    <button className={`action-btn ${account.status === 'Active' ? 'delete' : 'approve'}`} onClick={() => toggleStatus(account.id)}>
                      {account.status === 'Active' ? <FaLock /> : <FaLockOpen />}
                      {account.status === 'Active' ? 'Freeze' : 'Unfreeze'}
                    </button>
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
export default AccountsManagement;