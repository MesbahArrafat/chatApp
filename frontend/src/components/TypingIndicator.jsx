/**
 * TypingIndicator Component
 * Shows an animated "typing..." indicator with bouncing dots.
 * Simulates someone typing in the chat.
 */

function TypingIndicator({ isDark }) {
  return (
    <div className="flex justify-start mb-3">
      <div
        className={`px-4 py-3 rounded-2xl rounded-bl-md shadow-sm ${
          isDark ? 'bg-dark-surface' : 'bg-light-surface border border-light-border'
        }`}
      >
        {/* Three animated bouncing dots */}
        <div className="flex items-center gap-1">
          <span
            className={`typing-dot inline-block w-2 h-2 rounded-full ${
              isDark ? 'bg-dark-muted' : 'bg-light-muted'
            }`}
          />
          <span
            className={`typing-dot inline-block w-2 h-2 rounded-full ${
              isDark ? 'bg-dark-muted' : 'bg-light-muted'
            }`}
          />
          <span
            className={`typing-dot inline-block w-2 h-2 rounded-full ${
              isDark ? 'bg-dark-muted' : 'bg-light-muted'
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;
