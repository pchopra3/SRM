import React from 'react';
import {fire} from './config/fire';
import firebase from 'firebase';
import ReactDOM from 'react-dom';
import Home from './Home';
import EditPencil from './image.png';
import {BrowserRouter as Router, Route, Link , Switch} from 'react-router-dom';
import './Options.css';
import Col2a from './Col2a';
import Col1a from './Col1a';

class Options extends React.Component{

  constructor(){
    super();
    this.state={
      size:""
    }
    this.setStateFunction = this.setStateFunction.bind(this);
  }

  logout(){
      fire.auth().signOut();
  }

  componentWillMount(){
    var firebaseRef = firebase.database().ref();
    var option;
    firebaseRef.child("Options").once("value").then(function(snapshot) {
      if(snapshot.exists()){
        snapshot.forEach(function(childSnapshot) {
        option = childSnapshot.val().EmailType;
        });
        }
      }).then(()=>{
        console.log(option);
        if(option=="@karmacircles.com"){
        this.setState({
          size: "Any email address ending with @karmacircles.com"
          })
          console.log(this.state.size);
        }
        else if(option=="anything"){
          this.setState({
            size: "Any email"
          })
          console.log(this.state.size);
        }
      });
  }

  componentDidMount(){
    var user = firebase.auth().currentUser;
    var ref = firebase.database().ref();
    var adminRole;
    var value;
    var userRole;
    var mAuth = firebase.auth();
    var emailCurrentUser;

  }

  setStateFunction(){
   if (document.getElementById('specificEmailID').checked==true) {
       console.log("specEmail is True");
       this.setState({size: document.getElementById('specificEmailID').value}, () => console.log(this.state.size));
       var firebaseRef = firebase.database().ref();
       var mAuth = firebase.auth();
       if (mAuth.currentUser!=null)
       var email = mAuth.currentUser.email;
       console.log(email);
       var companyIDlocal;
       var value;
       firebaseRef.child("Users").orderByChild("Email").equalTo(email).once("value", function(snapshot) {
         snapshot.forEach(function(childSnapshot) {
               value = childSnapshot.val();
               console.log(value);
               companyIDlocal = value.CompanyID;
               console.log(value.CompanyID);
               console.log(companyIDlocal);
           });
         });
       firebaseRef.child("Options").once("value").then(function(snapshot) {
           if(!snapshot.exists()){
             firebaseRef.child("Options").push().set({
                "UserID": "admin1",
                "EmailType":"@karmacircles.com",
                "companyID": companyIDlocal
             });
           }
           else{
              console.log("Here");
               console.log(snapshot.ref);
               snapshot.forEach(function(childSnapshot) {
               childSnapshot.ref.update({
                          "UserID": "admin3",
                          "EmailType": "@karmacircles.com",
                          "companyID": companyIDlocal
                });
              });
            }
         });
       }
   else if(document.getElementById('anyEmailID').checked==true){
     console.log("anyEmail is true");
     this.setState({size: document.getElementById('anyEmailID').value}, () => console.log(this.state.size));
     var firebaseRef = firebase.database().ref();
     var mAuth = firebase.auth();
     if (mAuth.currentUser!=null)
     var email = mAuth.currentUser.email;
     console.log(email);
     var companyIDlocal;
     var value;
     firebaseRef.child("Users").orderByChild("Email").equalTo(email).once("value", function(snapshot) {
       snapshot.forEach(function(childSnapshot) {
             value = childSnapshot.val();
             console.log(value);
             companyIDlocal = value.CompanyID;
             console.log(companyIDlocal);
         });
       });
       firebaseRef.child("Options").once("value").then(function(snapshot) {
           if(!snapshot.exists()){
             firebaseRef.child("Options").push().set({
                "UserID": "admin1",
                "EmailType":"anything",
                "companyID": companyIDlocal
             });
           }
           else{
              console.log("Here");
              console.log(companyIDlocal);
               console.log(snapshot.ref);
               snapshot.forEach(function(childSnapshot) {
               childSnapshot.ref.update({
                          "UserID": "admin3",
                          "EmailType": "anything",
                          "companyID": companyIDlocal
                });
              });
            }
         });
   }
  }

  render() {
    return(
      <div className="container-fluid my-container">
        <div className="row my-row1">
            <div className="col-md-2 my-col1a">
              <Col1a/>
            </div>
            <div className = "col-md-10 my-col1b">
            </div>
            </div>
        <div className="row my-row2">
            <div className="col-md-2 my-col2a">
                    <Col2a/>
            </div>
            <div className="col-md-10 my-col2b">
            <button className = "btn" id = "NewProjectID" style={{textAlign: 'center'}}>New Project</button>
      <form>
      <div id="optionsForm">
      <p>Which email address can be used for signing up?</p>
      <ul>
        <li>
          <label>
            <input
              type="radio"
              value="Any email address ending with @karmacircles.com"
              name="optionsForm"
              id="specificEmailID"
              checked={((this.state.size ===("Any email address ending with @karmacircles.com")))}
              onClick={this.setStateFunction}
            />
            Any email address ending with @karmacircles.com
          </label>
         </li>

         <li>
          <label>
            <input
              type="radio"
              value="Any email"
              name="optionsForm"
              id="anyEmailID"
              checked={(this.state.size ==="Any email")}
              onClick={this.setStateFunction}
            />
            Any email
           </label>
           </li>
      </ul>
      </div>
    </form>
        </div>
        </div>
        </div>

    )
  }
}

export default Options;
