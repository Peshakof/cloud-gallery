import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navigation from './components/navigation';
import Carousel from './components/image carousel';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Carousel />
      </Router>
    </div>
  );
}

export default App;
