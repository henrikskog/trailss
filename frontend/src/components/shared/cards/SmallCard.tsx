import React from "react";
import './SmallCard.scss'

type Stat = {
    number?: string,
    title?: string,
    subtitle?: string
}

const MainCard: React.FC<Stat> = (props) => {

    return (
        <div className='small-card-container'>
            <h4>{props.title}</h4>
            <h2>{props.number}</h2>
            <p>{props.subtitle}</p>
        </div>
    );
}
export default MainCard;