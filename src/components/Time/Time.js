import React from 'react';
import "./Time.scss";

export default function Time(props) {
    return(
        <p className={`time-string ${props.fontSize}`}>
                {props.time}
        </p>
    )
}
