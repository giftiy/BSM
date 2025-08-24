// /src/components/common/FloatingChatButton.jsx
import React, { useState } from 'react';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import './Redesign.css'; // CSS haaraa waliinii fayyadamna

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="floating-chat-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaComments />}
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Support Chat</h3>
          </div>
          <div className="chat-body">
            {/* Ergaawwan asitti mul'atu */}
            <div className="message received">Hi! How can I help you today?</div>
          </div>
          <div className="chat-footer">
            <input type="text" placeholder="Type your message..." />
            <button><FaPaperPlane /></button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatButton;