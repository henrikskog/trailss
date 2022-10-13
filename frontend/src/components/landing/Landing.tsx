import React, { useState } from 'react';
import './Landing.scss';
import Form from '../user/trip/form/Form';
import { Link } from "react-router-dom";

import TopPage from './components/TopPage';
import MidPage from './components/MidPage';
import BottomPage from './components/BottomPage';


export default function Landing() {
  const [count, setCount] = useState(0);

  return (
    <div className="landing">
        <div className='landing-top'>
          <TopPage />
        </div>
        <div className='landing-mid'>
          <MidPage />
        </div>
        <div className='landing-bottom'>
          <BottomPage />
        </div>
    </div>
  );
}
