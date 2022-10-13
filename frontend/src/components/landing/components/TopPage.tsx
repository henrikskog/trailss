import React, { useState } from 'react';
import './TopPage.scss';
import Form from '../../user/trip/form/Form';
import Globe from './Globe';

export default function BottomPage() {
  return (
    <div className="toppage page">
       <div className='toppage-left'>
        <Form />
       </div>
       <div className='toppage-right'>
       </div>
    </div>
  );
}
