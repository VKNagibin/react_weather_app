import React from 'react';
import "./Image.scss";

export default function Image(props) {
    return(
        <img  className={ props.className }
              src={ props.src }
              alt={ props.alt } />
    )
}
