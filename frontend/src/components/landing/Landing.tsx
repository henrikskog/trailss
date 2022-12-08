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
        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos hic perspiciatis quia qui saepe sit amet consectetur adipisicing elit. Eos hic perspiciatis quia qui saepe</h3>
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
