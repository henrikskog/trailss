import React from 'react'

import './Footer.scss';
import Model from "../media/earth.png";
import logo from "../../../logo.svg";

function Footer() {
    return (
        <div className='footer-card'>
            <div className='footer-left'>
                <img src={logo}></img>
                <div className='footer-left-links'>

                </div>
                <div className='footer-left-copy'>
                    <p>© 2022 Trailss, All Rights Reserved</p>
                </div>
            </div>
            <div className='footer-right'>
                <div className='columns'>
                    <h3>Company</h3>
                    <ul>
                        <li>About</li>
                        <li>Blog</li>
                    </ul>
                </div>
                <div className='columns'>
                    <h3>Support</h3>
                    <ul>
                        <li>Help Center</li>
                        <li>FAQ</li>
                    </ul>
                </div>
                <div className='columns'>
                    <h3>Legal</h3>
                    <ul>
                        <li>Terms of Service</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
            </div>

            <div className='footer-model'>
                <img src={Model}></img>
            </div>
        </div>
    )
}

export default Footer;