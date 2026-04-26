/**
 * App.jsx - Root Component
 *
 * Sets up:
 * 1. React Router for page navigation
 * 2. Dark/Light mode toggle (persisted in localStorage)
 * 3. Global theme toggle button visible on all pages
 *
 * Routes:
 * - /          → Login page
 * - /register  → Register page
 * - /dashboard → Dashboard page
 * - /chat      → Chat room (main chat UI)
 */

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ChatRoom from './pages/ChatRoom';

function App() {
  // Initialize dark mode from localStorage (default: true = dark)
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('chatapp-theme');
    return saved !== null ? saved === 'dark' : true;
  });

  // Save theme preference whenever it changes
  useEffect(() => {
    localStorage.setItem('chatapp-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Toggle between dark and light mode
  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <BrowserRouter>
      {/* Floating theme toggle button - visible on all pages */}
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer ${
          isDark
            ? 'bg-dark-surface text-yellow-400 border border-dark-border hover:bg-dark-card'
            : 'bg-light-surface text-indigo-600 border border-light-border hover:bg-light-card'
        }`}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {/* Sun icon for dark mode, Moon icon for light mode */}
        {isDark ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        )}
      </button>

      {/* Application Routes */}
      <Routes>
        <Route path="/" element={<Login isDark={isDark} />} />
        <Route path="/register" element={<Register isDark={isDark} />} />
        <Route path="/dashboard" element={<Dashboard isDark={isDark} />} />
        <Route path="/chat" element={<ChatRoom isDark={isDark} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
