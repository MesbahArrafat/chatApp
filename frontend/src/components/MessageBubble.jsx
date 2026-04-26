/**
 * MessageBubble Component
 * Displays a single chat message with different styles for sender vs receiver.
 * - Sender messages appear on the right (indigo/primary color)
 * - Receiver messages appear on the left (surface color)
 */

function MessageBubble({ message, isSender, senderName, isDark }) {
  // Format the timestamp to show hours and minutes
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-[70%] px-4 py-2.5 rounded-2xl shadow-sm ${
          isSender
            ? 'bg-primary text-white rounded-br-md'
            : isDark
              ? 'bg-dark-surface text-dark-text rounded-bl-md'
              : 'bg-light-surface text-light-text rounded-bl-md border border-light-border'
        }`}
      >
        {/* Show sender name for received messages */}
        {!isSender && (
          <p className={`text-xs font-semibold mb-1 ${isDark ? 'text-primary-hover' : 'text-primary'}`}>
            {senderName}
          </p>
        )}

        {/* Message text */}
        <p className="text-sm leading-relaxed break-words">{message.text}</p>

        {/* Timestamp */}
        <p
          className={`text-[10px] mt-1 text-right ${
            isSender ? 'text-indigo-200' : isDark ? 'text-dark-muted' : 'text-light-muted'
          }`}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}

export default MessageBubble;
