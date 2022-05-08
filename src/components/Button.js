import React from 'react';
import "./Button.scss";

export default function Button(props) {
    return(
        <button className="search-btn" onClick={props.clickHandler}>{props.content}</button>
    )
}
