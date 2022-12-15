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
                    <Card svg={userIcon}  title='Create an account' description='Get your free account by registering in just a few clicks!' />
                </div>
                <div className='cards center'>
                    <Card svg={statsIcon} title='Keep track' description='Gain full knowledge about all your statistics, histories and more at any time!' />
                </div>
                <div className='cards'>
                    <Card svg={checkIcon} title='Check your footprint' description='See the possibilites you have to check and reduce your carbon footprint regularly!' />
                </div>
            </div>
        </div>
    );
}
