import React, { useState } from 'react';
import './TopPage.scss';
import Form from '../../user/trip/form/Form';
import Viewer from './Globe';

export default function TopPage() {
  return (
    <div className="toppage page">
       <div className='toppage-left'>
        <Form calculateRoute={() => {}}/>
       </div>
       <div className='toppage-right'>
        <Viewer />
       </div>
    </div>
  );
}
