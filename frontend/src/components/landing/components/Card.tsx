import React, { useRef, useState } from 'react'
import { FaGithubSquare } from 'react-icons/fa';

import './Card.scss';

interface Props {
    title?: string,
    description?: string,
    svg: any
}

function Card(props: Props) {
    return (
        <div className='landing-card'>
            <div className='landing-bottom-icon'>
                <img src={props.svg}></img>
            </div>
            <div className="landing-card-image" /* style={{ background: `url(${props.post.thumbnail})` }} */>
                <h3 className="landing-card-title">
                        {props.title}
                </h3>
            </div>

            <div className="landing-card-body">
                <p className="landing-card-text">{props.description}</p>
            </div>
        </div>
    )
}

export default Card;