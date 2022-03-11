import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';
import { searchAllEvents } from '../../store/event';
import logo from '../../assets/logo.png';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const searchList = useSelector(state => state.event.searchList);
  const [name, setName] = useState('');

  useEffect(() => {
    dispatch(searchAllEvents(name));
  }, [dispatch, name]);

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
          { name.length ? <i className="fas fa-times-circle" onClick={() => setName('')}></i> : <i className="fas fa-search"></i>}
          <input type='text' placeholder='Search events' value={name} onChange={e => setName(e.target.value)}></input>
        </form>
        {isLoaded && sessionLinks}
      </li>
      {
        searchList?.length ?
        (<li id='search-events-container'>
          { searchList.map(event => <NavLink to={`/events/${event.id}`} onClick={() => setName('')} key={event.id.toString()}>{event.name}</NavLink>) }
        </li>) : null
      }
    </ul>
  );
}

export default Navigation;
