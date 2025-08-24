// /src/pages/staff/AccountApprovalPage.jsx

import React, { useState } from 'react';
import StaffLayout from '../../components/layout/staff/StaffLayout';
import { FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa';
import './AccountApprovalPage.css'; 

const approvalRequests = [
  { id: 1, applicantName: 'Lensa Tadesse', accountType: 'Savings', submittedDate: '2025-08-22', status: 'Pending', documents: ['ID Card', 'Photo'] },
  { id: 2, applicantName: 'Bona Megersa', accountType: 'Business', submittedDate: '2025-08-21', status: 'Pending', documents: ['ID Card', 'Photo', 'Business License'] },
  { id: 3, applicantName: 'Hana Girma', accountType: 'Savings', submittedDate: '2025-08-20', status: 'Approved', documents: ['ID Card', 'Photo'] },
  { id: 4, applicantName: 'Kebede Alemu', accountType: 'Savings', submittedDate: '2025-08-19', status: 'Rejected', documents: ['ID Card'] },
];

const AccountApprovalPage = () => {
  const [requests, setRequests] = useState(approvalRequests);
  const [searchTerm, setSearchTerm] = useState('');

  const handleApprove = (id) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: 'Approved' } : req));
  };

  const handleReject = (id) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: 'Rejected' } : req));
  };

  const filteredRequests = requests.filter(req =>
    req.applicantName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <StaffLayout searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)}>
      <div className="approval-page-container">
        <div className="page-header">
          <h1>Account Approval Requests</h1>
          <p>Review and process new account applications.</p>
        </div>

        <div className="approval-table-wrapper">
          <table className="approval-table">
            <thead>
              <tr>
                <th>Applicant Name</th>
                <th>Account Type</th>
                <th>Submitted Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map(request => (
                <tr key={request.id}>
                  <td>{request.applicantName}</td>
                  <td>{request.accountType}</td>
                  <td>{request.submittedDate}</td>
                  <td><span className={`status ${request.status.toLowerCase()}`}>{request.status}</span></td>
                  <td className="actions-cell">
                    
                    {request.status === 'Pending' && (
                        <>
                            <button className="action-btn approve" onClick={() => handleApprove(request.id)}>
                                <FaCheckCircle /> Approve
                            </button>
                            <button className="action-btn reject" onClick={() => handleReject(request.id)}>
                                <FaTimesCircle /> Reject
                            </button>
                        </>
                    )}
                     <button className="action-btn view" onClick={() => alert(`Viewing documents for ${request.applicantName}: ${request.documents.join(', ')}`)}>
                        <FaEye /> View Docs
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StaffLayout>
  );
};

export default AccountApprovalPage;