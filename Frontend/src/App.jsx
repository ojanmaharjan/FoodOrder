import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'


import  {Route, Routes} from  'react-router-dom'
import Footer from './Components/Footer/Footer'
import AppDownload from './Components/AppDownload/AppDownload'
import LoginPage from './Components/LoginPage/LoginPage'
import FoodManager  from './Admin/Pages/FoodManager'
import AdminLayout from './Admin/AdminLayout'

// import ParentComponent from './Components/LoginPage/LoginPage'
  
// import ParentComponent from './Components/ParentComponent'

const App = () => {
  const [showLogin,setShowLogin]=useState(true);
  const handleSignIn =()=>{
    setShowLogin(true); //show login form
  };
  
  return (
    <>
    <div className='app'>
      {/* Conditionally render LoginPage based on showLogin */}
      {showLogin && <LoginPage setShowLogin={setShowLogin}/>}

        {/* Pass the handleSignIn function to Navbar */}
      <Navbar onSignIn={handleSignIn}/>
     
        <Routes>
                  <Route path ='/' element={<Home/>}/>
                  <Route path ='/Cart' element={<Cart/>}/>
                  <Route path ='/Order' element={<PlaceOrder/>}/>
                  <Route path='/FoodManager' element={<FoodManager/>}/>

                  <Route path='/admin' element={<AdminLayout/>}>
           
            <Route path='food-manager' element={<FoodManager/>}/>
            <Route path='orders' element={<div>Orders</div>}/>
          </Route>

                
                 
        </Routes>
     <AppDownload/>
    </div>
   <Footer/>
</>
    
  )
}

export default App
