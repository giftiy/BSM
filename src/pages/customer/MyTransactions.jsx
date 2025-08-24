// /src/pages/customer/MyTransactions.jsx
import React from 'react';
import CustomerLayout from '../../components/layout/customer/CustomerLayout';
import { FaArrowUp, FaArrowDown, FaFilePdf } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import jsPDF from 'jspdf';
// eslint-disable-next-line no-unused-vars
import html2canvas from 'html2canvas';
import './MyTransactions.css'; 

const mockTransactions = [
  { id: 1, date: '2025-08-20', description: 'Salary Deposit', type: 'credit', amount: 1200 },
  { id: 2, date: '2025-08-21', description: 'Grocery Shopping', type: 'debit', amount: 75.5 },
  // ...
];

const MyTransactions = () => {
  // eslint-disable-next-line no-unused-vars
  const exportSingleTransaction = async (tx) => { /* ... */ };

  return (
    <CustomerLayout>
      <div className="transactions-page-container">
        <div className="page-header">
          <h1>My Transactions</h1>
          <p>A complete history of your account activity.</p>
        </div>
        <div className="transactions-table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Type</th>
                <th>Amount ($)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map(tx => (
                <tr key={tx.id}>
                  <td>{tx.date}</td>
                  <td>{tx.description}</td>
                  
                  <td className={`transaction-type ${tx.type}`}>
                    {tx.type === 'credit' ? <FaArrowDown /> : <FaArrowUp />} {tx.type}
                  </td>
                  <td>{tx.amount.toFixed(2)}</td>
                  <td>
                    <button className="download-btn" onClick={() => exportSingleTransaction(tx)}>
                      <FaFilePdf /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default MyTransactions;