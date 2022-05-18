import React from 'react';
import "./Temperature.scss";

export default function Temperature(props) {
    return(
        <div className={ `max-temperature ${props.containerClassName}` }>
            <h3 className={'max-temperature__content'}> 
                { props.content }
                <img className={ props.imageClassName } src={props.image} alt={ props.alt }/>
            </h3>
        </div>
    )
}