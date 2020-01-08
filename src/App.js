import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navigation from './components/navigation';
import Carousel from './components/image carousel';
import ImgForm from './components/add-img-form';
import Dashboard from './components/dashboard';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Carousel} />
          <Route path="/upload-image" exact component={ImgForm} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
