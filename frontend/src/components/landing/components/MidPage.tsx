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
          What is it about?
        </div>
        <div className='landing-midpage-left-text'>
            Are you concerned about climate change? So are we. Greenhouse gas emissions from burning fossil fuels and deforestation continue driving global warming at a dangerously fast rate. If we want to avoid the most devastating effects of climate change, we have to act right now. This is why we created trailss, an easy-to-use carbon footprint tracker which allows you to reduce your emissions wherever you go. Try trailss yourself for free and see the difference you can make!
          <br />

          <br />
          <Button type="submit" mt="sm" className='button'>
            Learn More
          </Button>
        </div>
      </div>      
    </div>
  );
}