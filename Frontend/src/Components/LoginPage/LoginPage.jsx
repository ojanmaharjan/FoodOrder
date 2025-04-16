import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import './LoginPage.css'
import { validateEmail,validatePassword } from './validation';
// import ExploreMenu from '../ExploreMenu/ExploreMenu'


const LoginPage = ({setShowLogin}) => {
  const [currState,setcurrState] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload when the form is submitted
    let valid = true;
    console.log("enter the value",email);
    console.log("enter the ",validateEmail(email)); 

    if (!validateEmail(email)) {
      setEmailError('Invalid email format'); // Show error if email is wrong
      valid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      alert(`${currState} successful!`);
      // Proceed with authentication logic
    }
  };
  return (
    <div className='login-popup'>
      <form className='login-popup-container' onSubmit={handleSubmit}>  
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img  className="cross" onClick={()=> setShowLogin(false)} src={assets.cross_icon} alt=''/>
        </div>
            <div className='login-popup-inputs'>
              {currState=='Login'?<></>:<input type='name' placeholder='Name' required/>} 
              {/* <></> if the condition is false it render nothing and if conditon is false it render <input></input>  */}
              {/* //if the currState value is 'Login' then name box will appear */}
              <input type='email' placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)} />
              {emailError &&<p className='error'>{emailError}   </p>}

              <input type='password' placeholder='password' required  value={password} onChange={(e) => setPassword(e.target.value)}/>
              {passwordError &&<p className='error'>{passwordError}</p>}
            </div>
       
          <button>{currState==='SignUp'?"create account":"Login"}</button>
          {/* condition ? expressionIfTrue : expressionIfFalse
          if currState is true then create account is excutated then login is excutated */}
        <div className='login-popup-condition'>
          <input type="checkbox" required/>
          <p>By continue, i  agree to the terms of the policy and the terms</p>
        </div>
          {currState==='Login'
          ?<p>Create a new account?<span onClick={()=>setcurrState("SignUp")}>Click me!</span></p>
          : <p>Already Have an account?<span onClick={()=>setcurrState("Login")}>Login</span></p>
          }
       
      </form>
    </div>
  )
}

export default LoginPage
// Note : yautai page ma parentcomponent rakheko vayera 
// chutai page banayera pani garna sakincha tara link garnu parcha


