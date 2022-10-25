import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu'
import './LandingHamburger.scss';

export default function LandingHamburger() {
  return (
    <div className="landing-hamburger">
      <Menu {...props}>
        <a className="menu-item" href="/">
          Home
        </a>

        <a className="menu-item" href="/victor-la-chupa">
          Victor la chupa
        </a>

        <a className="menu-item" href="/pizzas">
          Pizzas
        </a>

        <a className="menu-item" href="/desserts">
          Desserts
        </a>
      </Menu>
    </div>
  );
}