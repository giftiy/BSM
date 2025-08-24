

import React, { useState } from 'react';
import CustomerLayout from '../../components/layout/customer/CustomerLayout';
import { FaUniversity, FaPiggyBank, FaCreditCard, FaEllipsisH, FaPlusCircle } from 'react-icons/fa';
import './CustomerPages.css'; 


const mockAccounts = [
  { 
    id: 1, type: 'Checking Account', number: '1000-1234-5678-9012', balance: 5420.50, status: 'Active', 
    icon: <FaUniversity />, 
    transactions: [
        { desc: 'Salary Deposit', date: 'Aug 22', amount: 3500 },
        { desc: 'Grocery Store', date: 'Aug 21', amount: -150.75 },
    ]
  },
  { 
    id: 2, type: 'Savings Account', number: '1000-5678-1234-9012', balance: 12850.00, status: 'Active', 
    icon: <FaPiggyBank />,
    transactions: [
        { desc: 'Transfer from Checking', date: 'Aug 20', amount: 1000 },
    ]
  },
  { 
    id: 3, type: 'Credit Card', number: '4111-XXXX-XXXX-9012', balance: -890.25, status: 'Frozen', 
    icon: <FaCreditCard />,
    transactions: [
        { desc: 'Netflix Subscription', date: 'Aug 18', amount: -15.99 },
    ]
  },
];

const MyAccounts = () => {
  const [selectedAccount, setSelectedAccount] = useState(mockAccounts[0]);

  return (
    <CustomerLayout>
      <div className="page-container">
        <div className="page-header">
          <h1>My Accounts</h1>
          <p>An overview of all your financial accounts and recent activity.</p>
        </div>
        
        <div className="my-accounts-layout">
            
            
            <div className="account-list-section">
                {mockAccounts.map(account => (
                    <div 
                        key={account.id} 
                        className={`account-list-item ${selectedAccount.id === account.id ? 'selected' : ''}`}
                        onClick={() => setSelectedAccount(account)}
                    >
                        <div className="account-icon">{account.icon}</div>
                        <div className="account-summary">
                            <span className="account-type">{account.type}</span>
                            <span className="account-number">{account.number}</span>
                        </div>
                        <span className="account-balance-list">${account.balance.toLocaleString('en-US')}</span>
                    </div>
                ))}
                <div className="account-list-item add-new">
                    <FaPlusCircle/>
                    <span>Add New Account</span>
                </div>
            </div>

           
            <div className="account-details-section">
                <div className="details-card-header">
                    <h2>{selectedAccount.type}</h2>
                    <div className={`account-status ${selectedAccount.status.toLowerCase()}`}>{selectedAccount.status}</div>
                </div>
                
                <div className="balance-showcase">
                    <span className="balance-label">Available Balance</span>
                    <span className="balance-amount">${selectedAccount.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>

                <div className="quick-actions">
                    <button>Transfer</button>
                    <button>Pay Bills</button>
                    <button>Statement</button>
                    <button><FaEllipsisH/></button>
                </div>
                
                <div className="recent-activity">
                    <h3>Recent Activity</h3>
                    <ul>
                        {selectedAccount.transactions.map((tx, index) => (
                           <li key={index}>
                               <div className="tx-info">
                                   <span className="tx-desc">{tx.desc}</span>
                                   <span className="tx-date">{tx.date}</span>
                               </div>
                               <span className={`tx-amount ${tx.amount > 0 ? 'income' : 'expense'}`}>
                                   {tx.amount > 0 ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                               </span>
                           </li> 
                        ))}
                    </ul>
                </div>
            </div>

        </div>
      </div>
    </CustomerLayout>
  );
};

export default MyAccounts;