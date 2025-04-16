import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import CartCRUD  from './Pages/Cart/CartCRUD'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'

import  {Route, Routes} from  'react-router-dom'
import Footer from './Components/Footer/Footer'
import AppDownload from './Components/AppDownload/AppDownload'
import LoginPage from './Components/LoginPage/LoginPage'
import FoodManager from './Pages/Admin/FoodManager'
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
                  <Route path='/CartCRUD' element={<CartCRUD/>}/>
                  <Route path ='/Order' element={<PlaceOrder/>}/>
                  <Route path='/FoodManager' element={<FoodManager/>}/>
        </Routes>
     <AppDownload/>
    </div>
   <Footer/>
</>
    
  )
}

export default App
