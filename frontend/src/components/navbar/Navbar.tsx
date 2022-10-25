import { Link } from "react-router-dom";
import logo from '../../logo.svg';
import React, { useState } from 'react';
import "./Navbar.scss";



export default function Navbar() {
    return (
        <header className="navbar">
            <Link to="/"><img src={logo} className="logo" alt="Logo" /></Link>
            <ul id='nav-list'>
                <li><Link to="map">Map</Link></li>
                <li><Link to="user/settings">Profile</Link></li>
            </ul>
        </header>
    );
}
