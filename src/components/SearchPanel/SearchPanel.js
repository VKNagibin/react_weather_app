import React from 'react';
import "./SearchPanel.scss";
import Button from '../Button/Button'

export default function SearchPanel(props) {
    return(
        <section className="search-panel">
            <input className="search-input" id="search-input" type="text" onInput={props.inputHandler} value={props.value} placeholder="Your city name..." />
            <Button clickHandler={props.click} content={'Find'}/>
        </section>

    )
}
