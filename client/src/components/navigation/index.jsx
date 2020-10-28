import React, { Fragment, useEffect, useState, useContext, useRef } from 'react';
import { UserContext } from '../contexts/user-context';
import anime from 'animejs/lib/anime.es.js';
import { NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './style.scss';

const Navigation = ({ toggleTheme, appRef }) => {
  const [auth, setAuth] = useContext(UserContext);
  const [isLogged, setIslogged] = useState(false);
  const [clicked, setClicked] = useState(false);
  const innerNavRef = useRef();
  const navBtnRef = useRef();
  const navRef = useRef();

  useEffect(() => {
    setIslogged(auth);
  }, [auth])

  const animate = () => {
    if(!clicked) {
      innerNavRef.current.style.display = 'block';
      setClicked(true);
      anime.timeline({
        easing: 'linear',
        duration: '100'
      })
      .add({
        targets: '.inner-nav',
        opacity: [0, 1]
      })
      .add({
        targets: '.inner',
        opacity: [0, 1],
        translateX: 0,
        delay: (el, i) => 100 * i
      })
    } else {
      innerNavRef.current.style.display = 'none';
      setClicked(false);
      anime.timeline({
        easing: 'linear',
        duration: '0'
      })
      .add({
        targets: '.inner-nav',
        opacity: [1, 0]
      })
      .add({
        targets: '.inner',
        opacity: [1, 0],
        translateX: -20
      })
    }
  }

  const blur = () => {
    if (window.innerWidth <= 650) {
      if (navBtnRef.current.checked) {
        appRef.current.style.filter = 'blur(5px)';
      } else {
        appRef.current.style.filter = 'none';
      }
    }
  }

  const closeMenu = () => {
    navBtnRef.current.checked = false;
  }

  return (
    <div className="nav-wrap" ref={navRef}>
      <section className="title">
        <h1>Cloud gallery</h1>
        <span>Toggle theme<button onClick={toggleTheme} type="button"></button></span>
      </section>
      <input type="checkbox" id="toggle-nav" className="toggle-nav" onClick={blur} ref={navBtnRef}></input>
      <header className="site-header">
        <label htmlFor="toggle-nav" className="toggle-nav-btn">
          <FontAwesome name="hamburger" className="fas fa-bars" />
          <FontAwesome name="x" className="fas fa-times" />
        </label>
        <nav className="site-nav">
          <ul>
            <li><NavLink to="/" className="link">Home</NavLink></li>
            <li>
              <NavLink onClick={animate} to="#" className="link">Categories
              <FontAwesome name="arrow-down" className="fas fa-chevron-down"></FontAwesome>
              </NavLink>
              <nav className="inner-nav" ref={innerNavRef}>
                <ul>
                  <li><NavLink to="/dashboard" className="link inner" onClick={closeMenu}>All Categories</NavLink></li>
                  <li><NavLink to="/dashboard/pet" className="link inner" onClick={closeMenu}>Pets</NavLink></li>
                  <li><NavLink to="/dashboard/sport" className="link inner" onClick={closeMenu}>Sport</NavLink></li>
                  <li><NavLink to="/dashboard/people" className="link inner" onClick={closeMenu}>People</NavLink></li>
                  <li><NavLink to="/dashboard/nature" className="link inner" onClick={closeMenu}>Nature</NavLink></li>
                  <li><NavLink to="/dashboard/houses" className="link inner" onClick={closeMenu}>Houses</NavLink></li>
                  <li><NavLink to="/dashboard/places" className="link inner" onClick={closeMenu}>Places</NavLink></li>
                  <li><NavLink to="/dashboard/landscape" className="link inner" onClick={closeMenu}>Landscapes</NavLink></li>
                  <li><NavLink to="/dashboard/high-tech" className="link inner" onClick={closeMenu}>High-tech</NavLink></li>
                  <li><NavLink to="/dashboard/cars" className="link inner" onClick={closeMenu}>Cars</NavLink></li>
                </ul>
              </nav>
            </li>

            {
              isLogged ?
                <Fragment>
                  <li><NavLink to="/user-profile" className="link">User profile</NavLink></li>
                  <li><NavLink to="/upload-image" className="link">Upload image</NavLink></li>
                  <li><NavLink to="/logout" className="link">Logout</NavLink></li>
                </Fragment> :
                <Fragment>
                  <li><NavLink to="/signup" className="link">Sign up</NavLink></li>
                  <li><NavLink to="/signin" className="link">Log in</NavLink></li>
                </Fragment>
            }
          </ul>
        </nav>
      </header>
    </div >
  )
}

export default Navigation;