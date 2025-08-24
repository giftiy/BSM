import React, { useState } from 'react';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import './AdminViewTransactions.css'; // Faayilii CSS haaraa ni uumna

// Daataa fakkeenyaa bal'aa
const allTransactionsData = [
    { id: 'TXN728', customer: 'Lensa Tadesse', amount: 1500, type: 'Deposit', date: '2025-08-22', status: 'Completed', branch: 'Bole' },
    { id: 'TXN729', customer: 'Bona Megersa', amount: -300, type: 'Withdrawal', date: '2025-08-22', status: 'Completed', branch: 'CMC' },
    { id: 'TXN730', customer: 'System', amount: -15, type: 'Fee', date: '2025-08-22', status: 'System', branch: 'N/A' },
    { id: 'TXN731', customer: 'Hana Girma', amount: -500, type: 'Transfer', date: '2025-08-21', status: 'Pending', branch: 'Sarbet' },
    { id: 'TXN732', customer: 'Kebede Alemu', amount: 2500, type: 'Deposit', date: '2025-08-21', status: 'Completed', branch: '4 Kilo' },
    // Add more transactions to test pagination
];

const AdminViewTransactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredTransactions = allTransactionsData.filter(tx => {
    const matchesSearch = tx.customer.toLowerCase().includes(searchTerm.toLowerCase()) || tx.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || tx.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <AdminLayout searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)}>
      <div className="view-transactions-container">
        <div className="page-header">
          <h1>System-Wide Transactions</h1>
          <p>Monitor and review all transactions across the system.</p>
        </div>
        
        <div className="filter-controls">
            <select onChange={(e) => setFilterType(e.target.value)} value={filterType}>
                <option value="All">All Types</option>
                <option value="Deposit">Deposit</option>
                <option value="Withdrawal">Withdrawal</option>
                <option value="Transfer">Transfer</option>
                <option value="Fee">Fee</option>
            </select>
        </div>

        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer/User</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Branch</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(tx => (
                <tr key={tx.id}>
                  <td>{tx.id}</td>
                  <td>{tx.customer}</td>
                  <td>{tx.type}</td>
                  <td className={tx.amount > 0 ? 'amount-deposit' : 'amount-withdraw'}>
                    ${Math.abs(tx.amount).toFixed(2)}
                  </td>
                  <td>{tx.date}</td>
                  <td>{tx.branch}</td>
                  <td><span className={`status ${tx.status.toLowerCase()}`}>{tx.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminViewTransactions;