import { Link } from 'react-router-dom';
import logo from '../../logoDark.svg';
import React, { useState } from 'react';
import './Navbar.scss';
import useAuth from '../user/auth/AuthContext/AuthProvider';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="left-nav">
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
        <div className="dropbtn">For Businesses</div>
        <div className="dropdown-content">
          <Link className='top-hover' to="information">Information</Link>
          <Link className='bottom-hover' to="companyLogin">Sign in</Link>
        </div>
      </div>
    </header>
  );
}
