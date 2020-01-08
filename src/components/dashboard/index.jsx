import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './style.scss';

const Dashboard = () => {
  return (
    <section className="gallery">

      <ul className="masonry">
        <li className="item">
          <img src="https://i.pinimg.com/236x/a3/2d/51/a32d51ea2f2f5c28db0d07edfacc8973.jpg" alt="" />
          <p>title goes here</p>
        </li>
        <li className="item"><img src="https://i.pinimg.com/236x/87/15/51/871551e85dad19deeac033d42a2e6b67.jpg" alt="" /></li>
        <li className="item"><img src="https://i.pinimg.com/236x/d9/b0/e1/d9b0e1558d9e5b219e41f8916ab4ccaa.jpg" alt="" /></li>
        <li className="item"><img src="https://i.pinimg.com/236x/5b/27/22/5b27228bc347b780846fc6e3bb340e80.jpg" alt="" /></li>
        <li className="item"><img src="https://i.pinimg.com/236x/23/30/9a/23309a081902fdd8d58abdff812838f7.jpg" alt="" /></li>
        <li className="item"><img src="https://i.pinimg.com/236x/4e/65/79/4e6579a9749d5601529968c683193c1c.jpg" alt="" /></li>
        <li className="item"><img src="https://i.pinimg.com/564x/52/cb/a8/52cba89966d9f8b156e45f0412782001.jpg" alt="" /></li>
        <li className="item"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScgxHsN1-zhn9_Y41nb0oxJhkBDDCMxQJauA6863xeBcQEn-51&s" alt="" /></li>
        <li className="item"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGf5xRQMk3uhAU2MYRZFQY86YT6E8aV6vjOdEagMu2u1xO8MsJdA&s" alt="" /></li>
        <li className="item"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3yoXgVSlo61JvtOJpti-kD3WeSEaMdQ3-DemStzE5-hInEG3p&s" alt="" /></li>
        <li className="item"><img src="https://i.pinimg.com/236x/98/0a/cf/980acf54c24063d7d8a97c735c439cd8.jpg" alt="" /></li>
        <li className="item"><img src="https://i.pinimg.com/236x/1c/e6/52/1ce652521e99ee715f405aeffcec36c5.jpg" alt="" /></li>
      </ul>

      <Link id="toTop" to="#"><FontAwesome className="fas fa-chevron-up"></FontAwesome></Link>
    </section>
  )
}

export default Dashboard;