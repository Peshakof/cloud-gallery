import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import FittedImage from 'react-fitted-image';

const ImageContainer = (props) => {
    return (
        <li className="item">
            <LazyLoad height={180} offset={-50}>
                <FittedImage
                    fit="contain"
                    loader={<img src="https://i.pinimg.com/originals/dc/aa/7a/dcaa7a90d62a19169bfa46c1c6625696.gif"/>}
                    onLoad={(...args) => console.log(...args)}
                    onError={(...args) => console.log(...args)}
                    src={props.image.imageUrl}
                />
                {/* <img key={props.image._id} src={props.image.imageUrl} alt="image" /> */}
                <Link to={`/image-info/${props.image._id}`} />
            </LazyLoad>
        </li>
    )
}

export default ImageContainer;