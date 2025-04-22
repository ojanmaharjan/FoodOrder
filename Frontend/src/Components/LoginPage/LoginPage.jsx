import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import './LoginPage.css';
import axios from 'axios';
import { validateEmail, validatePassword } from './validation';

const LoginPage = ({ setShowLogin, onLoginSuccess }) => {
  const [currState, setCurrState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
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

    if (!valid) return;

    const payload = currState === 'SignUp'
      ? { name, email, password }
      : { email, password };

    const endpoint = currState === 'SignUp'
      ? 'http://localhost:8000/api/signup/'
      : 'http://localhost:8000/api/login/';

    try {
      const response = await axios.post(endpoint, payload);

      if (currState === 'Login') {
        localStorage.setItem('token', response.data.token);
        onLoginSuccess(response.data.name); // pass name up
        setShowLogin(false);
      } else {
        alert('Signup successful! Please log in.');
        setCurrState('Login');
      }
    } catch (error) {
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
          {emailError && <p className='error'>{emailError}</p>}

          <input
            type='password'
            placeholder='Password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className='error'>{passwordError}</p>}
        </div>

        <button type="submit">{currState === 'SignUp' ? 'Create Account' : 'Login'}</button>

        <div className='login-popup-condition'>
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of policy and conditions</p>
        </div>

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
