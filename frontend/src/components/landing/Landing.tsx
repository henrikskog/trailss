import React from 'react';
import './Landing.scss';
import Form from '../user/trip/form/Form';

export default function Landing() {
  return (
    <div className="landing">
        <div className='top-bar'>

        </div>
        <div className='content'>
            <div className='left-bar'><Form></Form></div>
            <div className='right-bar'></div>
        </div>
    </div>
  );
}
