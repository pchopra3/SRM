import React from 'react';
import {fire} from './config/fire';
import firebase from 'firebase';
import ReactDOM from 'react-dom';
import Home from './Home';
import './Users.css';
import EditPencil from './image.png';
import TrashImage from './trashImage.png';
import Col2a from './Col2a';
import Col1a from './Col1a';


import {BrowserRouter as Router, Route, Link , Switch} from 'react-router-dom';

class Users extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      users:[],
      userName:"",
      userEmail:"",
      oldUsername:"",
      emailToDelete:"",
      usernameToDelete:"",
      companyID2:"",
      currentUserName:"",
      authUser: null
    };
    this.renderUsersList=this.renderUsersList.bind(this);
    this.editUser = this.editUser.bind(this);
    this.createEditedUsersList=this.createEditedUsersList.bind(this);
    this.deleteUser=this.deleteUser.bind(this);
    this.addUser=this.addUser.bind(this);
  }

  componentDidMount(){
    var user = firebase.auth().currentUser;
    console.log(user);
    var ref = firebase.database().ref();
    var adminRole;
    var value;
    var userRole;
    var mAuth = firebase.auth();
    var emailCurrentUser;
    var isEmailInDatabase = false;
    console.log("here");
    if(mAuth.currentUser!=null)
    emailCurrentUser = mAuth.currentUser.email;
    console.log(emailCurrentUser);
    var that = this;
    firebase.database().ref().child('Users').once("value").then(function(snapshot){
      snapshot.forEach(function(childSnapshot) {
      var name = childSnapshot.val().Name;
      var cid = childSnapshot.val().CompanyID;
      var email = childSnapshot.val().Email;
      console.log(email);
      console.log(emailCurrentUser);
      if(email==emailCurrentUser)
      that.setState({
        currentUserName: name
       })
     })
   })
  }

  reopenUserTable(name, email){
    document.getElementById('usersListDiv').style.display = "none";
    document.getElementById('editUserTableID1').style.display="block";
    console.log(name);
    this.setState({
      userName: name,
      userEmail: email,
      oldUsername: name
    },()=>{
      console.log(this.state);
      document.getElementById('usernameBox1').value=this.state.userName;
      document.getElementById('userEmail1').value = this.state.userEmail;
    });
  }

  editUser(){
     console.log("see");
     var db = firebase.database();
     var query = db.ref("Users").orderByChild("Name").equalTo(this.state.oldUsername);
     query.once("child_added",(snapshot) => {
      console.log(this.state);
      snapshot.ref.update({Name: `${this.state.userName}`, Email:`${this.state.userEmail}`});
    }).then(() => {
      console.log("in then");
      this.createEditedUsersList();
      if(document.getElementById('usersListDiv').style.display==="none")
      document.getElementById('usersListDiv').style.display="block";
      document.getElementById('editUserTableID1').style.display="none";
    });
   }

   createEditedUsersList(){
     const users = [];
     var that = this;
     firebase.database().ref().child('Users').once("value").then(function(snapshot){
       if(snapshot.exists()){
       snapshot.forEach(function(childSnapshot) {
       var name = childSnapshot.val().Name;
       console.log(name);
       var email = childSnapshot.val().Email;
       console.log(childSnapshot.val().CompanyID);
       if(childSnapshot.val().CompanyID==that.state.companyID2){
       users.push({"userName": name, "userEmail": email});
       that.setState({users: users},
         ()=>{
           console.log(that.state.users);
         }
       );
       }
       });
     }
     else{
       that.setState({users: []})
     }
     });
     console.log(this.state);
   }

  addUser(){
    console.log("inside");
    const name = document.getElementById('userNameInput').value;
    const email = document.getElementById('userEmailInput').value;
    var firebaseRef = firebase.database().ref();
    var index = email.indexOf('@');
    var emailType;
    firebase.database().ref().child('Options').once("value").then(function(snapshot){
      snapshot.forEach(function(childSnapshot) {
      emailType = childSnapshot.val().EmailType;
    })
  }).then(()=>{
      if(emailType=="@karmacircles.com"){
        if(email.substr(index,email.length)=="@karmacircles.com"){
      firebaseRef.child("Users").push().set({
          CompanyID: 1,
          Email: email,
          Name: name,
          Password: "",
          Role: "User"
      }).then(() => {
        console.log("in then");
        document.getElementById('newUserTableID').style.display="none";
        this.renderUsersList();
        document.getElementById('usersListDiv').style.display = "block";
      });
    }
    else{
      alert("Please use an '@karmacircles.com' email or change the email type to any email on options");
    }
     }
     else{
       firebaseRef.child("Users").push().set({
           CompanyID: 1,
           Email: email,
           Name: name,
           Password: "",
           Role: "User"
       }).then(() => {
         console.log("in then");
         document.getElementById('newUserTableID').style.display="none";
         this.renderUsersList();
         document.getElementById('usersListDiv').style.display = "block";
       });
     }
    })
    console.log("outside");
  }


  deleteUser(username, email){
    this.setState({
      usernameToDelete: username,
      emailToDelete: email
    }, ()=>{
    var db = firebase.database();
    var query = db.ref("Users").orderByChild("Email").equalTo(this.state.emailToDelete);
    console.log(query);
    query.once("child_added",(snapshot) => {
     console.log("here");
     snapshot.ref.remove();
     console.log("here1");
   }).then(() => {
     console.log("in then");
     this.createEditedUsersList();
     if(document.getElementById('usersListDiv').style.display==="none")
     document.getElementById('usersListDiv').style.display="block";
   }).catch((error) => {
     console.log(error);
   }).then(()=>{
     var that = this;
     firebase.database().ref().child('Projects').once("value").then(function(snapshot){
       var s="";
       var s1="";
       snapshot.forEach(function(childSnapshot) {
        s="";
        s1="";
       console.log(that.state.emailToDelete);
       console.log(that.state.usernameToDelete);
       var projectMemberNames = childSnapshot.val().ProjectMembersNames;
       var projectMemberEmails = childSnapshot.val().ProjectMembers;
       var projectMemberNamesArray = projectMemberNames.split(',');
       var projectMemberEmailsArray=projectMemberEmails.split(',');
       console.log(projectMemberNamesArray);
       console.log(projectMemberEmailsArray);
       for(var i = 0; i<projectMemberNamesArray.length; i++){
         console.log(i);
         console.log(projectMemberNamesArray[i]);
         if(projectMemberNamesArray[i]==that.state.usernameToDelete){
           projectMemberNamesArray.splice(i, 1);
           for(var j = 0; j<projectMemberNamesArray.length-1; j++){
             s=s+projectMemberNamesArray[j]+",";
           }
           s = s+projectMemberNamesArray[projectMemberNamesArray.length-1];
           console.log(s);
           projectMemberEmailsArray.splice(i, 1);
           for(var j = 0; j<projectMemberEmailsArray.length-1; j++){
             s1 = s1+projectMemberEmailsArray[j]+",";
           }
           s1 = s1+projectMemberEmailsArray[projectMemberEmailsArray.length-1];
           console.log(s1);
             childSnapshot.ref.update({ProjectMembers: s1, ProjectMembersNames: s});
         }

       }

       });

     });
   });
}
)
}


  renderUsersList(){
    const users = [];
    var that = this;
    firebase.database().ref().child('Users').once("value").then(function(snapshot){
      snapshot.forEach(function(childSnapshot) {
      var name = childSnapshot.val().Name;
      console.log(name);
      var email = childSnapshot.val().Email;
      if(childSnapshot.val().CompanyID==that.state.companyID2){
      users.push({"userName": name, "userEmail": email});
      that.setState({users: users});
    }
      });
    });
  }

  componentWillMount(){
    const {users} = this.state;
    var mAuth = firebase.auth();
    var emailCurrentUser;
    if (mAuth.currentUser!=null)
    emailCurrentUser = mAuth.currentUser.email;
    var that = this;
    firebase.database().ref().child('Users').once("value").then(function(snapshot){
      snapshot.forEach(function(childSnapshot) {
      var email = childSnapshot.val().Email;
      var cid = childSnapshot.val().CompanyID;
      if(email==emailCurrentUser){
      that.setState({
        companyID2: cid
      },()=>{
          console.log(that.state.companyID2);
      })
    }
    })

  }).then(()=>{
      firebase.database().ref().child('Users').once("value").then(function(snapshot){
        snapshot.forEach(function(childSnapshot) {
        var name = childSnapshot.val().Name;
        var email = childSnapshot.val().Email;
        console.log(childSnapshot.val().CompanyID);
        console.log(that.state.companyID2);
        if(childSnapshot.val().CompanyID==that.state.companyID2){
        console.log("ppppppppppppppppppppppppppppppp");
        users.push({"userName": name, "userEmail": email});
        that.setState({users: users});
          }
        });
      });
    })
  }

  openNewUserTable(){
    console.log(2);
    console.log(document.getElementById('usersListDiv').style.display);

    document.getElementById('usersListDiv').style.display="none";

    if(document.getElementById("editUserTableID1").style.display==="block")
    document.getElementById("editUserTableID1").style.display="none";
    document.getElementById("newUserTableID").style.display = "block";
  }

  closeFormNewProject(){
    document.getElementById('newUserTableID').style.display="none";
    document.getElementById('usersListDiv').style.display="block";
  }

  closeFormEditProject(){
    document.getElementById('editUserTableID1').style.display="none";
    document.getElementById('usersListDiv').style.display="block";
  }

  logout(){
      fire.auth().signOut();
  }


  render() {

    var user = firebase.auth().currentUser;
    var ref = firebase.database().ref();
    var adminRole;
    var value;
    var userRole;
    const {projects} = this.state;
    return(
      <div className="container-fluid my-container">
        <div className="row my-row1">
            <div className="col-md-2 my-col1a">
            <Col1a/>
            </div>
            <div className="col-md-10 my-col1b" id="column2row1">
            </div>
        </div>
        <div className="row my-row2">
            <div className="col-md-2 my-col2a">
              <Col2a/>
            </div>
            <div className="col-md-10 my-col2b">
            <button className = "btn" id = "NewUserID" style={{textAlign: 'center'}} onClick={this.openNewUserTable}>New User</button>


            <div id="newUserTableID" class="" >


              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">New User</h4>
                  </div>
                  <div class="modal-body">
                  <div>Name</div>
                  <div>
                    <input class="form-control" id ="userNameInput"></input>
                   </div>
                   <div>Email</div>
                   <input class="form-control" id ="userEmailInput"></input>
                  </div>
                  <div class="modal-footer">

                  <button className="btn" id="userSubmitButton" style={{textAlign: 'center'}} onClick={this.addUser}>Add</button>

                  <button className="btn" onClick={this.closeFormNewProject}>Close Form</button>

                  </div>
              </div>
            </div>
            </div>

            <div id = "newUserTableID2">
              <div className = "container" id = "newUserTable">
                <div>New User</div>
                <div>Name</div>
                <input class="form-control" id ="userNameInput"></input>
                <div>Email</div>
                <input class="form-control" id ="userEmailInput"></input>
                <div>
                <button className="btn" id="userSubmitButton" style={{textAlign: 'center'}} onClick={this.addUser}>Add</button>
                </div>
                <div>
                <button className="btn" onClick={this.closeFormNewProject}>Close Form</button>
                </div>
            </div>
        </div>
        <div id = "usersListDiv">
        {this.state.users.map((user) => {
          console.log(user)
          return (
            <div id = "usernameBox">
            {user.userName}
            <img src={EditPencil} id="editPencil"
            onClick={()=>this.reopenUserTable(user.userName, user.userEmail)}/>
            <img src={TrashImage} id="trashImage"
            onClick={()=>this.deleteUser(user.userName, user.userEmail)}/>
            <div id = "userEmailBox">
            {user.userEmail}
            </div>
            </div>
        )}
        )}
        </div>

        <div id="editUserTableID1" class="" >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Edit User</h4>
              </div>
              <div class="modal-body">
              <div>Name</div>
              <div>
               <input class="form-control" type="text" id ="usernameBox1" onChange={(e) => {
                 this.setState({
                   userName: e.target.value,
                 })
               }}></input>
               </div>
               <div>Email</div>
               <div>
               <input class="form-control" type="text" id ="userEmail1" onChange={(e) => {
                 this.setState({
                   userEmail: e.target.value,
                 })
               }}></input>
               </div>
               </div>
              <div class="modal-footer">
              <button className="btn" id="userEditButton" onClick={this.editUser}>Submit</button>
              <button className="btn" onClick={this.closeFormEditProject}>Close Form</button>
              </div>
          </div>
        </div>
        </div>

        <div id = "editUserTableID2">
          <div className = "container">
            <div>Edit User</div>
            <div>Name
             <input type="text" id ="usernameBox1" onChange={(e) => {
               this.setState({
                 userName: e.target.value,
               })
             }}></input>
             </div>
             <div>Email
             <input type="text" id ="userEmail1" onChange={(e) => {
               this.setState({
                 userEmail: e.target.value,
               })
             }}></input>
            </div>
            <div>

            </div>
          <div>
          <button className="btn" id="userEditButton" onClick={this.editUser}>Submit</button>
          </div>
          <div>
          <button className="btn" onClick={this.closeFormEditProject}>Close Form</button>
          </div>
        </div>
        </div>
        </div>
        </div>
        </div>

    )
  }
}

export default Users;
