// Faayilii: /src/pages/customer/CustomerDashboard.jsx

import React, { useState } from 'react';
import CustomerLayout from '../../components/layout/customer/CustomerLayout';
import { useAuth } from '../../context/AuthContext';
import { FaWallet, FaCheckCircle, FaExclamationCircle, FaArrowUp, FaArrowDown, FaMoneyBillWave, FaBell } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import CardlessWithdrawalPage from './CardlessWithdrawalModal';
import './CustomerDashboard.css';


const chartData = [
  { name: 'Jan', income: 4200, expenses: 3000 },
  { name: 'Feb', income: 3800, expenses: 3500 },
  { name: 'Mar', income: 5200, expenses: 4000 },
  { name: 'Apr', income: 4700, expenses: 4500 },
  { name: 'May', income: 6100, expenses: 3900 },
  { name: 'Jun', income: 5600, expenses: 4800 },
  { name: 'Jul', income: 7000, expenses: 4300 },
  { name: 'Aug', income: 6600, expenses: 5100 },
  { name: 'Sep', income: 7400, expenses: 4600 },
  { name: 'Oct', income: 6900, expenses: 5200 },
  { name: 'Nov', income: 7700, expenses: 4900 },
  { name: 'Dec', income: 7200, expenses: 5300 },
];

const transactions = [ { id: 1, type: 'income', description: 'Salary Deposit', amount: 3500.00 }, { id: 2, type: 'expense', description: 'Grocery Store', amount: -150.75 }, { id: 3, type: 'expense', description: 'Netflix', amount: -15.99 }, ];

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [showCardless, setShowCardless] = useState(false);

  return (
    <CustomerLayout>
      <div className="customer-dashboard-container">
        <div className="page-header">
          <h1>Welcome back, {user?.fullName || 'Customer'} 👋</h1>
          <p>Here's a summary of your account activity.</p>
        </div>
        <div className="stats-grid">
          <div className="stat-card"> <div className="stat-icon wallet"><FaWallet /></div> <div className="stat-info"><h3>Balance</h3><p>$12,450</p></div> </div>
          <div className="stat-card"> <div className="stat-icon active-status"><FaCheckCircle /></div> <div className="stat-info"><h3>Status</h3><p className="text-success">Active</p></div> </div>
          <div className="stat-card clickable" onClick={() => setShowCardless(true)}> <div className="stat-icon cardless"><FaMoneyBillWave /></div> <div className="stat-info"><h3>Cardless</h3><p>Get Code</p></div> </div>
          <div className="stat-card clickable" onClick={() => setShowCardless(true)}> <div className="stat-icon notification"><FaBell /></div> <div className="stat-info"><h3>Alerts</h3><p>3 Unread</p></div> </div>
        </div>
        <div className="dashboard-main-grid">
          <div className="dashboard-card card-chart">
            <h3 className="card-header">Spending Overview</h3>
            <ResponsiveContainer width="100%" height={210}>
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" /> <XAxis dataKey="name" fontSize={12} /> <YAxis fontSize={12} /> <Tooltip />
                <Line type="monotone" dataKey="income" stroke="#28a745" /> <Line type="monotone" dataKey="expenses" stroke="#dc3545" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="dashboard-card card-transactions">
            <h3 className="card-header">Recent Transactions</h3>
            <ul className="transaction-list">
              {transactions.map(t => (
                <li key={t.id} className="transaction-item">
                  <div className={`transaction-icon ${t.type}`}> {t.type === 'income' ? <FaArrowUp /> : <FaArrowDown />} </div>
                  <div className="transaction-details"> <span>{t.description}</span> </div>
                  <span className={`transaction-amount ${t.type}`}> {t.type === 'income' ? '+' : '-'}${Math.abs(t.amount).toFixed(2)} </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {showCardless && <CardlessWithdrawalPage onClose={() => setShowCardless(false)} />}
    </CustomerLayout>
  );
};

export default CustomerDashboard;