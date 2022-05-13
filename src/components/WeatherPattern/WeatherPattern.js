import React from 'react';
import "./WeatherPattern.scss";
import Image from "../Image/Image";

export default function WeatherPattern(props) {
    return(
        <div className={ props.className }>
            <h4 className="weather-pattern__description">
                { props.pattern }
                <Image className={ "weather-pattern__image" } 
                    src={ props.src }
                    alt={ props.alt }/>
            </h4>
        </div>
    )
}
