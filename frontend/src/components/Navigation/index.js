import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink id='login-a' to="/login">Log In</NavLink>
        <NavLink id='signup-a' to="/signup">Sign Up</NavLink>
        <a id='demo-a' onClick={() => dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }))}>Demo</a>
      </>
    );
  }

  return (
    <ul id='nav'>
      <li>
        <NavLink id='home-a' exact to="/">Home</NavLink>
        <form>
          <button>S</button>
          <input type='text' placeholder='Search events'></input>
        </form>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
