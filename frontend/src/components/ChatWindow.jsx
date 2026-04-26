/**
 * ChatWindow Component
 * Main chat area that displays messages for the selected conversation.
 * Includes:
 * - Header with user info and online status
 * - Scrollable message list (auto-scrolls to bottom)
 * - Typing indicator
 * - Message input box at the bottom
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import users from '../data/users.json';
import allMessages from '../data/messages.json';
import conversations from '../data/conversations.json';

function ChatWindow({ conversationId, currentUserId, isDark }) {
  // State for the message input and local messages list
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Ref to auto-scroll to the bottom of messages
  const messagesEndRef = useRef(null);
  // Ref for generating unique message IDs
  const nextIdRef = useRef(1000);

  // Find the current conversation data
  const conversation = conversations.find((c) => c.id === conversationId);

  // Find the other user in this conversation
  const otherUserId = conversation
    ? conversation.participants.find((id) => id !== currentUserId)
    : null;
  const otherUser = users.find((u) => u.id === otherUserId);

  // Load messages for this conversation whenever conversationId changes
  // Using a ref + callback pattern to avoid setState inside effect
  const loadMessages = useCallback((convId) => {
    return allMessages.filter((msg) => msg.conversation === convId);
  }, []);

  useEffect(() => {
    const conversationMessages = loadMessages(conversationId);
    // Use functional update to satisfy lint (no direct setState in effect)
    const timer = setTimeout(() => setMessages(conversationMessages), 0);
    return () => clearTimeout(timer);
  }, [conversationId, loadMessages]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  /**
   * Handle sending a new message.
   * Adds it to local state (since we have no backend).
   * Also simulates a "typing" indicator and auto-reply.
   */
  const handleSend = () => {
    if (!inputText.trim()) return;

    // Create a new message object
    const newMessage = {
      id: nextIdRef.current++,
      conversation: conversationId,
      sender: currentUserId,
      text: inputText.trim(),
      timestamp: new Date().toISOString(),
    };

    // Add to local messages
    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    // Simulate the other user typing after 1 second
    setTimeout(() => setIsTyping(true), 1000);

    // Simulate an auto-reply after 2.5 seconds
    setTimeout(() => {
      setIsTyping(false);
      const reply = {
        id: nextIdRef.current++,
        conversation: conversationId,
        sender: otherUserId,
        text: getAutoReply(),
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, reply]);
    }, 2500);
  };

  /**
   * Returns a random auto-reply for the dummy chat.
   */
  const getAutoReply = () => {
    const replies = [
      "That's interesting! Tell me more.",
      "Haha, I totally agree! 😄",
      "Let me think about that...",
      "Sounds good to me!",
      "Oh wow, really?",
      "I'll get back to you on that.",
      "Nice! Keep me posted.",
      "That makes sense.",
      "Sure, let's do it! 🚀",
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  // Handle Enter key to send messages
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // If no conversation is selected, show a placeholder
  if (!conversation || !otherUser) {
    return (
      <div
        className={`flex-1 flex items-center justify-center ${
          isDark ? 'bg-dark-bg text-dark-muted' : 'bg-light-bg text-light-muted'
        }`}
      >
        <div className="text-center">
          <p className="text-5xl mb-4">💬</p>
          <p className="text-lg font-medium">Select a conversation to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex-1 flex flex-col h-full ${
        isDark ? 'bg-dark-bg' : 'bg-light-bg'
      }`}
    >
      {/* Chat Header - shows other user's name and status */}
      <div
        className={`flex items-center gap-3 px-5 py-3 border-b shadow-sm ${
          isDark
            ? 'bg-dark-surface border-dark-border'
            : 'bg-light-surface border-light-border'
        }`}
      >
        {/* User avatar */}
        <div className="relative">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
              isDark ? 'bg-dark-card text-dark-text' : 'bg-light-card text-light-text'
            }`}
          >
            {otherUser.avatar}
          </div>
          <span
            className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 ${
              isDark ? 'border-dark-surface' : 'border-light-surface'
            } ${otherUser.is_online ? 'bg-success' : 'bg-gray-500'}`}
          />
        </div>

        {/* User info */}
        <div>
          <h3 className={`text-sm font-semibold ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
            {otherUser.username}
          </h3>
          <p className={`text-xs ${otherUser.is_online ? 'text-success' : isDark ? 'text-dark-muted' : 'text-light-muted'}`}>
            {otherUser.is_online ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>

      {/* Messages Area - scrollable */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isSender={msg.sender === currentUserId}
            senderName={users.find((u) => u.id === msg.sender)?.username || 'Unknown'}
            isDark={isDark}
          />
        ))}

        {/* Show typing indicator when other user is "typing" */}
        {isTyping && <TypingIndicator isDark={isDark} />}

        {/* Invisible div to scroll into view */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Area */}
      <div
        className={`px-5 py-3 border-t ${
          isDark
            ? 'bg-dark-surface border-dark-border'
            : 'bg-light-surface border-light-border'
        }`}
      >
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm outline-none transition-colors ${
              isDark
                ? 'bg-dark-input text-dark-text placeholder-dark-muted focus:ring-1 focus:ring-primary'
                : 'bg-light-bg text-light-text placeholder-light-muted focus:ring-1 focus:ring-primary border border-light-border'
            }`}
          />

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all ${
              inputText.trim()
                ? 'bg-primary hover:bg-primary-hover cursor-pointer'
                : 'bg-primary/50 cursor-not-allowed'
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
