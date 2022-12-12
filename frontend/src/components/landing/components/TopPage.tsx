import React, { useState } from 'react';
import './TopPage.scss';
import Shortform from './ShortForm';
import Viewer from './Globe';
import { Button } from '@mantine/core';

export default function TopPage() {
  return (
    <div className="toppage page">
       <div className='toppage-left'>
        <div className='toppage-left-title'>
          <h1>For a More Sustainable Planet</h1>
        </div>
        <div className='toppage-left-button'>
          <Button className='button'>Register</Button>
        </div>
       </div>
       <div className='toppage-right'>
        <Viewer />
       </div>
       <div className='toppage-shortform'>
          <Shortform />
       </div>
    </div>
  );
}
