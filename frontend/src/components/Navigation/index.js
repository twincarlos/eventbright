import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';
import logo from '../../assets/logo.png';
import './Navigation.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const handleDemo = e => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: 'music@production.io', password: 'password' }));
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink id='create-event' to='/create-event'><i className="fas fa-plus"></i>Create Event</NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <div id='session-links'>
        <NavLink id='login-a' to="/login">Log In</NavLink>
        <NavLink id='signup-a' to="/signup">Sign Up</NavLink>
        <a href='/' id='demo-a' onClick={handleDemo}>Demo</a>
      </div>
    );
  }

  return (
    <ul id='nav'>
      <li>
        <NavLink id='home-a' exact to="/"><img src={logo} alt=''></img></NavLink>
        <form>
          <button onClick={e => e.preventDefault()}><i className="fas fa-search"></i></button>
          <input type='text' placeholder='Search events'></input>
        </form>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
