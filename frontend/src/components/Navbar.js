import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem('token');

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📚</span>
          <span className="logo-text">LearnHub</span>
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/courses" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Courses
          </Link>
          {isLoggedIn && (
            <Link to="/dashboard" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              Dashboard
            </Link>
          )}
          {isLoggedIn && localStorage.getItem('role') === 'admin' && (
            <Link to="/admin" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              Admin
            </Link>
          )}
        </div>

        <div className="navbar-actions">
          {isLoggedIn ? (
            <div className="user-menu">
              <button
                className="user-menu-button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <FiUser />
                <span>{localStorage.getItem('userName') || 'User'}</span>
              </button>
              {isUserMenuOpen && (
                <div className="user-menu-dropdown">
                  <Link to="/dashboard" onClick={() => setIsUserMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('userName');
                      localStorage.removeItem('userId');
                      localStorage.removeItem('role');
                      window.location.href = '/';
                    }}
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          )}

          <button
            className="navbar-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


