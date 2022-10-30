import React, { useState } from 'react';
import './Dashboard.scss';
import { MenuBar } from './components/menubar/MenuBar';

export default function Dashboard() {
  return (
    <div className="dashboard">
        <MenuBar />
    </div>
  );
}

