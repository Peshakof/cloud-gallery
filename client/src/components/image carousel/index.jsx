import React from 'react';
import { Gallery, GalleryImage } from "react-gesture-gallery";
import { Link } from 'react-router-dom'
import './style.scss'

const Carousel = () => {

  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (index === 4) {
        setIndex(0);
      } else {
        setIndex(prev => prev + 1);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [index]);

  const images = [
    "https://images.unsplash.com/photo-1513780043732-614405263485?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1524642603405-a7c76bcde7eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1524491496106-f413c4d2917b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    "url(../../public/viber_изображение_2020-01-03_20-09-01.jpg)",
    "https://images.unsplash.com/photo-1550640964-4775934de4af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
  ];

  return (
    <div className="carousel">
      <header>
        <h2>choose a topic</h2>
      </header>
      <Gallery
        className="carousel-content"
        index={index}
        onRequestChange={i => {
          setIndex(i);
        }}
      >
        {images.map(image => (
          <React.Fragment >
            <GalleryImage objectFit="contain" key={image} src={image} />
            <Link className="topic-link">link to topic goes here</Link>
          </React.Fragment>
        ))}
      </Gallery>
    </div>
  )
}

export default Carousel