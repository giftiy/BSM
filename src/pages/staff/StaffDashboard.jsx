// /src/pages/staff/StaffDashboard.jsx
import React, { useState } from "react";
import StaffLayout from "../../components/layout/staff/StaffLayout";
import { FaArrowUp, FaArrowDown, FaRegChartBar, FaUsers } from "react-icons/fa";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import "./StaffDashboard.css";

// Sample Data
const lineChartData = [ { name: "Jan", Deposits: 2400, Withdrawals: 4000 }, { name: "Feb", Deposits: 1398, Withdrawals: 3000 }, { name: "Mar", Deposits: 9800, Withdrawals: 2000 }, { name: "Apr", Deposits: 3908, Withdrawals: 2780 }, { name: "May", Deposits: 4800, Withdrawals: 1890 }, { name: "Jun", Deposits: 3800, Withdrawals: 2390 }, ];
const barChartData = [ { name: "Bole Branch", Transfers: 2200 }, { name: "CMC Branch", Transfers: 1500 }, { name: "4 Kilo Branch", Transfers: 3100 }, { name: "Sarbet Branch", Transfers: 900 } ];
const pieChartData = [ { name: 'Personal', value: 400 }, { name: 'Business', value: 300 }, { name: 'Savings', value: 300 }, ];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
const recentTransactions = [ { id: 1, type: "withdraw", customer: "John Doe", amount: 500, status: "Completed" }, { id: 2, type: "deposit", customer: "Jane Smith", amount: 1200, status: "Completed" }, { id: 3, type: "transfer", customer: "Mark Johnson", amount: 300, status: "Pending" }, ];

const StaffDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = recentTransactions.filter((t) =>
    t.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <StaffLayout searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)}>
      <div className="staff-dashboard-container">
        <div className="dashboard-header">
          <h1>Staff Dashboard</h1>
          <p>Welcome back! Here is a real-time overview of the bank's activities.</p>
        </div>

        {/* Kaardiiwwan Istaatistiksii */}
        <div className="stats-grid">
            <div className="stat-card"> <div className="stat-icon green"><FaArrowUp /></div> <div className="stat-info"><h3>Total Deposits</h3><p>$25,300</p></div> </div>
            <div className="stat-card"> <div className="stat-icon red"><FaArrowDown /></div> <div className="stat-info"><h3>Total Withdrawals</h3><p>$16,450</p></div> </div>
            <div className="stat-card"> <div className="stat-icon blue"><FaRegChartBar /></div> <div className="stat-info"><h3>Total Transfers</h3><p>$9,500</p></div> </div>
            <div className="stat-card"> <div className="stat-icon purple"><FaUsers /></div> <div className="stat-info"><h3>New Customers</h3><p>125</p></div> </div>
        </div>

        {/* Giraafiiwwan fi Chaartiiwwan */}
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Deposit vs. Withdrawal Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Deposits" stroke="#28a745" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Withdrawals" stroke="#dc3545" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* === KUTAA SIRREEFFAME: BARCHART ITTI DABALAME === */}
          <div className="chart-card">
            <h3>Transfers by Branch</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Transfers" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="chart-card">
            <h3>Account Types Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieChartData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" >
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
                {filteredTransactions.length > 0 ? filteredTransactions.map((t) => (
                    <li key={t.id} className="transaction-item">
                        <span>{t.customer}</span>
                        <span>${t.amount}</span>
                        <span className={`status ${t.status.toLowerCase()}`}>{t.status}</span>
                    </li>
                )) : <li>No matching transactions found.</li>}
            </ul>
          </div>
        </div>
      </div>
      
    </StaffLayout>
  );
};

export default StaffDashboard;