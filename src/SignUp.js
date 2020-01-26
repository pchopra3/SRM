import React from 'react';
import Login from './Login';
import routing from "./index.js";
import './SignUp.css';
import ReactDOM from 'react-dom';
import {fire} from './config/fire';
import {BrowserRouter as Router, Route, Link , Switch} from 'react-router-dom';
import firebase from 'firebase';


class SignUp extends React.Component{

  constructor(props){
    super(props);
    this.state={
      companies: [],
      companyID: 0
    }
    this.signUp=this.signUp.bind(this);
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

  signUp() {
      const email = document.querySelector('#email').value;
      console.log(email);
      var isEmailInDatabase = false;
      const companyName = document.getElementById('selectDropDown').value;
      console.log(companyName);
      var that = this;
      firebase.database().ref().child("Companies").once("value").then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
          if(companyName==childSnapshot.val().CompanyName){
            that.setState({
              companyID: childSnapshot.val().CompanyID
            })
          }
      })
    }).then(()=>{
      firebase.database().ref().child('Users').once('value').then(function(snapshot){
        console.log(snapshot);
        snapshot.forEach(function(childSnapshot){
          console.log(childSnapshot.val().Email);
          if(email==childSnapshot.val().Email&&that.state.companyID==childSnapshot.val().CompanyID)isEmailInDatabase=true;
        });
      }).then(()=>{
        if(isEmailInDatabase==true){
        const password = document.querySelector('#password').value;
        const password2 = document.querySelector('#confirm-password').value;
        const name = document.querySelector('#nameDiv').value;
        if(password==password2){
            var firebaseRef = firebase.database().ref();
            console.log(email);
            firebaseRef.child("Users").orderByChild("Email").equalTo(email).once("value").then(function(snapshot){
            console.log(snapshot);
             snapshot.forEach(function(childSnapshot) {
               console.log(childSnapshot);
                childSnapshot.ref.update({
                  Email: childSnapshot.val().Email,
                  Password: password,
                  Name: childSnapshot.val().Name,
                  Role: childSnapshot.val().Role,
                  CompanyID: childSnapshot.val().CompanyID
                }).then(()=>{
                    fire.auth().createUserWithEmailAndPassword(email, password)
                      .then((u) => {
                        console.log('Successfully Signed Up');
                        alert("Successfully signed up");
                  })
                })
              })
            })
          .catch((err) => {
            console.log('Error: ' + err.toString());
          })
        }
        else{
          alert("Passwords do not match");
        }
        }
        else{
        alert("Your email does not exist in the database. Please ask your admin to add you to it.")
        }
      });
    })
  }

    render() {
      return (

        <div class = "container col-md-6 col-md-offset-3" id = "page1" >
          <div id="loginText">
              Sign Up
          </div>
          <div id = "organization">Organization</div>
          <select class="form-control" id = "selectDropDown">
          {this.state.companies.map((company) => {
            return (
             <option value={company}>{company}</option>
          )}
          )}
          </select>
          <div id="nameDiv">
            <div id="em" style={{textAlign: 'left'}}>Name</div>
            <input class= "form-control" id="nameTextInput" placeholder="Enter Name.." type="text"/>
            </div>
          <div id="e1">
            <div id="em1" style={{textAlign: 'left'}}>Email</div>
            <input class= "form-control" id="email" placeholder="Enter Email.." type="text"/>
            </div>

          <div id="passwordDiv">
            <div id = "pa" style={{textAlign: 'left'}}>Password</div>
            <input class = "form-control" id="password" placeholder="Enter Password.." type="text"/>
          </div>
          <div id="p1">
            <div id = "pa1" style={{textAlign: 'left'}}>Confirm Password</div>
            <input class = "form-control" id="confirm-password" placeholder="Enter Password.." type="text"/>
          </div>

          <div id = "bn" style = {{textAlign: 'center'}}>
          <button class="btn" style={{margin: '10px'}} onClick={this.signUp} id="b">Sign Up</button>
           <div id="li">
          <Link id = "l" to="/login">Already have an account? Log in</Link>
          </div>
          </div>
         </div>
      )
    }
}

export default SignUp;
