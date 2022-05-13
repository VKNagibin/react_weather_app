import React from 'react';
import "./Date.scss";

export default function Date(props) {
    return(
        <h3 className={`date-string ${props.fontSize}`}>
            {props.date}
        </h3>   
    )
}
