import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";

import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import AppDownload from "./Components/AppDownload/AppDownload";
import LoginPage from "./Components/LoginPage/LoginPage";
import FoodManager from "./Admin/Pages/FoodManager";
import AdminLayout from "./Admin/AdminLayout";
import Oder from "./Admin/Pages/Oder";
import List from "./Admin/Pages/List";
import EditFoodItem from "./Admin/Pages/EditFoodItem";
import AdminPannel from "./Admin/Pages/AdminPannel";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import CustomerOrders from "./Admin/Pages/CustomerOrders";


const App = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [userName, setUserName] = useState("");  // State to manage username
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
 

  const handleSignIn = () => {
    setShowLogin(true); //show login form
  };


  useEffect(() => {
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");
    const accessToken = localStorage.getItem("accessToken");
    
    if (name) setUserName(name);
    if (role) setUserRole(role);
    
    // Hide login form if user is already logged in
    if (accessToken) {
      setShowLogin(false);
    }
  }, []);

  const handleLoginSuccess = (name, accessToken, refreshToken, is_admin) => {
    setUserName(name);
    setUserRole(is_admin ? "is_admin" : "user"); // Update state immediately
    localStorage.setItem("name", name);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("role", is_admin ? "is_admin" : "user"); // Store role
    setShowLogin(false);
  };


  return (
    <>
      <div className="app">
        {/* Conditionally render LoginPage based on showLogin */}
        {showLogin && <LoginPage setShowLogin={setShowLogin}  onLoginSuccess={handleLoginSuccess}/>}

        {/* Pass the handleSignIn function to Navbar */}
        <Navbar onSignIn={handleSignIn} userName={userName} userRole={userRole} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Order" element={<PlaceOrder />} />

          {/* <Route path="/FoodManager" element={<FoodManager />} />
          <Route path="/Oder" element={<Oder />} />
          <Route path="/list" element={<List />} />
          <Route path="/edit/:id" element={<EditFoodItem />} /> */}

          {/* <Route path="/admin" element={<AdminLayout />}>
            <Route path="food-manager" element={<FoodManager />} />
            <Route path="orders" element={<div>Orders</div>} /> */}
            {/* <Route path="/admin" element={<AdminPannel/>}>
              <Route path="/admin/Oder" element={<Oder/>}/>
              <Route path="/admin/List" element={<List/>}/> */}
        
        {/* Admin Routes - Protected with role requirement */}
        <Route path="/admins" element={
          <ProtectedRoute requiredRole="is_admin">
            <AdminPannel />
          </ProtectedRoute>
        }>
            <Route index element={<List />} /> {/* Make List the default view */}
            <Route path="add" element={<EditFoodItem />} />
            <Route path="edit/:id" element={<EditFoodItem />} />
            <Route path="list" element={<List />} />
            <Route path="order" element={<Oder />} />
            <Route path="customer-orders" element={<CustomerOrders />} />
        </Route>


            {/* </Route> */}
          {/* </Route> */}
        </Routes>
        <AppDownload />
      </div>
      <Footer />
    </>
  );
};

export default App;
