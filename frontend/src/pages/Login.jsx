/**
 * Login Page
 * A modern login form UI (no backend - just navigates to dashboard).
 * Features a clean card design with dark/light mode support.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ isDark }) {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle form submission (no real auth - just redirect)
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd authenticate here
    navigate('/dashboard');
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
            Sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="Enter your password"
              className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-colors ${
                isDark
                  ? 'bg-dark-input text-dark-text placeholder-dark-muted focus:ring-2 focus:ring-primary'
                  : 'bg-light-bg text-light-text placeholder-light-muted focus:ring-2 focus:ring-primary border border-light-border'
              }`}
              required
            />
          </div>

          {/* Forgot password link */}
          <div className="text-right">
            <a href="#" className="text-xs text-primary hover:text-primary-hover">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-hover transition-colors cursor-pointer"
          >
            Sign In
          </button>
        </form>

        {/* Register link */}
        <p
          className={`text-center text-sm mt-6 ${
            isDark ? 'text-dark-muted' : 'text-light-muted'
          }`}
        >
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-primary hover:text-primary-hover font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
