import React, { useState } from 'react';
import './Landing.scss';
import Form from '../user/trip/form/Form';
import { Link } from "react-router-dom";

export default function Landing() {
  const [count, setCount] = useState(0);

  return (
    <div className="landing">
        <div className='top-bar'>

        </div>
        <div className='content'>
            <div className='left-bar'><Form></Form></div>
            <div className='right-bar'>
              <h2>This is simply a state test sir</h2>
              <Link to="/normal">Go to normal view sir</Link>
              
            </div>
        </div>
    </div>
  );
}
