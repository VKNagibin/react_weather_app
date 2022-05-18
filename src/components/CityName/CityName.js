import React from 'react';
import "./CityName.scss";

export default function CityName(props) {
    return(
        <section className={`city-name ${props.className}`}>
            { props.content }
        </section>
    )
}