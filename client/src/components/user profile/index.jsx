import React, { Component } from 'react';
import userService from '../../services/user-service';
import imageService from '../../services/image-service';
import Cookies from 'js-cookie';
import './style.scss';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userProfile: {},
      userInfo: JSON.parse(Cookies.get('user')),
      imagesCount: 0
    }
  }

  componentDidMount(){
    userService.getUserImages(this.state.userInfo._id)
      .then(res => {
        this.setState({imagesCount: res.data.length})
      })
    userService.getUserInfo(this.state.userInfo._id)
      .then(res => {
        this.setState({userProfile: res.data})
      })
  }

  render(){
    return(
      <div className="user-profile">
        <header>
          <h2>{this.state.userInfo.username}</h2>
          <div className="avatar-container">
            <img src={this.state.userProfile.avatar} alt="avatar"/>
          </div>
          <div>
            <p>images count: {this.state.imagesCount}</p>
          </div>
        </header>
      </div>
    )
  }
}

export default UserProfile;