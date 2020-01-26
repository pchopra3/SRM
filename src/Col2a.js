import React from 'react';
//import fire from './config/fire';
import {fire} from './config/fire';
import './Home.css';
import Avatar from './image 20.8.png';
import firebase from 'firebase';
import EditPencil from './image.png';
import ReactDOM from 'react-dom';
import Options from './Options';
import Users from './Users';
import CrossImage from './crossImage.png';
import Flag from './flag.png';
import Home from './Home';
import { Component } from 'react';
import TimeRangeSlider from 'react-time-range-slider';
import moment from "moment";
import TimePicker from 'react-time-picker';
import './compose.css';
import {BrowserRouter as Router, Route, Link , Switch} from 'react-router-dom';

class Col2a extends React.Component{

  constructor(props){
    super(props);
    this.state={
      authUser: null
    }
  }

  logout() {
    fire.auth().signOut()
      .then((u) => {
        console.log('Successfully Logged Out');
        window.location = "./Login";
      })
      .catch((err) => {
        console.log('Error: ' + err.toString());
      })
  }

  componentDidMount(){

    firebase.auth().onAuthStateChanged((user) => {
       console.log('Auth state changed');
       console.log('user: ',user);
       if (user) {
         this.setState({authUser: user},()=>{
           if(this.state.authUser!=null)
           var user = this.state.authUser;
           else
           var user = firebase.auth().currentUser;
           console.log(this.state.authUser);
           console.log(user);
           var ref = firebase.database().ref();
           var adminRole;
           var value;
           var userRole;
           var mAuth = firebase.auth();
           var emailCurrentUser;
           if(!user.exists){
           console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
           ref.child('Users').orderByChild('Email').equalTo(user["email"]).once("value", function(snapshot) {
             snapshot.forEach(function(childSnapshot) {
                   value = childSnapshot.val();
                   adminRole = value.Role;
                   if(adminRole==='Admin'){
                     document.getElementById('manageDiv').style.display = "block";
                     console.log(document.getElementById('manageDiv').style.display);
                     document.getElementById('manageDiv').style.background = "#FFFFFF";
                   }
                   if(adminRole==='User'){
                     document.getElementById('manageDiv').style.display = "none";
                     document.getElementById('manageDiv').style.background = "#DFDFDF";
                     document.getElementById('u').style.display = "none";
                     document.getElementById('o').style.display = "none";
                     document.getElementById('p').style.display = "none";

                   }
               });
             });
           }
         });
       } else {
         this.setState({authUser: null},()=>{
           if(this.state.authUser!=null)
           var user = this.state.authUser;
           else
           var user = firebase.auth().currentUser;
           console.log(this.state.authUser);
           console.log(user);
           var ref = firebase.database().ref();
           var adminRole;
           var value;
           var userRole;
           var mAuth = firebase.auth();
           var emailCurrentUser;
           if(!user.exists){
           console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
           ref.child('Users').orderByChild('Email').equalTo(user["email"]).once("value", function(snapshot) {
             snapshot.forEach(function(childSnapshot) {
                   value = childSnapshot.val();
                   adminRole = value.Role;
                   if(adminRole==='Admin'){
                     document.getElementById('manageDiv').style.display = "block";
                     console.log(document.getElementById('manageDiv').style.display);
                     document.getElementById('manageDiv').style.background = "#FFFFFF";
                   }
                   if(adminRole==='User'){
                     document.getElementById('manageDiv').style.display = "none";
                     document.getElementById('manageDiv').style.background = "#DFDFDF";

                     document.getElementById('u').style.display = "none";
                     document.getElementById('o').style.display = "none";
                     document.getElementById('p').style.display = "none";
                     document.getElementById('projectListDiv').style.display="none";
                   }
               });
             });
           }
         });
       }
   });

    }


 render(){
  return(
    <div>
   <div id="composeButtonDiv">

     <Link to="/Compose" id="composeButtonDiv" >
      <button id="composeButton">Compose</button>
     </Link>

   <button className="btn" id="logoutButton" onClick = {this.logout}>Logout</button>
   </div>
   <div id="manageDiv" style = {{textAlign: 'center'}}>Manage</div>

   <div id="projectsLink">
   <Link id="p" to="/">Projects</Link>
   </div>
   <div id="usersLink">
   <Link id="u" to="/Users">Users</Link>
   </div>
   <div id="optionsLink">
   <Link id = "o" to="/Options">Options</Link>
   </div>
   </div>
  )
 }
}

export default Col2a;
