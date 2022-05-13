import React from 'react';
import "./CityName.scss";

export default function CityName(props) {
    return(
        <section className="selected-city medium-font">
            { props.content }
        </section>
    )
}