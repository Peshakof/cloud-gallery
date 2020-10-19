import React, { Component, Fragment } from 'react';
import userService from '../../services/user-service';
import ImageContainer from '../image-container';
import Cookies from 'js-cookie';
import './style.scss';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userProfile: {},
      userInfo: JSON.parse(Cookies.get('user')),
      imagesCount: 0,
      images: []
    }
  }

  componentDidMount() {
    userService.getUserImages(this.state.userInfo._id)
      .then(res => {
        this.setState({ imagesCount: res.data.length });
        this.setState({ images: res.data });
      })
    userService.getUserInfo(this.state.userInfo._id)
      .then(res => {
        this.setState({ userProfile: res.data })
      })
  }

  render() {
    const images = this.state.images;

    return (
      <div className="user-profile">
        <header>
          <div className="avatar-container">
            <img src={this.state.userProfile.avatar} alt="avatar" />
          </div>
          <h3>user: {this.state.userInfo.username}</h3>
          <p>images count: {this.state.imagesCount}</p>
        </header>
        <section className="gallery">
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
        </section>
      </div>
    )
  }
}

export default UserProfile;