import React from 'react';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import { FaFileDownload, FaFilter } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import './ReportsPage.css';

const data = [{ name: 'Savings Accounts', value: 400 }, { name: 'Business Accounts', value: 300 }, { name: 'Student Accounts', value: 200 }];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const ReportsPage = () => {
  return (
    <AdminLayout>
      <div className="reports-container">
        <div className="page-header">
          <h1>Financial Reports</h1>
          <p>Generate and view system-wide operational reports.</p>
        </div>
        <div className="reports-grid">
            <div className="report-card">
                <h3>Account Type Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
                <button className="download-btn"><FaFileDownload/> Download Report</button>
            </div>
             <div className="report-card">
                <h3>Generate Custom Report</h3>
                <div className="form-group">
                    <label>Report Type</label>
                    <select><option>Transaction Summary</option><option>User Activity</option></select>
                </div>
                 <div className="form-group">
                    <label>Date Range</label>
                    <input type="date"/>
                </div>
                <button className="download-btn generate"><FaFilter/> Generate & Download</button>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
};
export default ReportsPage;