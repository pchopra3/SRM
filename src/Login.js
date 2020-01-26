import React from 'react';
import {fire} from './config/fire';
import './Login.css';
//import SignUp from './SignUp';
import {Link} from 'react-router-dom';
import SignUp from './SignUp';
import firebase from 'firebase';
//import DashboardContainer from './containers/Dashboard'

import { Route, Switch } from 'react-router-dom';
//import{Router, Route} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
//import { base} from './config/fire';

class Login extends React.Component{

  constructor(props){
    super(props);
    this.state={
      companies: []
    }
    this.login=this.login.bind(this);
  }

    login() {
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      var isEmailInDatabase = false;
      firebase.database().ref().child('Users').once('value').then(function(snapshot){
        console.log(snapshot);
        snapshot.forEach(function(childSnapshot){
          console.log(childSnapshot.val().Email);
          if(email==childSnapshot.val().Email)isEmailInDatabase=true;
        });
      }).then(()=>{
        if(isEmailInDatabase==true){
          fire.auth().signInWithEmailAndPassword(email, password)
            .then((u) => {
              console.log('Successfully Logged In');
              window.location = "/";
            })
            .catch((err) => {
              console.log('Error: ' + err.toString());
            })
        }
        else{
        alert("Your email does not exist in the database. Please ask your admin to add you to it.")
        }
      });
    }

    componentWillMount(){
      const {companies} = this.state;
      firebase.database().ref().child("Companies").once("value").then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
        companies.push(
          childSnapshot.val().CompanyName
        );
      })
    }).then(()=>{
      this.setState({
        companies: companies
      })
      console.log(companies);
    })
    }

    render() {
      return (
        <div className = "container col-md-6 col-md-offset-3" id = "page" >
          <div id="loginText">
              Log In
          </div>
          <div id = "organization">Organization</div>
          <select className="form-control" id = "selectDropDown">
          {this.state.companies.map((company) => {
            return (
             <option value={company}>{company}</option>
          )}
          )}
          </select>
          <div id="e">
            <div id="em" style={{textAlign: 'left'}}>Email</div>
            <input className= "form-control" id="email" placeholder="Enter Email.." type="text"/>
            </div>

          <div id="password1">
            <div id = "pa" style={{textAlign: 'left'}}>Password</div>
            <input className = "form-control" id="password" placeholder="Enter Password.." type="text"/>
          </div>
          <div id = "bn" style = {{textAlign: 'center'}}>
          <button className="btn" style={{margin: '10px'}} onClick={this.login} id="b">Login</button>
           <div id="li">
          <Link id = "l" to="/signup">Don't have an account? Sign Up</Link>
          </div>
          </div>
         </div>
      )
    }
}

export default Login;
