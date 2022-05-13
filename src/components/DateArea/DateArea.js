import React from 'react';
import "./DateArea.scss";
import Time from '../Time/Time';
import Date from '../Date/Date';



export default function DateArea(props) {
    return(
        <div className="date-area">
            <Date date={props.date} fontSize={"medium-font"}/>
            <Time time={props.time} fontSize={"large-font"}/>
        </div>
    )
}
