import React, { useState, useEffect, Fragment } from 'react';
import imageService from '../../services/image-service';
import FontAwesome from 'react-fontawesome';
import ImageContainer from '../image-container';
import {Link} from 'react-scroll';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './style.scss';

const Dashboard = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    imageService.getAll()
      .then(res => {
        setImages( res.data );
      })
  }, [])

  return (
    <section className="gallery" id="gallery">
      <div id="top"></div>
      <ul className="masonry">
        <Fragment>
          {
            images.map(image => {
              return (
                <ImageContainer key={image._id} image={image} />
              )
            })
          }
        </Fragment>
      </ul>
      <Link id="toTop" to="top" smooth={true} duration={1000}><FontAwesome name="arrow-up" className="fas fa-chevron-up"></FontAwesome></Link>
    </section>
  )

}

export default Dashboard;