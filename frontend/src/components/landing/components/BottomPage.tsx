import React, { useState } from 'react';
import './BottomPage.scss';
import Card from './Card';
import checkIcon from '../media/check_icon.svg';
import userIcon from '../media/user_icon.svg';
import statsIcon from '../media/stats_icon.svg';
export default function BottomPage() {
    return (
        <div className="bottompage page">
            <div className='landing-bottom-title'>
                <div>Easy as...</div>
            </div>
            <div className='landing-bottom-cards'>
                <div className='cards'>
                    <Card svg={userIcon}  title='Create an account' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eligendi saepe nulla sed ' />
                </div>
                <div className='cards center'>
                    <Card svg={statsIcon} title='Keep track' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eligendi saepe nulla sed cum off' />
                </div>
                <div className='cards'>
                    <Card svg={checkIcon} title='Check your footprint' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eligendi saepe nulla sed ' />
                </div>
            </div>
        </div>
    );
}
