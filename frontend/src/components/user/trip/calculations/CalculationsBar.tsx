import React from 'react';
import './CalculationsBar.scss';


export default function Form() {

    return (
        <div className='calculations-bar'>
            <div className='upper'>
                <div>
                    <p className='subheader'>Length</p>
                    <div>
                        <p >374km</p>
                    </div>
                </div>
                <div>
                    <p className='subheader'>Emissions</p>
                    <div>
                        <p>2070g</p>
                    </div>
                </div>
            </div>
            <div className='underline'>
                <p>Calculations from Your Trip</p>
            </div>
        </div>
    );
}
