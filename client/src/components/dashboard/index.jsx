import React, { Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import imageService from '../../services/image-service';
import FontAwesome from 'react-fontawesome';
import ImageContainer from '../image-container';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './style.scss';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      images: []
    }
  }

  componentDidMount(){
    imageService.getAll()
    .then(res => {
      this.setState({images: res.data});
    })
  }
  
  render() {
    const images = this.state.images;
    
    return (
      <section className="gallery">
        <ul className="masonry">
          <Fragment>
            {
              images.map(image => {
                console.log(image.imageUrl)
                return (
                  <ImageContainer image={image.imageUrl} />
                )
              })
            }
          </Fragment>  
        </ul>
        <Link id="toTop" to="#"><FontAwesome className="fas fa-chevron-up"></FontAwesome></Link>
      </section>
    )
  }
}

export default Dashboard;