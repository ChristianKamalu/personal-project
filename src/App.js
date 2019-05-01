import React, { Component } from 'react';
import './App.css';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Login from './components/Login/Login';
import Main from './components/Main/Main';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path='/Login' component={Login}/>
          <Route path='/' component={Main}/>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
