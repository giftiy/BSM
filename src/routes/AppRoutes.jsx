// /src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';



// Auth Pages 
import LoginPage from '../pages/auth/LoginPage.jsx';
import RegisterPage from '../pages/auth/RegisterPage.jsx';

// Customer Pages 
import CustomerDashboard from '../pages/customer/CustomerDashboard.jsx';
import MyAccounts from '../pages/customer/MyAccounts.jsx';
import MyTransactions from '../pages/customer/MyTransactions.jsx';
import NotificationsPage from '../pages/customer/NotificationsPage.jsx';
import CardlessWithdrawalPage from '../pages/customer/CardlessWithdrawalModal.jsx';

// Staff Pages 
import StaffDashboard from '../pages/staff/StaffDashboard.jsx';
import TransactionsPage from '../pages/staff/TransactionsPage.jsx';
import AccountApprovalPage from '../pages/staff/AccountApprovalPage.jsx';
import CreateAccountPage from '../pages/staff/CreateAccountPage.jsx';
import ManageCustomers from '../pages/staff/ManageCustomers.jsx';
import CustomerDetailsPage from '../pages/staff/CustomerDetailsPage.jsx';

// Admin Pages 
import AdminDashboard from '../pages/admin/AdminDashboard.jsx';
import UserManagement from '../pages/admin/UserManagement.jsx';
import AuditLog from '../pages/admin/AuditLog.jsx';
import AccountsManagement from '../pages/admin/AccountsManagement.jsx';
import ReportsPage from '../pages/admin/ReportsPage.jsx';
import ResetPasswordPage from '../pages/admin/ResetPasswordPage.jsx';


// Protected Route Component
import ProtectedRoute from './ProtectedRoute.jsx';
import AdminViewTransactions from '../pages/admin/AdminViewTransactions.jsx';
import NotificationBell from '../pages/admin/NotificationBell.jsx';


const HomeRedirect = () => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>; 
    if (!user) return <Navigate to="/login" replace />;
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (user.role === 'staff') return <Navigate to="/staff/dashboard" replace />;
    return <Navigate to="/dashboard" replace />; };
const PublicOnlyRoute = () => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    return user ? <Navigate to="/" replace /> : <Outlet />;
};



const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomeRedirect />} />

      
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

    
      <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/accounts" element={<MyAccounts />} />
        <Route path="/customer/transactions" element={<MyTransactions />} />
        <Route path="/customer/notifications" element={<NotificationsPage />} />
        <Route path="/customer/cardless" element={<CardlessWithdrawalPage />} />
      </Route>

     
      <Route element={<ProtectedRoute allowedRoles={['staff']} />}>
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/staff/transactions" element={<TransactionsPage />} />
        <Route path="/staff/account-approval" element={<AccountApprovalPage />} />
        <Route path="/staff/create-account" element={<CreateAccountPage />} />
        <Route path="/staff/manage-customers" element={<ManageCustomers />} />
        <Route path="/staff/customer-details/:id" element={<CustomerDetailsPage />} />
      </Route>
      
      
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/audit-logs" element={<AuditLog />} />
        <Route path="/admin/accounts" element={<AccountsManagement />} />
        <Route path="/admin/reports" element={<ReportsPage />} />
        <Route path="/admin/reset-password" element={<ResetPasswordPage />} />
         <Route path="/admin/all-transactions" element={<AdminViewTransactions />} />
         <Route path="/admin/notification" element={<NotificationBell />} />
      </Route>

      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
);

export default AppRoutes;