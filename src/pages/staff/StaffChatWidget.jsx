import React, { useState, useEffect, useRef } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';

const StaffChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ id: 1, sender: 'support', message: 'Hello Staff! How can I help?' }]);
  const [newMessage, setNewMessage] = useState('');
  const chatRef = useRef(null);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const msg = { id: Date.now(), sender: 'staff', message: newMessage };
    setMessages([...messages, msg]);
    setNewMessage('');
    setTimeout(() => setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'support', message: "Received!" }]), 800);
  };

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="staff-chat-button"
        >
          <FaComments />
        </button>
      )}

      {open && (
        <div className="staff-chat-widget">
          <div className="chat-header">
            Staff Chat
            <FaTimes onClick={() => setOpen(false)} style={{ cursor: 'pointer' }} />
          </div>

          <div className="chat-messages" ref={chatRef}>
            {messages.map(msg => (
              <div key={msg.id} className={`chat-message ${msg.sender}`}>
                {msg.message}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}
    </>
  );
};

export default StaffChatWidget;
