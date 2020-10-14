import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

const ImageContainer = (props) => {
    return (
        <li className="item">
            <LazyLoad height={180} offset={-50}>
                <img key={props.image._id} src={props.image.imageUrl} alt="image" />
            </LazyLoad>
            <Link to={`/image-info/${props.image._id}`} >
                view image
            </Link>
        </li>
    )
}

export default ImageContainer;