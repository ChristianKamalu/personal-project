import React, { Component } from 'react';
import './App.css';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Login from './components/Login/Login';
import Listings from './components/Listings/Listings';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/listings' component={Listings}/>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
