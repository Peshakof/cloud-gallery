import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import imageService from '../../services/image-service';
import FontAwesome from 'react-fontawesome';
import ImageContainer from '../image-container';
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
    <section className="gallery">
      <ul className="masonry">
        <Fragment>
          {
            images.map(image => {
              return (
                <ImageContainer image={image} />
              )
            })
          }
        </Fragment>
      </ul>
      <Link id="toTop" to="#"><FontAwesome className="fas fa-chevron-up"></FontAwesome></Link>
    </section>
  )

}

export default Dashboard;