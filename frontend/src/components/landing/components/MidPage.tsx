import React, { useState } from 'react';
import './MidPage.scss';
import Snippet from '../media/environment.svg';
import Camino from './Camino';
import { Button } from '@mantine/core';

export default function MidPage() {

  return (
    <div className='midpage page'>
      <div className='landing-midpage-right'>
          <Camino />
      </div>
      <div className='landing-midpage-left'>
        <div className='landing-midpage-left-title'>
          Lorem Ipsum
        </div>
        <div className='landing-midpage-left-text'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus nam debitis nihil reprehenderit deserunt, aut qui. Dicta quas earum esse dolorum voluptates. Dolore qui rem sunt earum quia ea porro?
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.

          <br />

          <br />
          <Button type="submit" mt="sm">
            Learn More
          </Button>
        </div>
      </div>      
    </div>
  );
}