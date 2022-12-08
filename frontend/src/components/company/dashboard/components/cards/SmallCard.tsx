import React from "react";
import './SmallCard.scss'

type Stat = {
    emisions?: number,
    title?: number,
    subtitle?: string
}

const MainCard: React.FC<Stat> = (props) => {
    const statEntry = Object.entries(props);

    return (
        <div className='small-card-container'>
            <h3>{props.title}</h3>
            <h2>{props.emisions}</h2>
            <p>{props.subtitle}</p>
        </div>
    );
}
export default MainCard;