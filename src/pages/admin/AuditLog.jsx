// /src/pages/admin/AuditLog.jsx
import React, { useState } from 'react';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import './AuditLog.css';

const mockLogs = [
  { id: 1, user: 'Abebe K. (Staff)', action: 'Approved Account #10001234', timestamp: '2025-08-22 10:30 AM' },
  { id: 2, user: 'Chaltu B. (Admin)', action: 'Changed user role for Abebe K.', timestamp: '2025-08-22 09:15 AM' },
  { id: 3, user: 'Lensa T. (Customer)', action: 'Login Failed (3 attempts)', timestamp: '2025-08-22 08:00 AM' },
];

const AuditLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredLogs = mockLogs.filter(log => log.user.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <AdminLayout searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)}>
        <div className="audit-log-container">
            <div className="page-header"><h1>Audit Logs</h1></div>
            <div className="table-wrapper">
                <table className="custom-table">
                    <thead><tr><th>Timestamp</th><th>User</th><th>Action</th></tr></thead>
                    <tbody>
                        {filteredLogs.map(log => (
                            <tr key={log.id}><td>{log.timestamp}</td><td>{log.user}</td><td>{log.action}</td></tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </AdminLayout>
  );
};

export default AuditLog;