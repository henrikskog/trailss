import React from 'react';
import './MainCard.scss';



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
        <div className='card-content'>
            {propEntries.map(([key, value], i) => {
                let element;
                if (key == "title") {
                    element = <h1 key={i}>{value}</h1>;
                } else if (key == "mainStat") {
                    element = <h2 key={i}>{value}</h2>
                } else if (key == "change") {
                    element = <h3 key={i}>{percentage}</h3>
                } else if (key == "description") {
                    element = <p key={i}>{value}</p>
                }
                return element
            })}
        </div>
    );
}
export default MainCard;

