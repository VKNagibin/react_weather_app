import React from 'react';
import "./Button.scss";

export default function Button(props) {
    return(
        <button className="search-btn small-font" onClick={props.clickHandler}>{props.content}</button>
    )
}
