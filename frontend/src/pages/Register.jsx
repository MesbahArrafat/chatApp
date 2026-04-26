/**
 * Register Page
 * A modern registration form UI (no backend - just navigates to login).
 * Matches the Login page design with dark/light mode support.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register({ isDark }) {
  // Form state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // Handle form submission (no real auth - just redirect)
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd register the user here
    navigate('/');
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        isDark ? 'bg-dark-bg' : 'bg-light-bg'
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-2xl shadow-xl ${
          isDark
            ? 'bg-dark-surface border border-dark-border'
            : 'bg-light-surface border border-light-border'
        }`}
      >
        {/* Logo / App Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">ChatApp</h1>
          <p className={`mt-2 text-sm ${isDark ? 'text-dark-muted' : 'text-light-muted'}`}>
            Create a new account
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label
              className={`block text-sm font-medium mb-1.5 ${
                isDark ? 'text-dark-text' : 'text-light-text'
              }`}
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-colors ${
                isDark
                  ? 'bg-dark-input text-dark-text placeholder-dark-muted focus:ring-2 focus:ring-primary'
                  : 'bg-light-bg text-light-text placeholder-light-muted focus:ring-2 focus:ring-primary border border-light-border'
              }`}
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              className={`block text-sm font-medium mb-1.5 ${
                isDark ? 'text-dark-text' : 'text-light-text'
              }`}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-colors ${
                isDark
                  ? 'bg-dark-input text-dark-text placeholder-dark-muted focus:ring-2 focus:ring-primary'
                  : 'bg-light-bg text-light-text placeholder-light-muted focus:ring-2 focus:ring-primary border border-light-border'
              }`}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              className={`block text-sm font-medium mb-1.5 ${
                isDark ? 'text-dark-text' : 'text-light-text'
              }`}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-colors ${
                isDark
                  ? 'bg-dark-input text-dark-text placeholder-dark-muted focus:ring-2 focus:ring-primary'
                  : 'bg-light-bg text-light-text placeholder-light-muted focus:ring-2 focus:ring-primary border border-light-border'
              }`}
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              className={`block text-sm font-medium mb-1.5 ${
                isDark ? 'text-dark-text' : 'text-light-text'
              }`}
            >
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-colors ${
                isDark
                  ? 'bg-dark-input text-dark-text placeholder-dark-muted focus:ring-2 focus:ring-primary'
                  : 'bg-light-bg text-light-text placeholder-light-muted focus:ring-2 focus:ring-primary border border-light-border'
              }`}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-hover transition-colors cursor-pointer mt-2"
          >
            Create Account
          </button>
        </form>

        {/* Login link */}
        <p
          className={`text-center text-sm mt-6 ${
            isDark ? 'text-dark-muted' : 'text-light-muted'
          }`}
        >
          Already have an account?{' '}
          <Link to="/" className="text-primary hover:text-primary-hover font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
