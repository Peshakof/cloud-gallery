import React, {Fragment, useEffect, useState, useContext, useRef} from 'react';
import { UserContext } from '../contexts/user-context';
import Cookies from 'js-cookie';

import { NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './style.scss';

const Navigation = ({ toggleTheme, appRef }) => {
  const [auth, setAuth] = useContext(UserContext);
  const [isLogged, setIslogged] = useState(false);
  const navBtnRef = useRef();
  const navRef = useRef();
  useEffect(()=>{
    setIslogged(auth);
  },[auth])
  
  const blur = () => {
    if(navBtnRef.current.checked) {
      appRef.current.style.filter = 'blur(5px)';
    } else {
      appRef.current.style.filter = 'none';
    }
  }

  return (
    <div className="nav-wrap" ref={navRef}>
      <section className="title">
        <h1>cloud gallery <span>change theme<button onClick={toggleTheme} type="button"></button></span></h1>
      </section>
      <input type="checkbox" id="toggle-nav" className="toggle-nav" onClick={blur} ref={navBtnRef}></input>
      <header className="site-header">
        <label htmlFor="toggle-nav" className="toggle-nav-btn">
          <FontAwesome className="fas fa-bars"/>
          <FontAwesome className="fas fa-times"/>
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