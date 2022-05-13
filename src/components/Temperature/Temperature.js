import React from 'react';
import "./Temperature.scss";

export default function Temperature(props) {
    return(
        <div className={ props.containerClassName }>
            <h3 className={ props.contentClassName }> 
                { props.content }
                <img className={ props.imageClassName } src={props.image} alt={ props.alt }/>
            </h3>
        </div>
    )
}