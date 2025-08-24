import React, { useState } from 'react';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Password for user ${email} has been reset!`);
        setEmail('');
        setNewPassword('');
    };

    return (
        <AdminLayout>
            <div className="reset-password-container">
                <div className="page-header">
                    <h1>Reset User Password</h1>
                    <p>Force a password reset for any user in the system.</p>
                </div>
                <div className="reset-form-wrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>User's Email or ID</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>New Temporary Password</label>
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="submit-btn">Reset Password</button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};
export default ResetPasswordPage;
