import React from 'react';
import "./Wind.scss";

export default function Wind(props) {
    return(
        <div className="wind">
        <h3 className="wind__heading medium-font">Wind</h3>
        <div className="wind-description">
            <h4 className="wind-direction small-font">
                { props.direction }</h4>
            <h4 className="wind-speed small-font">
                { `${props.speed} m/s`}</h4>
        </div>
    </div>
    )
}
