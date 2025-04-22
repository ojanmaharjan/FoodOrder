
import React, {useState} from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import {Link} from 'react-router-dom' //use to use for <LinK>

const Navbar = ({onSignIn,username}) => {
  const [menu,setMenu] = useState("menu");
  
  return (
    <div className='navbar'>
      <Link to='/'>
      <img src={assets.khaja} alt="" className='logo' /></Link>
      <ul className='navbar-menu'>
        <Link to='/'  onClick ={()=>setMenu("home") }className={menu==="home"?"active":""}>Home</Link>
        <a href='#explore-menu' onClick ={()=>setMenu("menu")}className={menu==="menu"?"active":""}>Menu</a>
        <a href='#app-Download' onClick ={()=>setMenu("mobile-app")}className={menu==="mobile-app"?"active":""}>Mobile-app</a>
        <a href='#footer' onClick ={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact us</a>
        <a href='/admin' onClick ={()=>setMenu("admin")} className={menu==="admin"?"active":""}>Admin</a>
      </ul> 
      <div className="navbar-right">
        <img src={assets.search_icon} alt=" " className=''/>
        <div className='bot'></div>
        <div className='navbar-search-icon'>
          <Link to='/cart'><img  src={assets.basket_icon} alt="" className=''/></Link>
          <div className='dot' ></div>

        </div>
        <button  type='submit' onClick={onSignIn}>Sign In</button>
      </div>
    </div>
  )
}

export default Navbar


// import React, { useState } from 'react';
// import './Navbar.css';
// import { assets } from '../../assets/assets';
// import { Link } from 'react-router-dom';

// const Navbar = ({ onSignIn, userName }) => {
//   const [menu, setMenu] = useState("menu");

//   return (
//     <div className="navbar">
//       <Link to="/">
//         <img src={assets.logo} alt="" className="logo" />
//       </Link>
//       <ul className="navbar-menu">
//         <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
//         <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
//         <a href="#app-Download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-app</a>
//         <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
//       </ul>

//       <div className="navbar-right">
//         <img src={assets.search_icon} alt="" />
//         <Link to="/cart">
//           <img src={assets.basket_icon} alt="" />
//         </Link>
//         {userName ? (
//           <p style={{ marginLeft: '10px', fontWeight: 'bold' }}>Hi, {userName}</p>
//         ) : (
//           <button onClick={onSignIn}>Sign In</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
