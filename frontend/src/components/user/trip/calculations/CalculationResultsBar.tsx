import React from 'react';
import './CalculationResultsBar.scss';

interface Props {
    distance: string;
    emissions: number | undefined;
}

const CalculationResultsBar: React.FC<Props> = ({distance, emissions}) => {
    return (
        <div className='calculations-bar'>
            <div className='upper'>
                <div>
                    <p className='subheader'>Length</p>
                    <div>
                        <p >{distance}km</p>
                    </div>
                </div>
                <div>
                    <p className='subheader'>Emissions</p>
                    <div>
                        <p>{emissions}g</p>
                    </div>
                </div>
            </div>
            <div className='underline'>
                <p>Calculations from Your Trip</p>
            </div>
        </div>
    );
}

export default CalculationResultsBar;