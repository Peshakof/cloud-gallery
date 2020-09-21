import React from 'react';

const ImageContainer = (props) => {

    return (
        <li className="item">
            <img src={props.image} alt="image" />
        </li>
    )
}

export default ImageContainer;