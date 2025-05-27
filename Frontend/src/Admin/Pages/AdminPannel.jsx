import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { FaList, FaPlus, FaUtensils, FaClipboardList } from 'react-icons/fa';

const AdminPannel = () => {


  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
      </div>
      
      <div className="admin-container">
        <div className="admin-sidebar">
          <nav className="admin-nav">
            <Link to="/admins/list" className="admin-nav-item">
              <FaList /> <span>View All Food Items</span>
            </Link>
            <Link to="/admins/add" className="admin-nav-item">
              <FaPlus /> <span>Add New Food Item</span>
            </Link>
              {/* <Link to="/admins/order" className="admin-nav-item">
                <FaUtensils /> <span>Manage Orders</span>
              </Link> */}
            <Link to="/admins/customer-orders" className="admin-nav-item">
              <FaClipboardList /> <span>Customer Orders</span>
            </Link>
          </nav>
        </div>
        
        <div className="admin-content">
          <Outlet /> {/* This renders nested child components */}
        </div>
      </div>

      <style jsx>{`
        .admin-panel {
          display: flex;
          flex-direction: column;
          min-height: 80vh;
        }
        .admin-header {
          background-color: #333;
          color: white;
          padding: 15px 20px;
          border-bottom: 3px solid #ff4500;
        }
        .admin-header h2 {
          margin: 0;
        }
        .admin-container {
          display: flex;
          flex: 1;
        }
        .admin-sidebar {
          width: 250px;
          background-color: #f5f5f5;
          padding: 20px 0;
          border-right: 1px solid #ddd;
        }
        .admin-content {
          flex: 1;
          padding: 20px;
        }
        .admin-nav {
          display: flex;
          flex-direction: column;
        }
        .admin-nav-item {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          color: #333;
          text-decoration: none;
          border-left: 3px solid transparent;
          transition: all 0.3s ease;
        }
        .admin-nav-item:hover {
          background-color: #e9e9e9;
          border-left-color: #ff4500;
        }
        .admin-nav-item svg {
          margin-right: 10px;
          font-size: 1.2em;
        }
      `}</style>
    </div>
  );
};
export default AdminPannel
