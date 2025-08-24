// Faayilii: /src/pages/customer/CardlessWithdrawalPage.jsx

import React, { useState, useEffect } from 'react';
import { FaSpinner, FaCheckCircle, FaTimes } from 'react-icons/fa';
import './CardlessWithdrawalPage.css';

const CardlessWithdrawalPage = ({ onClose }) => {
  const [amount, setAmount] = useState('');
  const [view, setView] = useState('form'); // form, loading, success
  const [code, setCode] = useState(null);
  const [timer, setTimer] = useState(900); // 15 minutes in seconds

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    setView('loading');
    setTimeout(() => {
      setCode(Math.floor(100000 + Math.random() * 900000));
      setView('success');
    }, 1500);
  };

  // Timer for success view
  useEffect(() => {
    let interval;
    if (view === 'success' && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0) {
      onClose(); // Timer dhumee modal cufa
    }
    return () => clearInterval(interval);
  }, [view, timer, onClose]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="cardless-modal-content" onClick={e => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close-modal-btn" onClick={onClose}>
          <FaTimes />
        </button>

        {/* Form View */}
        {view === 'form' && (
          <form className="cardless-form" onSubmit={handleSubmit}>
            <h3>Cardless Withdrawal</h3>
            <p className="description">
              Enter the amount you wish to withdraw. A secure one-time code will be generated.
            </p>
            <div className="form-group">
              <label>Amount ($)</label>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                required
                min="1"
              />
            </div>
            <button type="submit" className="form-button primary">Generate Code</button>
          </form>
        )}

        {/* Loading View */}
        {view === 'loading' && (
          <div className="modal-center-view">
            <FaSpinner className="spinner" />
            <p>Generating your secure code...</p>
          </div>
        )}

        {/* Success View */}
        {view === 'success' && (
          <div className="modal-center-view success">
            <div className="success-icon"><FaCheckCircle /></div>
            <h3>Your Code is Ready!</h3>
            <p>Use this code at any ATM. It will expire in:</p>
            <p className="timer">{formatTime(timer)}</p>
            <div className="withdrawal-code">{code}</div>
            <button onClick={onClose} className="form-button primary done">Done</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardlessWithdrawalPage;
