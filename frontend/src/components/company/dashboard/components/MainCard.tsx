import React, { useState } from 'react';
import './MainCard.scss';


import {
    TablerIcon,
    IconHome2,
    IconCalendarStats,
    IconUser,
    IconLogout,
    IconSwitchHorizontal,
    IconCar,
    IconPlaneDeparture,
    IconCertificate,
    IconChartBar,
} from '@tabler/icons';

type MyProps = {
    title?: string,
    mainStat?: number,
    change?: number,
    description?: string
};

const MainCard: React.FC<MyProps> = (props) => {
    const percentage = props.change?.toFixed(1) + "%";
    const propEntries = Object.entries(props);

    return (
        <div className="box big-box">
            <div className='card-content'>
                {propEntries.map(([key, value]) => {
                    let element;
                    if (key == "title") {
                        element = <h1>{value}</h1>;
                    } else if (key == "mainStat") {
                        element = <h2>{value}</h2>
                    } else if (key == "change") {
                        element = <h3>{percentage}</h3>
                    } else if (key == "description") {
                        element = <p>{value}</p>
                    }
                    return element
                })}
            
            </div>
        </div>
    );
}
export default MainCard;

