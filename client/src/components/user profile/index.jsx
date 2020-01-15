import React from 'react';
import './style.scss';

const UserProfile = () => {


  return(
    <div className="user-profile">
      <header>
        <h2>username goes here</h2>
        <div className="avatar-container">
          <img src="https://i.pinimg.com/280x280_RS/49/5c/e3/495ce3a774d9fd12704c07368c41a664.jpg" alt=""/>
        </div>
      </header>
    </div>
  )
}

export default UserProfile;