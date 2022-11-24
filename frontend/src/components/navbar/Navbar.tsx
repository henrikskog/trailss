import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import React, { useState } from 'react';
import './Navbar.scss';
import useAuth from '../user/auth/AuthContext/AuthProvider';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className='left-nav'>
        <Link to="/">
          <img src={logo} className="logo" alt="Logo" />
        </Link>
        <ul id="nav-list">
          {user ? (
            <>
              <li>
                <Link to="dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="user/settings">Profile</Link>
              </li>
              <li>
                <a onClick={() => logout()}>Sign out</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="map">Map</Link>
              </li>
              <li>
                <Link to="login">Sign in</Link>
              </li>
              <li>
                <Link to="register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="dropdown">
        <button className="dropbtn">For Businesses</button>
        <div className="dropdown-content">
          <a className='top-hover'><Link to="information">Information</Link></a>
          <a className='bottom-hover'><Link to="enterprise-login">Sign in</Link></a>
        </div>
      </div>

    </header>

  );
}
