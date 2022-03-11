import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png'

import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div id='login-page'>
      <div id='login'>
        <form onSubmit={handleSubmit}>
          <img src={logo} alt=''></img>
          <h1>Login</h1>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div className='label-input'>
            <label>Username or Email</label>
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
          </div>
          <div className='label-input'>
            <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
          </div>
          <button id='login-button' type="submit">Log In</button>
          <hr></hr>
          <button onClick={() => {
            setCredential('musicproduction');
            setPassword('password');
          }} id='demo-button' type="submit">Login as Demo</button>
          <NavLink to='/signup'><button>Signup for Eventbright</button></NavLink>
        </form>
      </div>
      <img src='https://www.nerdwallet.com/assets/blog/wp-content/uploads/2021/04/GettyImages-1195036519-1920x1152.jpg' alt=''></img>
    </div>
  );
}

export default LoginFormPage;
