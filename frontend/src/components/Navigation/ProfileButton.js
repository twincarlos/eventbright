import React, { useState, useEffect, useContext } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { GlobalContext } from '../../context/GlobalContext';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const { setTab } = useContext(GlobalContext);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    if (!showMenu) return;


    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
    <div id='profile-button' onMouseEnter={openMenu}>
      <i className="fas fa-caret-down"></i>
      <img id='user-image' src={sessionUser.profileImage} alt=''></img>
    </div>
      {showMenu && (
        <ul className="profile-dropdown" onMouseLeave={closeMenu}>
          <li><NavLink to={`/users/${user.id}`}>{user.username}</NavLink></li>
          <li onClick={() => setTab('Events')}><NavLink to={`/users/${user.id}`}>Events</NavLink></li>
          <li onClick={() => setTab('Tickets')}><NavLink to={`/users/${user.id}`}>Tickets</NavLink></li>
          <li onClick={() => setTab('Likes')}><NavLink to={`/users/${user.id}`}>Likes</NavLink></li>
          <li>
            <button onClick={logout}><i className="fas fa-sign-out-alt"></i> Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
