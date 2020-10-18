import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

const ImageContainer = (props) => {
    return (
        <li className="item">
            <LazyLoad height={180} offset={-50}>
                <img key={props.image._id} src={props.image.imageUrl} alt="image" />
                <Link to={`/image-info/${props.image._id}`} >
                    view image
                </Link>
            </LazyLoad>

        </li>
    )
}

export default ImageContainer;