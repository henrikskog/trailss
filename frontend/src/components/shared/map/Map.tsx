import React, { useState, useContext } from 'react';
import './Map.scss';

import Form from '../../user/trip/form/Form';
import { Link } from "react-router-dom";
import TripInfoContext from '../../../context/TripInfoContext';

export default function Map() {
  const [count, setCount] = useState(0);
  return (
    <div className='container'>
      <div className='overlay-left'>
        <Form />
      </div>
      <div className='background-map'>
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAH9Y7vp01ga61UJzlSSZHzjqrrqb6zwRY
            &q=Albalat+de+la+Ribera,Maria+mulet+21">
        </iframe>
      </div>
      
    </div>
    
  );
}
