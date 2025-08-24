// /src/pages/staff/TransactionsPage.jsx

import React, { useState, useContext } from 'react';
import StaffLayout from '../../components/layout/staff/StaffLayout';
import { ThemeContext } from '../../context/ThemeContext'; // Theme context fayyadamna
import './TransactionsPage.css'; // Faayilii CSS haaraa ni uumna

// Daataa fakkeenyaaf (bal'ifameera)
const allTransactions = [
  { id: 'TXN72836', customer: 'John Doe', amount: 500, type: 'Withdrawal', date: '2025-08-20', status: 'Completed', branch: 'Bole', initiatedBy: 'Abebe K.' },
  { id: 'TXN92743', customer: 'Jane Smith', amount: 1200, type: 'Deposit', date: '2025-08-19', status: 'Completed', branch: 'CMC', initiatedBy: 'Chaltu B.' },
  { id: 'TXN10384', customer: 'Mark Johnson', amount: 300, type: 'Transfer', date: '2025-08-18', status: 'Pending', branch: 'Sarbet', initiatedBy: 'Mark J.' },
  { id: 'TXN54829', customer: 'Alice Brown', amount: 450, type: 'Withdrawal', date: '2025-08-16', status: 'Failed', branch: '4 Kilo', initiatedBy: 'Abebe K.' },
  // ... dabalata
];

// Komponentii xiqqaa kan bal'ina ibsuuf (Modal)
const TransactionDetailModal = ({ transaction, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Transaction Details</h2>
                    <button onClick={onClose} className="close-button">&times;</button>
                </div>
                <div className="modal-body">
                    <p><strong>Transaction ID:</strong> {transaction.id}</p>
                    <p><strong>Customer:</strong> {transaction.customer}</p>
                    <p><strong>Amount:</strong> ${transaction.amount}</p>
                    <p><strong>Type:</strong> {transaction.type}</p>
                    <p><strong>Date:</strong> {transaction.date}</p>
                    <p><strong>Branch:</strong> {transaction.branch}</p>
                    <p><strong>Initiated By:</strong> {transaction.initiatedBy}</p>
                    <p><strong>Status:</strong> <span className={`status ${transaction.status.toLowerCase()}`}>{transaction.status}</span></p>
                </div>
            </div>
        </div>
    );
};


const TransactionsPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { theme } = useContext(ThemeContext); // Theme argachuuf
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const filteredTransactions = allTransactions.filter(t =>
    t.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <StaffLayout searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)}>
      <div className="transaction-page-container">
        <div className="page-header">
          <h1>All Transactions</h1>
          <p>Click on a row to see more details.</p>
        </div>

        <div className="transaction-table-wrapper">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(transaction => (
                <tr key={transaction.id} onClick={() => setSelectedTransaction(transaction)}>
                  <td>{transaction.id}</td>
                  <td>{transaction.customer}</td>
                  <td>${transaction.amount}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.date}</td>
                  <td><span className={`status ${transaction.status.toLowerCase()}`}>{transaction.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Yoo transeekshiniin filatame, Modal agarsiisi */}
      {selectedTransaction && (
          <TransactionDetailModal 
              transaction={selectedTransaction} 
              onClose={() => setSelectedTransaction(null)}
          />
      )}
    </StaffLayout>
  );
};

export default TransactionsPage;