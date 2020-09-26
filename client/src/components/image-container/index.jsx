import React from 'react';
import { Link } from 'react-router-dom';

const ImageContainer = (props) => {
    return (
        <li className="item">
            <img key={props.image._id} src={props.image.imageUrl} alt="image" />
            <Link to={`/image-info/${props.image._id}`} >
                view image
            </Link>    
        </li>
    )
}

export default ImageContainer;