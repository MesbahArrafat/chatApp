/**
 * ChatRoom Page
 * The main chat interface that combines the Sidebar and ChatWindow.
 * Layout: sidebar on the left + chat window on the right.
 * Current user is hardcoded as user ID 1 (john_doe) for demo purposes.
 */

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';

function ChatRoom({ isDark }) {
  // The currently logged-in user (hardcoded for demo)
  const currentUserId = 1;

  // Track which conversation is selected (default: first one)
  const [activeConversation, setActiveConversation] = useState(1);

  return (
    <div className={`h-screen flex ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      {/* Left sidebar with conversation list */}
      <Sidebar
        currentUserId={currentUserId}
        activeConversation={activeConversation}
        onSelectConversation={setActiveConversation}
        isDark={isDark}
      />

      {/* Right side chat window */}
      <ChatWindow
        conversationId={activeConversation}
        currentUserId={currentUserId}
        isDark={isDark}
      />
    </div>
  );
}

export default ChatRoom;
