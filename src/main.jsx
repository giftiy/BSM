// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// CSS gurguddoo import godhi
import './assets/styles/Auth.css'; // Kun duraan jira
import './components/layout/Layout.css'; // KANA DABALI
import './pages/customer/CustomerDashboard.css'; // KANA DABALI

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);