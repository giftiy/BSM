// src/components/ChatWidget.jsx
import React, { useState, useContext, useEffect, useRef } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext";

const ChatWidget = () => {
  const { theme } = useContext(ThemeContext);
  const [openChat, setOpenChat] = useState(false);
  const [chatCollapsed, setChatCollapsed] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "support", message: "Hello! How can we help you?" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const chatRef = useRef(null);

  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState(null);

  // Drag handlers
  const handleMouseDown = (e) => setDragStart({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMouseMove = (e) => dragStart && setDragOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  const handleMouseUp = () => setDragStart(null);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragStart, handleMouseMove]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
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
          style={{
            position: "fixed", bottom: 20, right: 20,
            width: 60, height: 60, borderRadius: "50%",
            background: theme === "light" ? "#007bff" : "#00adef",
            color: "#fff", border: "none", cursor: "pointer",
            fontSize: 24, zIndex: 1000,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <FaComments />
        </button>
      )}

      {/* Chat Window */}
      {openChat && (
        <div
          ref={chatRef}
          style={{
            position: "fixed",
            bottom: 20 + dragOffset.y,
            right: 20 + dragOffset.x,
            width: 360, maxHeight: 500,
            background: theme === "light" ? "#fff" : "#1f1f2f",
            borderRadius: 16,
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
            overflow: "hidden",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
          }}
        >
          {/* Header */}
          <div
            onMouseDown={handleMouseDown}
            style={{
              padding: "12px 16px",
              background: theme === "light" ? "#007bff" : "#00adef",
              color: "#fff",
              fontWeight: "bold",
              fontSize: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "move",
              userSelect: "none"
            }}
          >
            
            💬 Support Chat
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setChatCollapsed(prev => !prev)}
                style={iconButtonStyle}
              >
                {chatCollapsed ? "▼" : "▲"}
              </button>
              <button
                onClick={() => setOpenChat(false)}
                style={iconButtonStyle}
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          {!chatCollapsed && (
            <>
              <div style={{ flex: 1, overflowY: "auto", padding: 12, background: theme === "light" ? "#f4f7fc" : "#2a2a3d" }}>
                {chatMessages.map(msg => (
                  <div
                    key={msg.id}
                    style={{
                      display: "flex",
                      justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                      marginBottom: 10
                    }}
                  >
                    {msg.sender === "support" && (
                      <div style={avatarStyle(theme)}>S</div>
                    )}
                    <span
                      style={{
                        maxWidth: "70%",
                        padding: "10px 14px",
                        borderRadius: 20,
                        background: msg.sender === "user"
                          ? theme === "light" ? "#007bff" : "#00adef"
                          : theme === "light" ? "#e0e0e0" : "#3b3b4d",
                        color: msg.sender === "user" ? "#fff" : theme === "light" ? "#000" : "#fff",
                        fontSize: 14,
                        lineHeight: 1.4
                      }}
                    >
                      {msg.message}
                    </span>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div style={{ display: "flex", padding: 10, borderTop: `1px solid ${theme === "light" ? "#ccc" : "#444"}` }}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                  style={{
                    flex: 1,
                    padding: "10px 16px",
                    borderRadius: 25,
                    border: "1px solid #ccc",
                    outline: "none",
                    fontSize: 14,
                    marginRight: 8,
                    background: theme === "light" ? "#fff" : "#333",
                    color: theme === "light" ? "#000" : "#fff",
                    transition: "all 0.2s"
                  }}
                />
                <button
                  onClick={sendMessage}
                  style={{
                    background: theme === "light" ? "#007bff" : "#00adef",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: 38,
                    height: 38,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: 18,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    transition: "transform 0.2s"
                  }}
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
const iconButtonStyle = {
  border: "none",
  background: "transparent",
  color: "#fff",
  cursor: "pointer",
  fontSize: 16,
};

const avatarStyle = (theme) => ({
  width: 32,
  height: 32,
  borderRadius: "50%",
  background: theme === "light" ? "#007bff" : "#00adef",
  color: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  marginRight: 8,
  flexShrink: 0
});

export default ChatWidget;
