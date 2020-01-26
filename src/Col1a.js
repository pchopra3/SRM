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

class Col1a extends React.Component{

  constructor(props){
    super(props);
    this.state={
      currentUserName: "",
      authUser: null
    }
  }


componentDidMount(){
  firebase.auth().onAuthStateChanged((user) => {
     console.log('Auth state changed');
     console.log('user: ',user);
     if (user) {
       this.setState({authUser: user},()=>{
         console.log("component did mount");
         var that = this;
         var emailCurrentUser = user.email;
         const {projectsForForm}=this.state;
         firebase.database().ref().child('Users').once("value").then(function(snapshot){
           snapshot.forEach(function(childSnapshot) {
           var name = childSnapshot.val().Name;
           var email = childSnapshot.val().Email;
           if(email==emailCurrentUser)
           that.setState({
             currentUserName: name
           })
         })
       })
       });
     } else {
       this.setState({authUser: null},()=>{
         console.log("component did mount");
         var that = this;
         var mAuth = firebase.auth();
         var emailCurrentUser;
         if (mAuth.currentUser!=null)
         emailCurrentUser = mAuth.currentUser.email;
         const {projectsForForm}=this.state;
         firebase.database().ref().child('Users').once("value").then(function(snapshot){
           snapshot.forEach(function(childSnapshot) {
           var name = childSnapshot.val().Name;
           var email = childSnapshot.val().Email;
           if(email==emailCurrentUser)
           that.setState({
             currentUserName: name
           })
         })
       })
       });
     }
   });
}


  render(){
    return(
    <div className = "flex-container " id="imageAndNameID">
    <img src = {Avatar} id="avatar" style={{"margin":"14px 0"}}  />
    <div id = "name">{this.state.currentUserName}</div>
    </div>
   )
  }

}

export default Col1a;
