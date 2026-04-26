/**
 * Dashboard Page
 * Landing page after login - shows a welcome screen with quick actions.
 * Users can navigate to the chat room from here.
 */

import { Link } from 'react-router-dom';
import users from '../data/users.json';
import conversations from '../data/conversations.json';

function Dashboard({ isDark }) {
  // Current logged-in user (hardcoded as user ID 1 for demo)
  const currentUser = users.find((u) => u.id === 1);

  // Count online users
  const onlineCount = users.filter((u) => u.is_online).length;

  return (
    <div
      className={`min-h-screen ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}
    >
      {/* Top navigation bar */}
      <nav
        className={`px-6 py-4 border-b shadow-sm ${
          isDark
            ? 'bg-dark-surface border-dark-border'
            : 'bg-light-surface border-light-border'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">ChatApp</h1>
          <div className="flex items-center gap-3">
            <span className={`text-sm ${isDark ? 'text-dark-muted' : 'text-light-muted'}`}>
              Welcome, <span className={`font-semibold ${isDark ? 'text-dark-text' : 'text-light-text'}`}>{currentUser?.username}</span>
            </span>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                isDark ? 'bg-dark-card text-dark-text' : 'bg-light-card text-light-text'
              }`}
            >
              {currentUser?.avatar}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Total Conversations */}
          <div
            className={`p-5 rounded-2xl shadow-sm ${
              isDark
                ? 'bg-dark-surface border border-dark-border'
                : 'bg-light-surface border border-light-border'
            }`}
          >
            <p className={`text-sm ${isDark ? 'text-dark-muted' : 'text-light-muted'}`}>
              Total Conversations
            </p>
            <p className={`text-3xl font-bold mt-1 ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
              {conversations.length}
            </p>
          </div>

          {/* Online Users */}
          <div
            className={`p-5 rounded-2xl shadow-sm ${
              isDark
                ? 'bg-dark-surface border border-dark-border'
                : 'bg-light-surface border border-light-border'
            }`}
          >
            <p className={`text-sm ${isDark ? 'text-dark-muted' : 'text-light-muted'}`}>
              Online Users
            </p>
            <p className="text-3xl font-bold mt-1 text-success">
              {onlineCount}
            </p>
          </div>

          {/* Total Users */}
          <div
            className={`p-5 rounded-2xl shadow-sm ${
              isDark
                ? 'bg-dark-surface border border-dark-border'
                : 'bg-light-surface border border-light-border'
            }`}
          >
            <p className={`text-sm ${isDark ? 'text-dark-muted' : 'text-light-muted'}`}>
              Total Users
            </p>
            <p className={`text-3xl font-bold mt-1 ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
              {users.length}
            </p>
          </div>
        </div>

        {/* Go to Chat button */}
        <div className="text-center mb-8">
          <Link
            to="/chat"
            className="inline-block px-8 py-3 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-hover transition-colors shadow-lg"
          >
            Open Chat Room
          </Link>
        </div>

        {/* Online users list */}
        <div
          className={`p-5 rounded-2xl shadow-sm ${
            isDark
              ? 'bg-dark-surface border border-dark-border'
              : 'bg-light-surface border border-light-border'
          }`}
        >
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
            Users
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {users.map((user) => (
              <div
                key={user.id}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  isDark ? 'bg-dark-bg' : 'bg-light-bg'
                }`}
              >
                {/* Avatar */}
                <div className="relative">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      isDark ? 'bg-dark-card text-dark-text' : 'bg-light-card text-light-text'
                    }`}
                  >
                    {user.avatar}
                  </div>
                  <span
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 ${
                      isDark ? 'border-dark-bg' : 'border-light-bg'
                    } ${user.is_online ? 'bg-success' : 'bg-gray-500'}`}
                  />
                </div>

                {/* User info */}
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
                    {user.username}
                  </p>
                  <p className={`text-xs ${user.is_online ? 'text-success' : isDark ? 'text-dark-muted' : 'text-light-muted'}`}>
                    {user.is_online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
