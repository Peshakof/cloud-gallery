import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import FittedImage from 'react-fitted-image';

const ImageContainer = (props) => {

    React.useEffect(()=>{
        // console.log(props.image)
        if(props.search) {
            console.log(props.image)
        }
    },[props.image]) 
    return (
        <li className="item">
            {
                !props.search ? (
                    <LazyLoad height={180} offset={-50}>
                        <FittedImage
                            fit="contain"
                            loader={<img src="https://i.pinimg.com/originals/dc/aa/7a/dcaa7a90d62a19169bfa46c1c6625696.gif" />}
                            onLoad={(...args) => console.log(...args)}
                            onError={(...args) => console.log(...args)}
                            src={props.image.imageUrl}
                        />
                        <Link to={`/image-info/${props.image._id}`} />
                    </LazyLoad>
                ) : (
                        <LazyLoad height={180} offset={-50}>
                            <FittedImage
                                fit="contain"
                                loader={<img src="https://i.pinimg.com/originals/dc/aa/7a/dcaa7a90d62a19169bfa46c1c6625696.gif" />}
                                onLoad={(...args) => console.log(...args)}
                                onError={(...args) => console.log(...args)}
                                src={props.image.urls.regular}
                            />
                            <Link to="#" />
                        </LazyLoad>

                    )
            }
        </li>
    )
}

export default ImageContainer;