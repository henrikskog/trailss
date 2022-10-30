import React, { useState } from 'react';
import './Landing.scss';

import TopPage from './components/TopPage';
import MidPage from './components/MidPage';


export default function Landing() {
  return (
    <div className="landing">
        <div className='landing-top'>
          <TopPage />
        </div>
        <div className='landing-mid'>
          <MidPage />
        </div>
    </div>
  );
}
