import React from 'react';
import './CalculationsBar.scss';


export default function Form() {

    return (
        <div className='calculations-bar'>
            <div className='upper'>
                <div>
                    <p>Length</p>
                </div>
                <div>
                    <p>Emissions</p>
                </div>
            </div>
            <div className='underline'>
                <p>Calculations from Your Trip</p>
            </div>
        </div>
    );
}
