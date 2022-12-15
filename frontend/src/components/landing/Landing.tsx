import React, { useState } from 'react';
import './Landing.scss';

import TopPage from './components/TopPage';
import MidPage from './components/MidPage';
import BottomPage from './components/BottomPage';
import Footer from './components/Footer';


export default function Landing() {
  return (
    <div className="landing">
      <div className='landing-top'>
        <TopPage />
      </div>
      <div className='landing-mid'>
        <MidPage />
      </div>
      <div className='landing-spacer'>
        <h3>Did you know that trailss also supports carbon footprint tracking for companies? Register your company, calculate its emissions and obtain official certificates to show that you align with the values of your customers!</h3>
      </div>
      <div className='landing-bottom'>
        <BottomPage />
      </div>
      <div className='landing-footer'>
        <Footer />
      </div>
    </div>
  );
}
