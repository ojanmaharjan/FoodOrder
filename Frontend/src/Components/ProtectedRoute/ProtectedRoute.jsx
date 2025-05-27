import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check authentication and role
    const accessToken = localStorage.getItem('accessToken');
    const userRole = localStorage.getItem('role');
    
    if (!accessToken) {
      setIsAuthenticated(false);
      setIsChecking(false);
      return;
    }

    // If specific role is required, check it
    if (requiredRole && userRole !== requiredRole) {
      setIsAuthenticated(false);
      setIsChecking(false);
      return;
    }

    setIsAuthenticated(true);
    setIsChecking(false);
  }, [requiredRole]);

  if (isChecking) {
    // You could show a loading spinner here
    return <div>Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login with a return URL
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
