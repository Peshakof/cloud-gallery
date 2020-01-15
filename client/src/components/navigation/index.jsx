import React, {Fragment, useEffect, useState, useContext} from 'react';
import { UserContext } from '../contexts/user-context';
import Cookies from 'js-cookie';

import { NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './style.scss';

const Navigation = ({ toggleTheme }) => {
  const [auth, setAuth] = useContext(UserContext);
  const [isLogged, setIslogged] = useState(false);
  useEffect(()=>{
    setIslogged(auth);
  },[auth])

  return (
    <div className="nav-wrap">
      <section className="title">
        <h1>cloud gallery <span>change theme<button onClick={toggleTheme} type="button"></button></span></h1>
      </section>
      <input type="checkbox" id="toggle-nav" className="toggle-nav"></input>
      <header className="site-header">
        <label htmlFor="toggle-nav" className="toggle-nav-btn">
          <FontAwesome className="fas fa-bars"><span>menu</span></FontAwesome>
          <FontAwesome className="fas fa-times"><span>close</span></FontAwesome>
        </label>
        <nav className="site-nav">
          <ul>
            <li><NavLink to="/" className="link">home</NavLink></li>
            <li><NavLink to="/dashboard" className="link">dashboard</NavLink></li>
            {
               isLogged ? 
              <Fragment>
                <li><NavLink to="/user-profile" className="link">user profile</NavLink></li>
                <li><NavLink to="/upload-image" className="link">upload image</NavLink></li>
                <li><NavLink to="/logout" className="link">logout</NavLink></li>
              </Fragment> : 
              <Fragment>
                <li><NavLink to="/signup" className="link">signup</NavLink></li>
                <li><NavLink to="/signin" className="link">login</NavLink></li>
              </Fragment>
            } 
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Navigation;