import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import logo from '../../assets/logo.png'

import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, profileImage, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div id='signup-page'>
      <div id='signup'>
        <form onSubmit={handleSubmit}>
          <img src={logo} alt=''></img>
          <h1>Signup</h1>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div className='label-input'>
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='label-input'>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='label-input'>
            <label>Profile Image</label>
            <input
              type="text"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
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
          <div className='label-input'>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button id='signup-button' type="submit">Signup</button>
          <hr></hr>
          <button onClick={e => {
            e.preventDefault();
            setErrors([]);
            return dispatch(sessionActions.login({ credential: 'musicproduction', password: 'password' }));
          }} id='demo-button' type="submit">Login as Demo</button>
          <NavLink to='/login'><button>Login with an account</button></NavLink>
        </form>
      </div>
      <img src='https://www.nerdwallet.com/assets/blog/wp-content/uploads/2021/04/GettyImages-1195036519-1920x1152.jpg' alt=''></img>
    </div>
  );
}

export default SignupFormPage;
