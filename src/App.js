import React, { Component } from 'react'

import Login from './Login.js';
import Home from './Home.js';
import { BrowserRouter as Router, Route, Link , Switch} from 'react-router-dom';
import SignUp from './SignUp.js';
import {fire} from './config/fire';
class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      user: null,
      authUser: null
    };
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();

  }

  componentWillMount(){

  }

  componentWillUnmount(){

  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    })
  }

  render() {

    return (
      <div className="App">
        { this.state.user ? ( <Home /> ) : ( <Login /> ) }
      </div>
    );
  }
}

export default App;
