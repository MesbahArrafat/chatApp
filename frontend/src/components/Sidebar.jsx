/**
 * Sidebar Component
 * Shows the list of conversations with user info, online status,
 * last message preview, and timestamps.
 */

import users from '../data/users.json';
import conversations from '../data/conversations.json';

function Sidebar({ currentUserId, activeConversation, onSelectConversation, isDark }) {
  /**
   * Find the other participant in a conversation (not the current user).
   * Returns the user object from users.json.
   */
  const getOtherUser = (conversation) => {
    const otherUserId = conversation.participants.find((id) => id !== currentUserId);
    return users.find((user) => user.id === otherUserId);
  };

  /**
   * Format the timestamp to a short readable format.
   * Shows "Today" or "Yesterday" or date.
   */
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div
      className={`w-80 h-full flex flex-col border-r ${
        isDark
          ? 'bg-dark-bg border-dark-border'
          : 'bg-light-surface border-light-border'
      }`}
    >
      {/* Sidebar Header */}
      <div
        className={`p-4 border-b ${
          isDark ? 'border-dark-border' : 'border-light-border'
        }`}
      >
        <h2 className={`text-xl font-bold ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
          Chats
        </h2>

        {/* Search bar */}
        <div className="mt-3">
          <input
            type="text"
            placeholder="Search conversations..."
            className={`w-full px-3 py-2 rounded-lg text-sm outline-none transition-colors ${
              isDark
                ? 'bg-dark-input text-dark-text placeholder-dark-muted focus:ring-1 focus:ring-primary'
                : 'bg-light-bg text-light-text placeholder-light-muted focus:ring-1 focus:ring-primary border border-light-border'
            }`}
          />
        </div>
      </div>

      {/* Conversation List - scrollable */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => {
          const otherUser = getOtherUser(conversation);
          if (!otherUser) return null;

          const isActive = activeConversation === conversation.id;

          return (
            <button
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={`w-full flex items-center gap-3 p-3 transition-colors cursor-pointer text-left ${
                isActive
                  ? isDark
                    ? 'bg-dark-surface'
                    : 'bg-light-card'
                  : isDark
                    ? 'hover:bg-dark-surface/50'
                    : 'hover:bg-light-bg'
              }`}
            >
              {/* Avatar with online indicator */}
              <div className="relative flex-shrink-0">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${
                    isDark
                      ? 'bg-dark-card text-dark-text'
                      : 'bg-light-card text-light-text'
                  }`}
                >
                  {otherUser.avatar}
                </div>

                {/* Green dot = online, Gray dot = offline */}
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${
                    isDark ? 'border-dark-bg' : 'border-light-surface'
                  } ${otherUser.is_online ? 'bg-success' : 'bg-gray-500'}`}
                />
              </div>

              {/* Username + last message */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-sm font-semibold truncate ${
                      isDark ? 'text-dark-text' : 'text-light-text'
                    }`}
                  >
                    {otherUser.username}
                  </h3>
                  <span
                    className={`text-[11px] flex-shrink-0 ${
                      isDark ? 'text-dark-muted' : 'text-light-muted'
                    }`}
                  >
                    {formatTime(conversation.lastMessageTime)}
                  </span>
                </div>
                <p
                  className={`text-xs truncate mt-0.5 ${
                    isDark ? 'text-dark-muted' : 'text-light-muted'
                  }`}
                >
                  {conversation.lastMessage}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
