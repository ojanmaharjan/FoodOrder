// import React, { useState } from "react";
// import { Link, useHistory } from "react-router-dom";
// import "./Navbar.css";
// import { assets } from "../../assets/assets";
// import { Link } from "react-router-dom"; //use to use for <LinK>

// const Navbar = ({ onSignIn, username }) => {
//   const [menu, setMenu] = useState("menu");
//   const [userName, setUserName] = useState("");
//   const history = useHistory();

//   useEffect(() => {
//     // Get the name from localStorage if the user is logged in
//     const name = localStorage.getItem('name');
//     if (name) {
//       setUserName(name);
//     }
//   }, []);

//   const handleLogout = () => {
//     // Clear the tokens and name from localStorage
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     localStorage.removeItem('name');
    
//     // Redirect to login page
//     history.push('/login');
//   };

//   return (
//     <div className="navbar">
//       <Link to="/">
//         <img src={assets.khaja} alt="" className="logo" />
//       </Link>
//       <ul className="navbar-menu">
//         <Link
//           to="/"
//           onClick={() => setMenu("home")}
//           className={menu === "home" ? "active" : ""}
//         >
//           Home
//         </Link>
//         <a
//           href="#explore-menu"
//           onClick={() => setMenu("menu")}
//           className={menu === "menu" ? "active" : ""}
//         >
//           Menu
//         </a>
//         <a
//           href="#app-Download"
//           onClick={() => setMenu("mobile-app")}
//           className={menu === "mobile-app" ? "active" : ""}
//         >
//           Mobile-app
//         </a>
//         <a
//           href="#footer"
//           onClick={() => setMenu("contact-us")}
//           className={menu === "contact-us" ? "active" : ""}
//         >
//           Contact us
//         </a>
//         <a
//           href="/Oder"
//           onClick={() => setMenu("Oder")}
//           className={menu === "admin" ? "active" : ""}
//         >
//           Add Food
//         </a>
//         <a
//           href="/List"
//           onClick={() => setMenu("List")}
//           className={menu === "admin" ? "active" : ""}
//         >
//           List
//         </a>
//       </ul>
//       <div className="navbar-right">
//         <img src={assets.search_icon} alt=" " className="" />
//         <div className="bot"></div>
//         <div className="navbar-search-icon">
//           <Link to="/cart">
//             <img src={assets.basket_icon} alt="" className="" />
//           </Link>
//           <div className="dot"></div>
//         </div>
//         <button type="submit" onClick={onSignIn}>
//           Sign In
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate instead of useHistory
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = ({ onSignIn,userName,userRole }) => {
  const [menu, setMenu] = useState("menu");
  // const u = localStorage.getItem('name') // we can do like this by putting u in {username}. calling localstorage name
  // const  isAdmin = localStorage.getItem("role");
  
  const navigate = useNavigate(); // useNavigate instead of useHistory

  // useEffect(() => {
  //   // Get the name from localStorage if the user is logged in
  //   const name = localStorage.getItem('name');
  //   if (name) {
  //     setUserName(name);
  //   }
  // }, []);
  

  const handleLogout = () => {
    // Clear the tokens and name from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('name');
    localStorage.removeItem('role')
    localStorage.removeItem('isadmin')

    window.location.reload();
    
    // Redirect to login page
    navigate('/'); // use navigate() for redirection
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.khaja} alt="logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href="#app-Download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-app</a>
        <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
        {userRole === "is_admin" && (
          <>
            {/* <li>
              <Link to="/admins" className={menu === "admin" ? "active" : ""} onClick={() => setMenu("admin")}>Admin</Link>
            </li> */}
            <li>
              <Link to="/admins" onClick={() => setMenu("dashboard")} className={menu === "dashboard" ? "active" : ""}>Admin Panel</Link>
            </li>
          </>
        )}


      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="cart" />   
          </Link>
        </div>
          {/* //show username if loggin */}
        {userName ? (
          <div className="user-info">
            <span className="user-name">Welcome , {userName}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button onClick={onSignIn}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;




// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Navbar.css";
// import { assets } from "../../assets/assets";

// const Navbar = ({ onSignIn, userName }) => {
//   const [menu, setMenu] = useState("menu");
//   const navigate = useNavigate();

//   // const handleLogout = () => {
//   //   localStorage.removeItem('accessToken');
//   //   localStorage.removeItem('refreshToken');
//   //   localStorage.removeItem('name');
//   //   navigate('/');  // Redirect to home page after logout
//   // };

//   const [username, setUsername] = useState(localStorage.getItem("name"));

//   useEffect(() => {
//     const handleNameChange = () => {
//       setUsername(localStorage.getItem("name"));
//     };

//     window.addEventListener("nameChanged", handleNameChange);
//     return () => window.removeEventListener("nameChanged", handleNameChange);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("name");
//     setUsername(null);
//     window.dispatchEvent(new Event("nameChanged")); // trigger updates elsewhere too if needed
//   };

//   return (
//     <div className="navbar">
//       <Link to="/">
//         <img src={assets.khaja} alt="logo" className="logo" />
//       </Link>
//       <ul className="navbar-menu">
//         <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
//         <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
//         <a href="#app-Download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-app</a>
//         <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
//         <a href="/Order" onClick={() => setMenu("order")} className={menu === "order" ? "active" : ""}>Add Food</a>
//        <a href="/List" onClick={() => setMenu("List")} className={menu === "List" ? "active" : ""}>List</a>
//       </ul>
//       <div className="navbar-right">
//         <img src={assets.search_icon} alt="search" />
//         <div className="navbar-search-icon">
//           <Link to="/cart">
//             <img src={assets.basket_icon} alt="cart" />
//           </Link>
//         </div>

//         {userName ? (
//           <div className="user-info">
//             <span>Hi, {userName}</span>
//             <button onClick={handleLogout}>Logout</button>
//           </div>
//         ) : (
//           <button onClick={onSignIn}>Sign In</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
