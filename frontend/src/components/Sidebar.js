import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiBook,
  FiAward,
  FiSettings,
  FiVideo,
} from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Home' },
    { path: '/dashboard', icon: FiBook, label: 'My Courses' },
    { path: '/dashboard/certificates', icon: FiAward, label: 'Certificates' },
    { path: '/dashboard/settings', icon: FiSettings, label: 'Settings' },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <Icon />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;


