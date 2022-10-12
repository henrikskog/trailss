import React, { useState } from 'react';
import './Home.scss';
import Form from '../user/trip/form/Form';
import { Link } from "react-router-dom";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="landing">
        <div className='top-bar'>

        </div>
        <div className='content'>
            <div className='left-bar'><Form></Form></div>
            <div className='right-bar'>
              <h2>Map goes here</h2>
              <Link to="/">Go back</Link>
            </div>
        </div>
    </div>
  );
}
