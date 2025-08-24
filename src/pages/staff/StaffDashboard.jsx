// Faayilii: /src/pages/staff/StaffDashboard.jsx

import React, { useState } from "react";
import StaffLayout from "../../components/layout/staff/StaffLayout";
import { FaArrowUp, FaArrowDown, FaRegChartBar, FaUsers } from "react-icons/fa";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import "./StaffDashboard.css";


const lineChartData = [ 
  { name: "Jan", Deposits: 2400, Withdrawals: 4000 }, { name: "Feb", Deposits: 1398, Withdrawals: 3000 }, 
  { name: "Mar", Deposits: 9800, Withdrawals: 2000 }, { name: "Apr", Deposits: 3908, Withdrawals: 2780 }, 
  { name: "May", Deposits: 4800, Withdrawals: 1890 }, { name: "Jun", Deposits: 3800, Withdrawals: 2390 },
  { name: "Jul", Deposits: 4300, Withdrawals: 3490 }, { name: "Aug", Deposits: 5100, Withdrawals: 2800 },
  { name: "Sep", Deposits: 4800, Withdrawals: 4100 }, { name: "Oct", Deposits: 6200, Withdrawals: 3200 },
  { name: "Nov", Deposits: 7500, Withdrawals: 4500 }, { name: "Dec", Deposits: 8100, Withdrawals: 5000 },
];
// AAAA -------------------------------------------- AAAA

const barChartData = [ { name: "Bole", Transfers: 2200 }, { name: "CMC", Transfers: 1500 }, { name: "4 Kilo", Transfers: 3100 } ];
const pieChartData = [ { name: 'Personal', value: 400 }, { name: 'Business', value: 300 }, { name: 'Savings', value: 250 }, ];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
const recentTransactions = [ { id: 1, customer: "John Doe", amount: 500, status: "Completed" }, { id: 2, customer: "Jane Smith", amount: 1200, status: "Completed" }, { id: 3, customer: "Mark Johnson", amount: 300, status: "Pending" }, ];

const StaffDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredTransactions = recentTransactions.filter((t) => t.customer.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <StaffLayout searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)}>
      <div className="staff-dashboard-container">
        <div className="page-header">
          <h1>Staff Dashboard</h1>
          <p>Real-time overview of banking activities.</p>
        </div>

        <div className="stats-grid">
            <div className="stat-card"> <div className="stat-icon green"><FaArrowUp /></div> <div className="stat-info"><h3>Deposits</h3><p>$25,300</p></div> </div>
            <div className="stat-card"> <div className="stat-icon red"><FaArrowDown /></div> <div className="stat-info"><h3>Withdrawals</h3><p>$16,450</p></div> </div>
            <div className="stat-card"> <div className="stat-icon blue"><FaRegChartBar /></div> <div className="stat-info"><h3>Transfers</h3><p>$9,500</p></div> </div>
            <div className="stat-card"> <div className="stat-icon purple"><FaUsers /></div> <div className="stat-info"><h3>New Customers</h3><p>125</p></div> </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h3>Deposit vs. Withdrawal</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineChartData} margin={{ top: 5, right: 20, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" /> <XAxis dataKey="name" fontSize={12} /> <YAxis fontSize={12} /> <Tooltip />
                <Legend /> 
                <Line type="monotone" dataKey="Deposits" stroke="#28a745" dot={false} /> <Line type="monotone" dataKey="Withdrawals" stroke="#dc3545" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Transfers by Branch</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barChartData} margin={{ top: 5, right: 20, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" /> <XAxis dataKey="name" fontSize={12} /> <YAxis fontSize={12} /> <Tooltip />
                <Legend /> 
                <Bar dataKey="Transfers" fill="#8884d8" barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="chart-card">
            <h3>Account Types</h3>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} fill="#8884d8" paddingAngle={5} dataKey="value" nameKey="name">
                        {pieChartData.map((entry, index) => ( <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> ))}
                    </Pie>
                    <Tooltip />
                    <Legend /> 
                </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Recent Transactions</h3>
            <ul className="transaction-list">
                {filteredTransactions.map((t) => (
                    <li key={t.id} className="transaction-item">
                        <span>{t.customer}</span>
                        <span>${t.amount}</span>
                        <span className={`status ${t.status.toLowerCase()}`}>{t.status}</span>
                    </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
};

export default StaffDashboard;