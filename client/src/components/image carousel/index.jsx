import React, { useState, useEffect, Fragment, useRef } from 'react';
import { Gallery, GalleryImage } from "react-gesture-gallery";
import { Link } from 'react-router-dom';
import { Link as Arrow } from 'react-scroll';
import imageService from '../../services/image-service';
import FontAwesome from 'react-fontawesome';
import ImageContainer from '../image-container';
import axios from 'axios';
import './style.scss'

const Carousel = () => {

  const [index, setIndex] = useState(0);
  const [imgArr, setImgArr] = useState({});
  const [searched, setSearched] = useState('');
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const galleryRef = useRef();

  useEffect(() => {
    // const timer = setInterval(() => {
    //   if (index === 8) {
    //     setIndex(0);
    //   } else {
    //     setIndex(prev => prev + 1);
    //   }
    // }, 3000);
    // return () => clearInterval(timer);
  }, [response]);

  const images = [
    {
      category: 'Pets',
      link: 'dashboard/pet',
      src: "https://images.unsplash.com/photo-1512873897628-eea05c840147?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    },
    {
      category: 'Places',
      link: 'dashboard/places',
      src: "https://images.unsplash.com/photo-1584011958148-eeba80e718e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    },
    {
      category: 'Cars',
      link: 'dashboard/cars',
      src: "https://images.unsplash.com/photo-1514867644123-6385d58d3cd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    },
    {
      category: 'Landscapes',
      link: 'dashboard/landscape',
      src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    },
    {
      category: 'Houses',
      link: 'dashboard/houses',
      src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
    },
    {
      category: 'Sport',
      link: 'dashboard/sport',
      src: "https://images.unsplash.com/photo-1519119012096-c145def61801?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    },
    {
      category: 'People',
      link: 'dashboard/people',
      src: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    },
    {
      category: 'Nature',
      link: 'dashboard/nature',
      src: "https://images.unsplash.com/photo-1588392382834-a891154bca4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    },
    {
      category: 'Technology',
      link: 'dashboard/high-tech',
      src: "https://images.unsplash.com/photo-1561883088-039e53143d73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    }

  ];

  const x = () => (
    imageService.getAll()
      .then(res => {
        setImgArr(res.data);
        console.log(imgArr)
      })
  );

  const search = (e) => {
    e.preventDefault();
    axios.get(`https://api.unsplash.com/search/photos?per_page=50&query=${searched}&client_id=GOUxunGBMZ12OehgeMQvurmOYPbR9xhQHt00qtO1JJY`)
      .then(res => {
        setResponse(res.data.results)
        setIsLoading(true)
        window.scrollTo(0, galleryRef.current.offsetTop)
      })
  }

  const handleChange = (e) => {
    setSearched(e.target.value);
  }

  return (
    <div className="page-container">
      <div id="top"></div>
      <div className="carousel">
        <section className="search-box">
          <form onSubmit={search}>
            <input className="search-input" type="text" onChange={handleChange} />
            <input className="search-input" type="submit" value="Search"/>
            <FontAwesome className="fas fa-search" />
          </form>
        </section>
        <header>
          <h2>Choose a topic</h2>
        </header>
        <Gallery
          className="carousel-content"
          index={index}
          enableControls={true}
          enableIndicators={true}
          onRequestChange={i => {
            setIndex(i);
          }}
        >
          {images.map(image => (
            <React.Fragment key={image.src}>
              <Link to={image.link} onClick={x} className="topic-link">
                <GalleryImage objectFit="contain" src={image.src} className="gallery-image">
                </GalleryImage>
              </Link>
              <h5>{image.category}</h5>
            </React.Fragment>
          ))}
        </Gallery>
      </div>
      <section className="gallery" id="gallery" ref={galleryRef}>
        <ul className="masonry">
          <Fragment>
            {
              response.map(item => {
                return (
                  <ImageContainer key={item.id} image={item} search={true} />
                )
              })
            }
          </Fragment>
        </ul>
        <Arrow id="toTop" to="top" smooth={true} duration={1000}><FontAwesome name="arrow-up" className="fas fa-chevron-up"></FontAwesome></Arrow>
      </section>
    </div>
  )
}

export default Carousel