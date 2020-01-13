import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navigation from './components/navigation';
import Carousel from './components/image carousel';
import ImgForm from './components/add-img-form';
import Dashboard from './components/dashboard';
import RegisterPage from './components/register page';
import LoginPage from './components/login page';
import ProtectedRoute from './components/protected-route';
import Logout from './components/logout';

import UserContext from './components/contexts/user-context';
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';

import './App.css';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const readCookie = () => {
    const authCookie = Cookies.get('token');
    if(authCookie) {
      setLoggedIn(true);
    }
  }

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{loggedIn, setLoggedIn}}>
        <Router>
          <Navigation />
          <Switch>
            <Route path="/" exact component={Carousel} />
            <ProtectedRoute loggedIn={loggedIn} path="/upload-image" exact component={ImgForm} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/signup" exact component={RegisterPage}/>
            <Route path="/signin" exact component={LoginPage}/>
            <Route path="/logout" exact component={Logout}/>
          </Switch>
          <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
          />
        </Router>
      </UserContext.Provider>

    </div>
  );
}

export default App;