// /src/components/layout/staff/StaffChatWidget.jsx

import React, { useState, useContext, useEffect, useRef } from "react";
import { FaComments, FaTimes } from "react-icons/fa";

import { ThemeContext } from "../../../context/ThemeContext";


const StaffChatWidget = () => {
  const { theme } = useContext(ThemeContext);
  const [openChat, setOpenChat] = useState(false);
  const [chatCollapsed, setChatCollapsed] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "support", message: "Hello! How can we help you?" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Drag logic
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const widgetRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStartPos.current.x,
        y: e.clientY - dragStartPos.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  useEffect(() => {
    if(isDragging) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);


  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatCollapsed]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const msg = { id: Date.now(), sender: "user", message: newMessage };
    setChatMessages([...chatMessages, msg]);
    setNewMessage("");

    setTimeout(() => setChatMessages(prev => [
      ...prev,
      { id: Date.now() + 1, sender: "support", message: "Thanks! We'll respond shortly." }
    ]), 800);
  };

  return (
    <>
      {/* Chat Icon */}
      {!openChat && (
        <button
          onClick={() => setOpenChat(true)}
          style={{ ...chatButtonStyle, background: theme === "light" ? "#007bff" : "#00adef" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <FaComments />
        </button>
      )}

      {/* Chat Window */}
      {openChat && (
        <div
          ref={widgetRef}
          style={{ ...chatWindowStyle(theme), right: position.x, bottom: position.y, }}
        >
          {/* Header */}
          <div
            onMouseDown={handleMouseDown}
            style={{ ...headerStyle, background: theme === "light" ? "#007bff" : "#00adef" }}
          >
            💬 Support Chat
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setChatCollapsed(prev => !prev)} style={iconButtonStyle}> {chatCollapsed ? "▲" : "▼"} </button>
              <button onClick={() => setOpenChat(false)} style={iconButtonStyle}> <FaTimes /> </button>
            </div>
          </div>

          {/* Chat Messages */}
          {!chatCollapsed && (
            <>
              <div style={{ flex: 1, overflowY: "auto", padding: 12, background: theme === "light" ? "#f4f7fc" : "#2a2a3d" }}>
                {chatMessages.map(msg => (
                  <div key={msg.id} style={messageContainerStyle(msg.sender)}>
                    {msg.sender === "support" && <div style={avatarStyle(theme)}>S</div>}
                    <span style={messageBubbleStyle(msg.sender, theme)}> {msg.message} </span>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div style={{...inputAreaStyle, borderTop: `1px solid ${theme === "light" ? "#ccc" : "#444"}`}}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                  style={{ ...inputStyle, background: theme === "light" ? "#fff" : "#333", color: theme === "light" ? "#000" : "#fff" }}
                />
                <button
                  onClick={sendMessage}
                  style={{...sendButtonStyle, background: theme === "light" ? "#007bff" : "#00adef" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  ➤
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

// ===== Styles =====
const chatButtonStyle = { position: "fixed", bottom: 20, right: 20, width: 60, height: 60, borderRadius: "50%", color: "#fff", border: "none", cursor: "pointer", fontSize: 24, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 15px rgba(0,0,0,0.3)", transition: "transform 0.2s" };
const chatWindowStyle = (theme) => ({ position: "fixed", width: 360, height: 500, background: theme === "light" ? "#fff" : "#1f1f2f", borderRadius: 16, boxShadow: "0 8px 24px rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", zIndex: 1000, overflow: "hidden", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" });
const headerStyle = { padding: "12px 16px", color: "#fff", fontWeight: "bold", fontSize: 16, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "move", userSelect: "none" };
const iconButtonStyle = { border: "none", background: "transparent", color: "#fff", cursor: "pointer", fontSize: 16 };
const messageContainerStyle = (sender) => ({ display: "flex", justifyContent: sender === "user" ? "flex-end" : "flex-start", marginBottom: 10 });
const messageBubbleStyle = (sender, theme) => ({ maxWidth: "70%", padding: "10px 14px", borderRadius: 20, background: sender === "user" ? (theme === "light" ? "#007bff" : "#00adef") : (theme === "light" ? "#e0e0e0" : "#3b3b4d"), color: sender === "user" ? "#fff" : (theme === "light" ? "#000" : "#fff"), fontSize: 14, lineHeight: 1.4, wordBreak: "break-word" });
const avatarStyle = (theme) => ({ width: 32, height: 32, borderRadius: "50%", background: theme === "light" ? "#007bff" : "#00adef", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", marginRight: 8, flexShrink: 0 });
const inputAreaStyle = { display: "flex", padding: 10 };
const inputStyle = { flex: 1, padding: "10px 16px", borderRadius: 25, border: "1px solid #ccc", outline: "none", fontSize: 14, marginRight: 8, transition: "all 0.2s" };
const sendButtonStyle = { color: "#fff", border: "none", borderRadius: "50%", width: 38, height: 38, display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", fontSize: 18, boxShadow: "0 2px 6px rgba(0,0,0,0.2)", transition: "transform 0.2s" };

export default StaffChatWidget;