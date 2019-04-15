import React, { Component } from 'react';
import './App.css';
import {HashRouter, Router} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Router />
        <Router />
      </HashRouter>
    );
  }
}

export default App;
