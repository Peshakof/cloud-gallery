import React, { Fragment } from 'react';
import imageService from '../../services/image-service';
import ImageContainer from '../image-container';

const Category = (props) => {
  const [images, setImages] = React.useState([]);
  const [isEmpty, setIsEmpty] = React.useState(false);

  React.useEffect(() => {
    let filteredImages;
    imageService.getAll()
      .then(res => {
        const currentCategory = props.category;
        filteredImages = res.data.filter(image => image.category === currentCategory);
        if(!filteredImages.length) {
          setIsEmpty(true)
        }
        setImages(filteredImages)
      })
  }, [props.category])

  return (
    <section className="gallery">
      <ul className="masonry">
        {
          !isEmpty ? (
            <Fragment>
              {
                images.map(image => {
                  return (
                    <ImageContainer key={image._id} image={image} />
                  )
                })
              }
            </Fragment>
          ) : <h3>No results for this category!</h3>
        }

      </ul>
    </section>
  )
}

export default Category;