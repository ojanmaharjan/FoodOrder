
import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import './LoginPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { validateName } from './validation';

const LoginPage = ({ setShowLogin, onLoginSuccess }) => {
  const [currState, setCurrState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currState === 'SignUp' && !validateName(name)) {
      setErrorMsg("Name cannot start with number.");
      return;
    }
    const payload = currState === 'Login' ? { email, password } : { name, email, password };
    const endpoint = currState === 'Login' ? 'http://localhost:8000/api/login/' : 'http://localhost:8000/api/signup/';

    try {
      const response = await axios.post(endpoint, payload);
      console.log('Backend response:', response);

      if (currState === 'Login') {
        // Store tokens and user information
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('is_admin', response.data.is_admin);
        
        // Set role based on admin status
        if (response.data.is_admin) {
          localStorage.setItem('role', 'is_admin');
          // Pass user info up to parent component
          if (onLoginSuccess) {
            onLoginSuccess(response.data.name, response.data.access, response.data.refresh, response.data.is_admin);
          }
          setShowLogin(false);
          // Redirect to admin panel
          navigate('/admins');
        } else {
          localStorage.setItem('role', 'user');
          // Pass user info up to parent component
          if (onLoginSuccess) {
            onLoginSuccess(response.data.name, response.data.access, response.data.refresh, response.data.is_admin);
          }
          setShowLogin(false);
          // Redirect to home page
          navigate('/');
        }
      } else {
        alert('Signup successful! Please log in.');
        setCurrState('Login');
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      setErrorMsg(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className='login-popup'>
      <form className='login-popup-container' onSubmit={handleSubmit}>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img className="cross" onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='' />
        </div>

        <div className='login-popup-inputs'>
          {currState === 'SignUp' && (
            <input type='text' placeholder='Name' required value={name} onChange={(e) => setName(e.target.value)} />
          )}

          <input
            type='email'
            placeholder='Email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type='password'
            placeholder='Password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">{currState === 'SignUp' ? 'Create Account' : 'Login'}</button>

      

        {errorMsg && <p className="error">{errorMsg}</p>}

        {currState === 'Login' ? (
          <p>Create a new account? <span onClick={() => setCurrState('SignUp')}>Click here!</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login</span></p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
