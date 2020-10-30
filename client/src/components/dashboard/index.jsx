import React, { useState, useEffect, Fragment } from 'react';
import imageService from '../../services/image-service';
import FontAwesome from 'react-fontawesome';
import ImageContainer from '../image-container';
import { Link } from 'react-scroll';
import axios from 'axios';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './style.scss';

const Dashboard = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState('');
  const [response, setResponse] = useState([]);

  useEffect(() => {
    imageService.getAll()
      .then(res => {
        setImages(res.data);
        setIsLoading(true)
      })
  }, [response,searched])

  const search = (e) => { 
    e.preventDefault();
    axios.get(`https://api.unsplash.com/search/photos?page=1&query=${searched}&client_id=GOUxunGBMZ12OehgeMQvurmOYPbR9xhQHt00qtO1JJY`)
      .then(res => {
        setResponse(res.data.results)

      })
  }

  const handleChange = (e) => {
    setSearched(e.target.value);
  }

  return (
    <section className="gallery" id="gallery">
      <div id="top"></div>
      <section className="search-box">
        <form onSubmit={search}>
          <input type="text" onChange={handleChange}/>
          <input type="submit" />
        </form>
      </section>
      <ul className="masonry">
        <Fragment>
          {
            isLoading ? (
              !response.length ? (
                images.map(image => {
                  return (
                    <ImageContainer key={image._id} image={image} search={false}/>
                  )
                })
              ) : (
                response.map(item => {
                  return (
                    <ImageContainer key={item.id} image={item} search={true}/>
                  )
                })
              )
            ) : <div><img src="https://i.pinimg.com/originals/dc/aa/7a/dcaa7a90d62a19169bfa46c1c6625696.gif" alt="loading" /></div>
          }
        </Fragment>
      </ul>
      <Link id="toTop" to="top" smooth={true} duration={1000}><FontAwesome name="arrow-up" className="fas fa-chevron-up"></FontAwesome></Link>
    </section>
  )

}

export default Dashboard;