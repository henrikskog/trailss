import React from 'react';
import './CalculationResultsBar.scss';
import { formatMeters, formatSeconds, formatGrams } from './utils';

interface Props {
  distance: number;
  duration: number;
  emissions: number;
}

const CalculationResultsBar: React.FC<Props> = ({ distance, duration, emissions }) => {
  return (
    <div className="calculations-bar">
      <div className="upper">
        <div>
          <p className="subheader">Length</p>
          <div>
            <p>{formatMeters(distance)}</p>
          </div>
        </div>
        <div>
          <p className="subheader">Duration</p>
          <div>
            <p>{formatSeconds(duration)}</p>
          </div>
        </div>
        <div>
          <p className="subheader">Emissions</p>
          <div>
            <p>{formatGrams(emissions)} CO2</p>
          </div>
        </div>
      </div>
      <div className="underline">
        <p>Calculations from Your Trip</p>
      </div>
    </div>
  );
};

export default CalculationResultsBar;
