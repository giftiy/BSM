// /src/components/layout/customer/CustomerLayout.jsx

import React from 'react';
import CustomerSidebar from './CustomerSidebar';
import CustomerTopNavbar from './CustomerTopNavbar';
import ChatWidget from '../ChatWidget';
import './CustomerLayout.css';

const CustomerLayout = ({ children }) => {
  return (
    <div className="customer-layout">
      <CustomerSidebar />
      <div className="main-container">
        <CustomerTopNavbar />
        <main className="content-area">
          {children}
        </main>
      </div>
      <ChatWidget />
    </div>
  );
};
export default CustomerLayout;