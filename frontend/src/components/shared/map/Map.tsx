import React, { useState } from 'react';
import './Map.scss';
import Form from '../../user/trip/form/Form';
import { Link } from "react-router-dom";

export default function Map() {
  const [count, setCount] = useState(0);
  return (
    <iframe
      width="600"
      height="450"
      loading="lazy"
      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAH9Y7vp01ga61UJzlSSZHzjqrrqb6zwRY
        &q=Albalat+de+la+Ribera,Maria+mulet+21">
    </iframe>
  );
}
