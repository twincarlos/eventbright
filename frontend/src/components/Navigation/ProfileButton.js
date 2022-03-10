import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

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
          <li>Events</li>
          <li>Tickets</li>
          <li>Likes</li>
          <li>Interests</li>
          <li>
            <button onClick={logout}><i className="fas fa-sign-out-alt"></i> Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
