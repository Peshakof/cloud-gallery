import React, { Component, Fragment } from 'react';
import imageService from '../../services/image-service';
import ImageContainer from '../image-container';

class Category extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [],
      isEmpty: true
    };
  }

  componentDidMount() {
    const category = window.location.pathname.split('/')[2]
    imageService.getAll()
      .then(res => {
        const response = res.data;
        const searchedImages = response.filter(image => image.category === category);
        response.forEach(element => {
          if(element.category === category) {
            this.setState({isEmpty: false})
          }
        });
        this.setState({ images: searchedImages });
      })
  }

  render() {

    return (
      <section className="gallery">
        <ul className="masonry">
          {
            !this.state.isEmpty ? (
              <Fragment>
                {
                  this.state.images.map(image => {
                    return (
                      <ImageContainer image={image} />
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
}

export default Category;