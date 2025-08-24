// /src/pages/staff/ChatPage.jsx
import React from "react";
import StaffLayout from "../../components/layout/StaffLayout";
import StaffChatWidget from "../../components/layout/StaffChatWidget";

const StaffChatPage = () => {
  return (
    <StaffLayout>
      <h2>Staff Chat</h2>
      <p>Here you can chat with customers or colleagues.</p>
      <StaffChatWidget />
    </StaffLayout>
  );
};

export default StaffChatPage;
