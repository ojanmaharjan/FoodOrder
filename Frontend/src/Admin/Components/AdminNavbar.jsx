import React from 'react';
import './AdminNavbar.css';

const AdminNavbar = () => {
  return (
    <div className="admin-navbar">
      <div className="admin-navbar-right">
        <span>Welcome, Admin</span>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default AdminNavbar;