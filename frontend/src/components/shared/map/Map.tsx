import React, { useState } from 'react';
import './Map.scss';
import Form from '../../user/trip/form/Form';
import CalculationsBar from "../../user/trip/calculations/CalculationsBar";
import { Link } from "react-router-dom";

export default function Map() {
  const [count, setCount] = useState(0);
  return (
    <div className='map-container'>
      <div className='overlay-left form'>
        <Form />
      </div>
      <div className='overlay-calculations calculations'>
        <CalculationsBar />
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
