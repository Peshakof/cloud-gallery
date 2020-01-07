import React from 'react';
import { NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './style.scss';

const Navigation = () => {


  return (
    <div className="nav-wrap">
      <section className="title">
        <h1>cloud gallery <span>change theme<button type="button"></button></span></h1>
      </section>
      <input type="checkbox" id="toggle-nav" className="toggle-nav"></input>
      <header className="site-header">
        <label for="toggle-nav" className="toggle-nav-btn">
          <FontAwesome className="fas fa-bars"><span>menu</span></FontAwesome>
          <FontAwesome className="fas fa-times"><span>close</span></FontAwesome>
        </label>
        <nav className="site-nav">
          <ul>
            <li><NavLink to="/dashboard" className="link">dashboard</NavLink></li>
            <li><NavLink to="/user-profile" className="link">user profile</NavLink></li>
            <li><NavLink to="/upload-image" className="link">upload image</NavLink></li>
            <li><NavLink to="/login" className="link">login</NavLink></li>
            <li><NavLink to="/logout" className="link">logout</NavLink></li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Navigation;