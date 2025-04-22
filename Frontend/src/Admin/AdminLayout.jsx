import React from 'react';
import { Outlet } from 'react-router-dom';

import AdminSidebar from './Components/AdminSidebar'
import AdminNavbar from './Components/AdminNavbar';

const AdminLayout = () => {
  return (
    <div className="admin-container">
         <div className="admin-content">
            <AdminNavbar />
            <AdminSidebar />
    
          {/* <div className="admin-main">
          <Outlet />
          </div> */}
          <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;