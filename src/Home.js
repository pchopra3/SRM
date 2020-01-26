import React from 'react';
import './Home.css';
import Avatar from './image 20.8.png';
import firebase from 'firebase';
import EditPencil from './image.png';
import ReactDOM from 'react-dom';
import Options from './Options';
import Users from './Users';
import CrossImage from './crossImage.png';
import Flag from './flag.png';
import { Component } from 'react';
import TimeRangeSlider from 'react-time-range-slider';
import moment from "moment";
import TimePicker from 'react-time-picker';
import Compose from './compose'
import DatePicker from "react-datepicker";
import {fire} from './config/fire';
import Col2a from './Col2a';
import Col1a from './Col1a';

import "react-datepicker/dist/react-datepicker.css";

import {BrowserRouter as Router, Route, Link , Switch} from 'react-router-dom';

class Home extends React.Component {

  constructor(props){
    super(props);
    var d = new Date();
    console.log(d.getYear());
    var month = d.getMonth();
    month=month+1;
    this.state = {
      projects:[],
      name2:"",
      type2:"",
      oldName:"",
      users:[],
      selectedUsers:[],
      permUsers:[],
      entries:[],
      projectsForForm:[],
      projectEntries:[],
      date:d.getDate()+"/"+month+"/"+d.getFullYear(),
      currentUserName:"",
      toTime: '00:00',
      fromTime: '00:00',
      totalHours:[],
      th: 0,
      fromDatesForDropdown:[],
      toDatesForDropdown:[],
      selected1:false,
      selected2:false,
      selected3:false,
      selected4:false,
      reports: [],
      companyID:"",
      emailOfNameSelected:"",
      column1Label:"",
      column2Label:"",
      column3Label:"",
      column4Label:"",
      column5label:"",
      fromFullDate:"",
      toFullDate:"",
      thisFullDate:"",
      day:d.getDay().toString(),
      selectedFromDate: "",
      selectedToDate:"",
      totalHoursInReport: 0,
      companyID1:"",
      fullFromDate:"",
      fullToDate:""
    };
    this.renderProjectList = this.renderProjectList.bind(this);
    this.editProject = this.editProject.bind(this);
    this.createEditedProjectList=this.createEditedProjectList.bind(this);
    this.handleChange=this.handleChange.bind(this);
    // this.renderEntryRows=this.renderEntryRows.bind(this);
  /*  this.addRowToProjectTable=this.addRowToProjectTable.bind(this);
    this.saveProjectEntry = this.saveProjectEntry.bind(this);
    this.submitReport=this.submitReport.bind(this);*/
    this.setSelected1=this.setSelected1.bind(this);
    this.setSelected2=this.setSelected2.bind(this);
    this.setSelected3=this.setSelected3.bind(this);
    this.setSelected4=this.setSelected4.bind(this);
    this.generateReport=this.generateReport.bind(this);
    this.setDay = this.setDay.bind(this);
    this.showTable=this.showTable.bind(this);
    this.closeFormEditProject=this.closeFormEditProject.bind(this);
    this.closeFormNewProject=this.closeFormNewProject.bind(this);
    this.openProjectsTable = this.openProjectsTable.bind(this);
    this.handleChange1=this.handleChange1.bind(this);
    this.closeReportsTable=this.closeReportsTable.bind(this);

  }

  setSelected1(date){
    var that = this;
    var fromDate = "";
    var month = date.getMonth();
    month = month+1;
    fromDate = date.getDate()+"/"+month+"/"+date.getFullYear();
      that.setState({
        selected1: true,
        selectedFromDate: fromDate,
        fullFromDate: date
      }, ()=>{
        console.log(that.state.selected1);
      })
  }

  setSelected2(date){
    var toDate = "";
    var month = date.getMonth();
    month = month+1;
    toDate = date.getDate()+"/"+month+"/"+date.getFullYear();

      this.setState({
        selected2: true,
        selectedToDate: toDate,
        fullToDate: date
      },()=>{
        console.log(this.state.selected2);
      })

  }

  setSelected3(){
    console.log(document.getElementById('projectnameDropdown').value);
    if(document.getElementById('projectnameDropdown').value!="Project Name"){
      this.setState({
        selected3: true
      },()=>{
        console.log(this.state.selected3);
      })
    }
    else {
      this.setState({
        selected3: false
      },()=>{
        console.log(this.state.selected3);
      })
    }
  }

  setSelected4(){
    if(document.getElementById('employeeDropdown').value!="User"){
      this.setState({
        selected4: true
      },()=>{
        console.log(this.state.selected4);
      })
    }
    else {
      this.setState({
        selected4: false
      },()=>{
        console.log(this.state.selected4);
      })
    }
  }

  /*saveProjectEntry(index, property, e){
    if(e.target.value!="Please select from below"){
    const {projectEntries}=this.state;
    if(this.state.projectEntries.length>index){
      if(property=="typeOfWork"){
        projectEntries[index].typeOfWork = e.target.value;
      }
      else if(property=="projectName"){
        projectEntries[index].projectName=e.target.value;
      }
      else if(property=="fromTime"){
        projectEntries[index].fromTime=e.target.value;
      }
      else if(property=="toTime"){
        projectEntries[index].toTime=e.target.value;
      }
      else if(property=="comments"){
        projectEntries[index].comments=e.target.value;
      }
      else if(property=="overtime"){
        console.log(projectEntries[index].overtime);
        if(projectEntries[index].overtime==false){
          projectEntries[index].overtime=true;
          e.target.style.backgroundColor = "yellow";
        }
        else if(projectEntries[index].overtime==true){
          projectEntries[index].overtime=false;
          e.target.style.backgroundColor = "white";
        }
      }
        var totalTime = 0;
        var minutesToHours = 0.0;
        var toTimeInMinutes = parseFloat(projectEntries[index].toTime.substring(0,2))*60+parseFloat(projectEntries[index].toTime.substring(3, 5));
        console.log(toTimeInMinutes);
        console.log(projectEntries[index].toTime.substring(0,2)*60);
        var fromTimeInMinutes = parseFloat(projectEntries[index].fromTime.substring(0,2))*60+parseFloat(projectEntries[index].fromTime.substring(3, 5));
        console.log(fromTimeInMinutes);
        var totalTimeInMinutes = toTimeInMinutes-fromTimeInMinutes;
        totalTime = totalTimeInMinutes/60;
        console.log(totalTime);
        //this.state.totalHours.push(totalTime);
        const {totalHours} = this.state;
        totalHours[index]=totalTime;
        console.log(index);
        console.log(totalHours[index]);
        this.setState({
          totalHours: totalHours
        }, ()=>{
          console.log(totalHours);
        })
        document.getElementById('totalHours').value = totalTime;

        console.log(this.state.totalHours);
    }
    else{
      if(property=="typeOfWork"){
      projectEntries.push({
        typeOfWork: e.target.value,
        projectName: "",
        fromTime: '00:00',
        toTime: '00:00',
        comments:"",
        overtime: false
      })
    }
      else if(property=="projectName"){
      projectEntries.push({
        typeOfWork: "",
        projectName: e.target.value,
        fromTime: '00:00',
        toTime: '00:00',
        comments:"",
        overtime: false
      })
    }
    else if(property=="fromTime"){
      projectEntries.push({
        typeOfWork: "",
        projectName: "",
        fromTime: e.target.value,
        toTime: '00:00',
        comments:"",
        overtime: false
      })
    }
    else if(property=="toTime"){
      projectEntries.push({
        typeOfWork: "",
        projectName: "",
        fromTime: '00:00',
        toTime: e.target.value,
        comments:"",
        overtime: false
     })
    }
    else if(property=="comments"){
      projectEntries.push({
        typeOfWork: "",
        projectName: "",
        fromTime: '00:00',
        toTime: '00:00',
        comments:e.target.value,
        overtime: false
      })
    }
    else if(property=="overtime"){
      projectEntries.push({
        typeOfWork: "",
        projectName: "",
        fromTime: '00:00',
        toTime: '00:00',
        comments:"",
        overtime: true
      })
      e.target.style.backgroundColor="yellow";
    }
    var totalTime = 0;
    var minutesToHours = 0.0;
    var toTimeInMinutes = parseFloat(projectEntries[projectEntries.length-1].toTime.substring(0,2))*60+parseFloat(projectEntries[projectEntries.length-1].toTime.substring(3, 5));
    console.log(projectEntries[projectEntries.length-1].toTime.substring(0,2)*60);
    console.log(toTimeInMinutes);
    var fromTimeInMinutes = parseFloat(projectEntries[projectEntries.length-1].fromTime.substring(0,2))*60+parseFloat(projectEntries[projectEntries.length-1].fromTime.substring(3, 5));
    console.log(fromTimeInMinutes);
    var totalTimeInMinutes = toTimeInMinutes-fromTimeInMinutes;
    totalTime = totalTimeInMinutes/60;
    console.log(totalTime);
    console.log(minutesToHours);
  //  this.state.totalHours[index]=totalTime;

  const {totalHours}=this.state;
  totalHours.push(totalTime);
  this.setState({
    totalHours: totalHours
  })
    document.getElementById('totalHours').value = totalTime;
    console.log(this.state.totalHours[index]);
   }
   console.log(projectEntries);
    }
  }*/

  /*addRowToProjectTable(){
    const {entries} = this.state;
    var that = this;
    entries.push({comments: "new"});
    that.setState({
      entries: entries
    })
  }*/

componentDidMount(){
  var that = this;
  const {users} = this.state;
  const {permUsers} = this.state;
  const projects = [];
  var mAuth = firebase.auth();
  var emailCurrentUser;
  if (mAuth.currentUser!=null)
  emailCurrentUser = mAuth.currentUser.email;
  const {projectsForForm}=this.state;
  firebase.database().ref().child('Users').once("value").then(function(snapshot){
    snapshot.forEach(function(childSnapshot) {
    var name = childSnapshot.val().Name;
    var email = childSnapshot.val().Email;
    var cid = childSnapshot.val().CompanyID;
    if(email==emailCurrentUser)that.setState({
      currentUserName: name,
      companyID1: cid
       })
     })
   })
   const {totalHours} = this.state;
   this.setState({
     totalHours: totalHours
   })
}

  editProject(){
     var db = firebase.database();
     var s = "";
     var s1 = "";
     console.log(this.state.permUsers.length);
     console.log(this.state.selectedUsers.length);
     for(var i = 0; i<this.state.permUsers.length; i++){
       console.log(this.state.permUsers[i].name);
       for(var j = 0; j<this.state.selectedUsers.length; j++){
         if(this.state.permUsers[i].name==this.state.selectedUsers[j].name){
           console.log(s);
           s = s+this.state.permUsers[i].email+',';
           s1=s1+this.state.permUsers[i].name+',';
         }
       }
     }
     s = s.substr(0, s.length-1);
     s1=s1.substr(0, s1.length-1);
     var query = db.ref("Projects").orderByChild("ProjectName").equalTo(this.state.oldName);
     query.once("child_added",(snapshot) => {
      snapshot.ref.update({ProjectName: `${this.state.name2}`, ProjectType: document.getElementById('typeDropDown1').value, ProjectMembers: s, CompanyID: this.state.companyID1, ProjectMembersNames: s1});
    }).then(() => {
      this.createEditedProjectList();
      if(document.getElementById('projectListDiv').style.display==="none")
      document.getElementById('projectListDiv').style.display="block";
      document.getElementById('projectsTableID1').style.display="none";
    });
   }

   handleChange(){
     document.getElementById('selectedUser').value = document.getElementById('usersSelectOption').value;
     const {selectedUsers} = this.state;
     const {users}=this.state;
     var users1;
     var i;
     var j;
     for(j = 0; j<users.length; j++){
       if(users[j].name == document.getElementById('usersSelectOption').value) i = j;
     }
     if((this.state.selectedUsers.indexOf(document.getElementById('usersSelectOption').value)) == -1){
       users.splice(i, 1);
       selectedUsers.push({name: document.getElementById('usersSelectOption').value});
     }
     this.setState({
       selectedUsers: selectedUsers,
       users: users
     })
   }

   handleChange1(){
     document.getElementById('selectedUser1').value = document.getElementById('usersSelectOption1').value;
     const {selectedUsers} = this.state;
     const {users}=this.state;
     var users1;
     var i;
     var j;
     for(j = 0; j<users.length; j++){
       if(users[j].name == document.getElementById('usersSelectOption1').value) i = j;
     }
     if((this.state.selectedUsers.indexOf(document.getElementById('usersSelectOption1').value)) == -1){
       users.splice(i, 1);
       selectedUsers.push({name: document.getElementById('usersSelectOption1').value});
     }
     this.setState({
       selectedUsers: selectedUsers,
       users: users
     })
   }

   removeUserFromProject(selectedUser){
     var i = this.state.selectedUsers.indexOf(selectedUser);
     const {users} = this.state;
     users.push({name: this.state.selectedUsers[i].name, email: this.state.selectedUsers[i].email});
     const {selectedUsers} = this.state;
     selectedUsers.splice(i,1);
      this.setState({
        users: users,
        selectedUsers: selectedUsers
      })
   }

  componentWillMount(){
    const {projects} = this.state;
    var that = this;
    var mAuth = firebase.auth();
    if (mAuth.currentUser!=null)
    var emailCurrentUser = mAuth.currentUser.email;
    const {users} = this.state;
    const {permUsers} = this.state;
    var that = this;
    var that = this;
    let {projectsForForm}=this.state;

    firebase.database().ref().child('Users').once("value").then(function(snapshot){
      snapshot.forEach(function(childSnapshot) {
      var name = childSnapshot.val().Name;
      var email = childSnapshot.val().Email;
      var cid = childSnapshot.val().CompanyID;
      if(email==emailCurrentUser)that.setState({
        currentUserName: name,
        companyID1: cid
      })
    })
  }).then(()=>{
    firebase.database().ref().child('Users').once("value").then(function(snapshot){
      snapshot.forEach(function(childSnapshot) {
      var name = childSnapshot.val().Name;
      var email = childSnapshot.val().Email;
      var cid = childSnapshot.val().CompanyID;
      console.log(that.state.companyID1);
      if(cid==that.state.companyID1){
      users.push({"name": name, "email": email});
      permUsers.push({"name": name, "email": email});
      that.setState({users: users});
      that.setState({permUsers: permUsers});
      }
      });
    }).then(()=>{
      firebase.database().ref().child('Projects').once("value").then(function(snapshot){
        snapshot.forEach(function(childSnapshot) {
        var name1=childSnapshot.val().ProjectName;
        console.log(that.state.companyID1);
        if(childSnapshot.val().CompanyID==that.state.companyID1){
        console.log("jjjjjjjjjjjjjjjjjj");
        projectsForForm.push({name: name1});
        var name = childSnapshot.val().ProjectName;
        var type = childSnapshot.val().ProjectType;
        var members = childSnapshot.val().ProjectMembersNames;
        projects.push({"name": name, "type": type, "members": members});
        that.setState({
          projectsForForm: projectsForForm,
          projects: projects
        });
      }
      });
    });
    });
    });

  var that = this;
  const {fromDatesForDropdown} = this.state;
  const {toDatesForDropdown} = this.state;
  firebase.database().ref().child('StatusReport').once("value").then(function(snapshot){
    snapshot.forEach(function(childSnapshot) {
      console.log(childSnapshot.val().Date);
      if(fromDatesForDropdown.indexOf(childSnapshot.val().Date)==-1)
      fromDatesForDropdown.push(childSnapshot.val().Date);
      if(toDatesForDropdown.indexOf(childSnapshot.val().Date)==-1)
      toDatesForDropdown.push(childSnapshot.val().Date);
    that.setState({
      fromDatesForDropdown: fromDatesForDropdown,
      toDatesForDropdown: toDatesForDropdown
    })
    });
  });
  }

  createEditedProjectList(){
    const projects = [];
    var that = this;
    firebase.database().ref().child('Projects').once("value").then(function(snapshot){
      snapshot.forEach(function(childSnapshot) {
      var name = childSnapshot.val().ProjectName;
      var type = childSnapshot.val().ProjectType;
      var members = childSnapshot.val().ProjectMembersNames;
      if(childSnapshot.val().CompanyID==that.state.companyID1){
      projects.push({"name": name, "type": type, "members": members});
      that.setState({projects: projects, projectsForForm: projects});
        }
      });
    });
  }

  renderProjectList() {
    const projects = [];
    var that = this;
    firebase.database().ref().child('Projects').once("value").then(function(snapshot){
      snapshot.forEach(function(childSnapshot) {
      var name = childSnapshot.val().ProjectName;
      var type = childSnapshot.val().ProjectType;
      var members = childSnapshot.val().ProjectMembersNames;
      if(childSnapshot.val().CompanyID==that.state.companyID1){
      projects.push({"name": name, "type": type, "members": members});
      that.setState({projects: projects, projectsForForm: projects});
      }
      });
    }).then(()=>{
      document.getElementById('projectListDiv').style.display = "block";
    });
  }

  reopenProjectsTable(name, type, members){
    if(document.getElementById('generatedReportTable').style.display=="block")
    document.getElementById('generatedReportTable').style.display="none";
    var a=[];
    for(var i = 0; i<this.state.permUsers.length; i++){
      a.push({name: this.state.permUsers[i].name, email: this.state.permUsers[i].email});
    }
    var selectedUsers = [];
    var memberNamesArray = members.split(',');
    console.log(memberNamesArray);
    for(var i = 0; i<memberNamesArray.length; i++){
      if(memberNamesArray[i]!="")
      selectedUsers.push({name: memberNamesArray[i]});
      for(var j = 0; j<a.length; j++){
        if(a[j].name==memberNamesArray[i]){
          a.splice(j, 1);
        }
      }
    }
    console.log(a);
    this.setState({
      selectedUsers: selectedUsers,
      users: a,
      name2: name,
      oldName: name,
      type2: type
    },()=>{
      document.getElementById('nameInput1').value=this.state.name2;
      document.getElementById('typeDropDown1').value = this.state.type2;
      document.getElementById('projectsTableID1').style.display="block";
      document.getElementById('projectListDiv').style.display="none";
    });
  }

  showTable(e){
      document.getElementById('tableID').style.display = "block";
      document.getElementById('statusReportTable1').style.display = "none";
      document.getElementById('totalHoursInDisplay').style.display = "none";
      document.getElementById('currentUserNameDivInCol2b').style.display = "none";
      document.getElementById('generatedReportTable').style.display="none";
      document.getElementById('DatesOfGeneratedReportDiv').style.display="block";
      console.log(document.getElementById('tableID').style.display);
      document.getElementById('projectListDiv').style.display="none";
      this.setState(this);
  }

  openProjectsTable(){
    if(document.getElementById('generatedReportTable').style.display=="block")
    document.getElementById('generatedReportTable').style.display="none";
    var a=[];
    for(var i = 0; i<this.state.permUsers.length; i++){
      a.push({name: this.state.permUsers[i].name, email: this.state.permUsers[i].email});
    }
    this.setState({
      selectedUsers:[],
      users: a
    },()=>{
      document.getElementById('projectsTableID').style.display = "block";
      document.getElementById('bgTextID').style.display = "none";
      document.getElementById('projectListDiv').style.display = "none";
      document.getElementById('projectsTableID1').style.display="none";
    });
  }

  componentWillReceiveProps(nextProps){
    console.log("triggered");
  }

  submitProject(){
    const name1 = document.getElementById('nameInput').value;
    var firebaseRef = firebase.database().ref();
    console.log("inside");
    var s = "";
    var s1="";
    console.log(this.state.permUsers.length);
    console.log(this.state.selectedUsers.length);
    for(var i = 0; i<this.state.permUsers.length; i++){
      console.log(this.state.permUsers[i].name);
      for(var j = 0; j<this.state.selectedUsers.length; j++){
        if(this.state.permUsers[i].name==this.state.selectedUsers[j].name){
          console.log(s);
          s = s+this.state.permUsers[i].email+',';
          s1 = s1+this.state.permUsers[i].name+',';
        }
      }
    }
    s = s.substr(0, s.length-1);
    s1= s1.substr(0, s1.length-1);
    console.log(s);
    firebaseRef.child("Projects").push().set({
      ProjectName: name1,
      ProjectType: document.getElementById('typeDropDown').value,
      ProjectMembers: s,
      ProjectMembersNames: s1,
      CompanyID: this.state.companyID1
    }).then(() => {
      document.getElementById('projectsTableID').style.display="none";
      this.renderProjectList();
      document.getElementById('nameInput').value = "";
      var a=[];
      for(var i = 0; i<this.state.permUsers.length; i++){
        a.push({name: this.state.permUsers[i].name, email: this.state.permUsers[i].email});
      }
      this.setState({
        selectedUsers:[],
        users: a
      });
    });
  }

  /*submitReport(){
     const projectEntries = this.state.projectEntries;
     var firebaseRef = firebase.database().ref();
     var mAuth = firebase.auth();
     if (mAuth.currentUser!=null)
     var email = mAuth.currentUser.email;
     for(var i = 0; i<projectEntries.length; i++){
     firebaseRef.child("StatusReport").push().set({
         UserEmail: email,
         Type: projectEntries[i].typeOfWork,
         ProjectName: projectEntries[i].projectName,
         FromTime: projectEntries[i].fromTime,
         ToTime: projectEntries[i].toTime,
         Comments: projectEntries[i].comments,
         Overtime: projectEntries[i].overtime,
         Date: this.state.date,
         Day: this.state.day
     }).then(()=>{
       var that = this;
       const {fromDatesForDropdown} = this.state;
       const {toDatesForDropdown} = this.state;
       firebase.database().ref().child("StatusReport").once("value").then(function(snapshot){
         snapshot.forEach(function(childSnapshot) {
         if(fromDatesForDropdown.indexOf(childSnapshot.val().Date)==-1)
         fromDatesForDropdown.push(childSnapshot.val().Date);
         if(toDatesForDropdown.indexOf(childSnapshot.val().Date)==-1)
         toDatesForDropdown.push(childSnapshot.val().Date);
         that.setState({
           fromDatesForDropdown: fromDatesForDropdown,
           toDatesForDropdown: toDatesForDropdown
         })
         });
       });
      })
     }

    document.getElementById('statusReportTable1').style.display = "block";
    document.getElementById('totalHoursInDisplay').style.display = "block";
    document.getElementById('currentUserNameDivInCol2b').style.display = "block";
    document.getElementById('tableID').style.display="none";

  }*/

  /*deleteEntry(index){
    const {entries}=this.state;
    entries.splice(index, 1);
    const {projectEntries} = this.state;
    projectEntries.splice(index, 1);
    this.setState({
      entries: entries,
      projectEntries: projectEntries
    })
  }*/

  /*get renderEntryRows(){
        console.log("hello");
        const entries = this.state.entries;
        if(entries.length == 0){
        entries.push({comments:"..."});
        }
        return(
          <div>
          {this.state.entries.map((entry) => {
            return (
              <tr>
              <img src={CrossImage} onClick={(e)=>{this.deleteEntry(this.state.entries.indexOf(entry))}}/>
              <td>
                <select id="WorkTypeSelect" onChange={(e) => this.saveProjectEntry(this.state.entries.indexOf(entry), "typeOfWork", e)}>
                  <option value="Please select from below">Please select from below</option>
                  <option>WAW</option>
                  <option>WAH</option>
                </select>
              </td>
              <td>
              <select id="ProjectNameSelect" onChange={(e) => this.saveProjectEntry(this.state.entries.indexOf(entry), "projectName", e)} >
              <option value="Please select from below">Please select from below</option>
              {this.state.projectsForForm.map((project) => {
                return (
                 <option value={project.name}>{project.name}</option>
              )}
              )}
              </select>
              </td>
              <td>
              <input id="commentsInput" onChange={(e) => this.saveProjectEntry(this.state.entries.indexOf(entry), "comments", e)}/>
              </td>
              <td>
              <input type="time" id="fromTimeInput" onChange={(e) => this.saveProjectEntry(this.state.entries.indexOf(entry), "fromTime", e)}></input>
              </td>
              <td>
              <input type="time" id="toTimeInput" onChange={(e) => this.saveProjectEntry(this.state.entries.indexOf(entry), "toTime", e)}></input>
              </td>
              <td>
              <img src={Flag} onClick={(e) => this.saveProjectEntry(this.state.entries.indexOf(entry),"overtime", e)}/>
              </td>
              </tr>
          )}
         )}
         </div>
      )
    }*/

  /*saveDate(e){
    if(e.target.value=="today"){
    var d= new Date();
    console.log(d);
    this.state.date = d.getDate()+"/"+d.getMonth()+1+"/"+d.getFullYear();
    this.state.day = d.getDay().toString();
    console.log(d.getDay());
    console.log(this.state.day);
    this.state.fullDate=d;
    console.log(this.state.date);
    }
    else if(e.target.value=="yesterday"){
    var d = new Date();
    d.setDate(d.getDate() - 1);
    this.state.day = d.getDay().toString();
    console.log(d);
    console.log(d.getMonth());
    console.log(d.getYear());
    this.state.fullDate=d;
    this.state.date = d.getDate()+"/"+d.getMonth()+1+"/"+d.getFullYear();
    }
    this.setState({
      date: this.state.date,
      day: this.state.day
    })
    console.log(this.state.date);
  }*/

  generateReport(){

    var reports = [];
    this.setState({
      reports: reports
    })
    document.getElementById('generatedReportTable').style.display="block";
    if(this.state.selected1==true&&this.state.selected2==true){
      document.getElementById('projectListDiv').style.display="none";
      document.getElementById('NewProjectID').style.display="none";
      document.getElementById("DatesOfGeneratedReportDiv").style.display="none";
      if(this.state.adminRole=='Admin'){
        document.getElementById('manageDiv').style.backgroundColor= "#DFDFDF";
      }
    if(this.state.selected3==true&&this.state.selected4==false){

      var that = this;
      const reports = [];
      firebase.database().ref().child("StatusReport").orderByChild('Date').equalTo(that.state.selectedFromDate).once("value").then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
          that.setState({
            fromFullDate: childSnapshot.val().Date
          })
        })
      }).then(()=>{
        firebase.database().ref().child("StatusReport").orderByChild('Date').equalTo(that.state.selectedToDate).once("value").then(function(snapshot){
          snapshot.forEach(function(childSnapshot){
            that.setState({
              toFullDate: childSnapshot.val().Date
            })
          })
        }).then(()=>
        firebase.database().ref().child("StatusReport").orderByChild('ProjectName').equalTo(document.getElementById('projectnameDropdown').value).once("value").then(function(snapshot){

          snapshot.forEach(function(childSnapshot) {

            console.log(that.state.fromFullDate);
            console.log(that.state.toFullDate);
            console.log(childSnapshot.val().fullDate>=that.state.fromFullDate);
            console.log(childSnapshot.val().fullDate<=that.state.toFullDate);
         var monthDays = 0;
         var yearDays = 0;
         var month = 0;
         if(that.state.fromFullDate.substring(2,3)=='/'){
           console.log(that.state.fromFullDate.substring(2,3));
           if(that.state.fromFullDate.substring(4,5)=='/'){
             console.log(that.state.fromFullDate.substring(4,5));
           month = that.state.fromFullDate.substring(3,4);
           yearDays = ((that.state.fromFullDate.substring(5,that.state.fromFullDate.length)-1)/4)*366+
           ((that.state.fromFullDate.substring(5,that.state.fromFullDate.length)-1)/4)*3*365+((that.state.fromFullDate.substring(5,that.state.fromFullDate.length)-1)%4)*365;
           }
           else if(that.state.fromFullDate.substring(5,6)=='/'){
             console.log(that.state.fromFullDate.substring(5,6));
           month = that.state.fromFullDate.substring(3,5);
           yearDays = ((that.state.fromFullDate.substring(6,that.state.fromFullDate.length)-1)/4)*366+
           ((that.state.fromFullDate.substring(6,that.state.fromFullDate.length)-1)/4)*3*365+((that.state.fromFullDate.substring(6,that.state.fromFullDate.length)-1)%4)*365;
           }
         }
         else{
           if(that.state.fromFullDate.substring(3,4)=='/'){
           month = that.state.fromFullDate.substring(2,3);
           yearDays = ((that.state.fromFullDate.substring(4,that.state.fromFullDate.length)-1)/4)*366+
           ((that.state.fromFullDate.substring(4,that.state.fromFullDate.length)-1)/4)*3*365+
          ((that.state.fromFullDate.substring(4,that.state.fromFullDate.length)-1)%4)*365 ;
         }
         else if(that.state.fromFullDate.substring(4,5)=='/'){
           month = that.state.fromFullDate.substring(2,4);
           yearDays = ((that.state.fromFullDate.substring(5,that.state.fromFullDate.length)-1)/4)*366+
           ((that.state.fromFullDate.substring(5,that.state.fromFullDate.length)-1)/4)*3*365+
          ((that.state.fromFullDate.substring(5,that.state.fromFullDate.length)-1)%4)*365 ;
         }
       }
         if(month==1){
           monthDays = 0;
         }
         if(month==2){
           monthDays = 31
         }
         if(month==3){
           if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
           monthDays=31+28;
           else monthDays=31+29;
         }
         if(month==4){
           if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
           monthDays=31+28+31;
           else monthDays=31+29+31;
         }
         if(month==5){
           if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
           monthDays=31+28+31+30;
           else monthDays=31+29+31+30;
         }
         if(month==6){
           if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
           monthDays=31+28+31+30+31;
           else monthDays=31+29+31+30+31;
         }
         if(month==7){
           if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
           monthDays=31+28+31+30+31+30;
           else monthDays=31+29+31+30+31+30;
         }
         if(month==8){
           if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
           monthDays=31+28+31+30+31+30+31;
           else monthDays=31+29+31+30+31+30+31;
         }
         if(month==9){
           if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
           monthDays=31+28+31+30+31+30+31+31;
           else monthDays=31+29+31+30+31+30+31+31;
         }
         if(month==10){
           if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
           monthDays=31+28+31+30+31+30+31+31+30;
           else monthDays=31+29+31+30+31+30+31+31+30;
         }
         if(month==11){
           if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
           monthDays=31+28+31+30+31+30+31+31+30+31;
           else monthDays=31+29+31+30+31+30+31+31+30+31;
         }
         if(month==12){
           if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
           monthDays=31+28+31+30+31+30+31+31+30+31+30;
           else monthDays=31+29+31+30+31+30+31+31+30+31+30;
         }
         var fullDateNumber = 0;
         if(that.state.fromFullDate.substring(1)=='/'){
           fullDateNumber=monthDays+yearDays+parseFloat(that.state.fromFullDate.substring(0,1));
         }
         else{
           fullDateNumber=monthDays+yearDays+parseFloat(that.state.fromFullDate.substring(0,2));
         }
         console.log(fullDateNumber);

         var monthDays1 = 0;
         var yearDays1 = 0;
         var month1=0;
         if(that.state.toFullDate.substring(2,3)=='/'){
           console.log(that.state.toFullDate.substring(2,3));
           if(that.state.toFullDate.substring(4,5)=='/'){
             console.log(that.state.toFullDate.substring(4,5));
           month1 = that.state.toFullDate.substring(3,4);
           yearDays1 = ((that.state.toFullDate.substring(5,that.state.toFullDate.length)-1)/4)*366+
           ((that.state.toFullDate.substring(5,that.state.toFullDate.length)-1)/4)*3*365+((that.state.toFullDate.substring(5,that.state.toFullDate.length)-1)%4)*365;
           }
           else if(that.state.toFullDate.substring(5,6)=='/'){
             console.log(that.state.toFullDate.substring(5,6));
           month1 = that.state.toFullDate.substring(3,5);
           yearDays1 = ((that.state.toFullDate.substring(6,that.state.toFullDate.length)-1)/4)*366+
           ((that.state.toFullDate.substring(6,that.state.toFullDate.length)-1)/4)*3*365+((that.state.toFullDate.substring(6,that.state.toFullDate.length)-1)%4)*365;
           }
         }
         else{
           if(that.state.toFullDate.substring(3,4)=='/'){
           month1 = that.state.toFullDate.substring(2,3);
           yearDays1 = ((that.state.toFullDate.substring(4,that.state.toFullDate.length)-1)/4)*366+
           ((that.state.toFullDate.substring(4,that.state.toFullDate.length)-1)/4)*3*365+
          ((that.state.toFullDate.substring(4,that.state.toFullDate.length)-1)%4)*365 ;
         }
         else if(that.state.toFullDate.substring(4,5)=='/'){
           month1 = that.state.toFullDate.substring(2,4);
           yearDays1 = ((that.state.toFullDate.substring(5,that.state.toFullDate.length)-1)/4)*366+
           ((that.state.toFullDate.substring(5,that.state.toFullDate.length)-1)/4)*3*365+
          ((that.state.toFullDate.substring(5,that.state.toFullDate.length)-1)%4)*365 ;
         }
         }
         if(month1==1){
           monthDays1 = 0;
         }
         if(month1==2){
           monthDays1 = 31
         }
         if(month1==3){
           if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
           monthDays1=31+28;
           else monthDays1=31+29;
         }
         if(month1==4){
           if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
           monthDays1=31+28+31;
           else monthDays1=31+29+31;
         }
         if(month1==5){
           if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
           monthDays1=31+28+31+30;
           else monthDays1=31+29+31+30;
         }
         if(month1==6){
           if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
           monthDays1=31+28+31+30+31;
           else monthDays1=31+29+31+30+31;
         }
         if(month1==7){
           if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
           monthDays1=31+28+31+30+31+30;
           else monthDays1=31+29+31+30+31+30;
         }
         if(month1==8){
           if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
           monthDays1=31+28+31+30+31+30+31;
           else monthDays1=31+29+31+30+31+30+31;
         }
         if(month1==9){
           if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
           monthDays1=31+28+31+30+31+30+31+31;
           else monthDays1=31+29+31+30+31+30+31+31;
         }
         if(month1==10){
           if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
           monthDays1=31+28+31+30+31+30+31+31+30;
           else monthDays1=31+29+31+30+31+30+31+31+30;
         }
         if(month1==11){
           if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
           monthDays1=31+28+31+30+31+30+31+31+30+31;
           else monthDays1=31+29+31+30+31+30+31+31+30+31;
         }
         if(month1==12){
           if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
           monthDays1=31+28+31+30+31+30+31+31+30+31+30;
           else monthDays1=31+29+31+30+31+30+31+31+30+31+30;
         }

         var fullDateNumber1 = 0;
         if(that.state.toFullDate.substring(1)=='/'){
           fullDateNumber1=monthDays1+yearDays1+parseFloat(that.state.toFullDate.substring(0,1));
         }
         else{
           fullDateNumber1=monthDays1+yearDays1+parseFloat(that.state.toFullDate.substring(0,2));
         }
         console.log(fullDateNumber);
         var monthDays2 = 0;
         var yearDays2 = 0;
         var month2=0;
         var thisFullDate = childSnapshot.val().Date;
         console.log(thisFullDate);
         if(that.state.thisFullDate.substring(2,3)=='/'){
           console.log(that.state.thisFullDate.substring(2,3));
           if(that.state.thisFullDate.substring(4,5)=='/'){
             console.log(that.state.thisFullDate.substring(4,5));
           month2 = that.state.thisFullDate.substring(3,4);
           yearDays2 = ((that.state.thisFullDate.substring(5,that.state.thisFullDate.length)-1)/4)*366+
           ((that.state.thisFullDate.substring(5,that.state.thisFullDate.length)-1)/4)*3*365+((that.state.thisFullDate.substring(5,that.state.thisFullDate.length)-1)%4)*365;
           }
           else if(that.state.thisFullDate.substring(5,6)=='/'){
             console.log(that.state.thisFullDate.substring(5,6));
           month2 = that.state.thisFullDate.substring(3,5);
           yearDays2 = ((that.state.thisFullDate.substring(6,that.state.thisFullDate.length)-1)/4)*366+
           ((that.state.thisFullDate.substring(6,that.state.thisFullDate.length)-1)/4)*3*365+((that.state.thisFullDate.substring(6,that.state.thisFullDate.length)-1)%4)*365;
           }
         }
         else{
           if(that.state.thisFullDate.substring(3,4)=='/'){
           month2 = that.state.thisFullDate.substring(2,3);
           yearDays2 = ((that.state.thisFullDate.substring(4,that.state.thisFullDate.length)-1)/4)*366+
           ((that.state.thisFullDate.substring(4,that.state.thisFullDate.length)-1)/4)*3*365+
          ((that.state.thisFullDate.substring(4,that.state.thisFullDate.length)-1)%4)*365 ;
         }
         else if(that.state.thisFullDate.substring(4,5)=='/'){
           month2 = that.state.thisFullDate.substring(2,4);
           yearDays2 = ((that.state.thisFullDate.substring(5,that.state.thisFullDate.length)-1)/4)*366+
           ((that.state.thisFullDate.substring(5,that.state.thisFullDate.length)-1)/4)*3*365+
          ((that.state.thisFullDate.substring(5,that.state.thisFullDate.length)-1)%4)*365 ;
         }
         }
         console.log(month2);
         if(month2==1){
           monthDays2 = 0;
         }
         if(month2==2){
           monthDays2 = 31
         }
         if(month2==3){
           if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
           monthDays2=31+28;
           else monthDays2=31+29;
         }
         if(month2==4){
           if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
           monthDays2=31+28+31;
           else monthDays2=31+29+31;
         }
         if(month2==5){
           if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
           monthDays2=31+28+31+30;
           else monthDays2=31+29+31+30;
         }
         if(month2==6){
           if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
           monthDays2=31+28+31+30+31;
           else monthDays2=31+29+31+30+31;
         }
         if(month2==7){
           if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
           monthDays2=31+28+31+30+31+30;
           else monthDays2=31+29+31+30+31+30;
         }
         if(month2==8){
           if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
           monthDays2=31+28+31+30+31+30+31;
           else monthDays2=31+29+31+30+31+30+31;
         }
         if(month2==9){
           if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
           monthDays2=31+28+31+30+31+30+31+31;
           else monthDays2=31+29+31+30+31+30+31+31;
         }
         if(month2==10){
           if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
           monthDays2=31+28+31+30+31+30+31+31+30;
           else monthDays2=31+29+31+30+31+30+31+31+30;
         }
         if(month2==11){
           if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
           monthDays2=31+28+31+30+31+30+31+31+30+31;
           else monthDays2=31+29+31+30+31+30+31+31+30+31;
         }
         if(month2==12){
           if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
           monthDays2=31+28+31+30+31+30+31+31+30+31+30;
           else monthDays2=31+29+31+30+31+30+31+31+30+31+30;
         }
         console.log(monthDays2);
         console.log(yearDays2);
         var fullDateNumber2 = 0;
         if(thisFullDate.substring(1)=='/'){
           fullDateNumber2=monthDays1+yearDays1+parseFloat(thisFullDate.substring(0,1));
         }
         else{
           fullDateNumber2=monthDays1+yearDays1+parseFloat(thisFullDate.substring(0,2));
         }
         console.log(fullDateNumber2);
         if(fullDateNumber2>=fullDateNumber&&fullDateNumber2<=fullDateNumber1){
           var toTimeInMinutes = parseFloat(childSnapshot.val().ToTime.substring(0,2))*60+parseFloat(childSnapshot.val().ToTime.substring(3,5));
           var fromTimeInMinutes = parseFloat(childSnapshot.val().FromTime.substring(0,2))*60+parseFloat(childSnapshot.val().FromTime.substring(3,5));
           var totalTimeInMinutes = toTimeInMinutes-fromTimeInMinutes;
          reports.push({
            type: childSnapshot.val().Type,
            userEmail: childSnapshot.val().UserEmail,
            date: childSnapshot.val().Date,
            comments: childSnapshot.val().Comments,
            totalHours: totalTimeInMinutes/60
          });
          var i = 0;
          for(var j = 0; j<reports.length; j++){
            i = i+reports[j].totalHours;
          }
          that.setState({
            totalHoursInReport: i
          })
          that.setState({
            reports: reports,
            column1Label: "Type",
            column2Label: "User Email",
            column3Label: "Date",
            column4Label: "Comments",
            column5Label: "Total Hours"
          },()=>{
            console.log(reports);
          })
        }
          })
        })
        )
      })
    }
    if(this.state.selected3==false&&this.state.selected4==true){
      var that = this;
      const reports = [];
      var mAuth = firebase.auth();
      if (mAuth.currentUser!=null)
      var emailCurrentUser = mAuth.currentUser.email;
      var that = this;
      firebase.database().ref().child("StatusReport").orderByChild('Date').equalTo(that.state.selectedFromDate).once("value").then(function(snapshot){
              snapshot.forEach(function(childSnapshot){
                that.setState({
                  fromFullDate: childSnapshot.val().Date
                })
              })
            }).then(()=>{
              firebase.database().ref().child("StatusReport").orderByChild('Date').equalTo(that.state.selectedToDate).once("value").then(function(snapshot){
                snapshot.forEach(function(childSnapshot){
                  that.setState({
                    toFullDate: childSnapshot.val().Date
                  })
                })
              }).then(()=>{
      firebase.database().ref().child('Users').orderByChild('Email').equalTo(emailCurrentUser).once("value").then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
          that.setState({
            companyID: childSnapshot.val().CompanyID
          })
        })
      }).then(() => {
        firebase.database().ref().child('Users').orderByChild('Name').equalTo(document.getElementById('employeeDropdown').value).once("value").then(function(snapshot){
          snapshot.forEach(function(childSnapshot){
            if(childSnapshot.val().CompanyID==that.state.companyID)
            that.setState({
              emailOfNameSelected: childSnapshot.val().Email
            },()=>{
              console.log(that.state.emailOfNameSelected);
            })
          })
        }).then(()=>{
          console.log(that.state.emailOfNameSelected);
          const reports = [];
          firebase.database().ref().child('StatusReport').orderByChild('UserEmail').equalTo(that.state.emailOfNameSelected).once("value").then(function(snapshot){
            console.log("here");
            snapshot.forEach(function(childSnapshot) {
              console.log(that.state.fromFullDate);
              console.log(that.state.toFullDate);
              console.log(childSnapshot.val().fullDate>=that.state.fromFullDate);
              console.log(childSnapshot.val().fullDate<=that.state.toFullDate);
           var monthDays = 0;
           var yearDays = 0;
           var month = 0;

           if(that.state.fromFullDate.substring(2,3)=='/'){
             console.log(that.state.fromFullDate.substring(2,3));
             if(that.state.fromFullDate.substring(4,5)=='/'){
               console.log(that.state.fromFullDate.substring(4,5));
             month = that.state.fromFullDate.substring(3,4);
             yearDays = ((that.state.fromFullDate.substring(5,that.state.fromFullDate.length)-1)/4)*366+
             ((that.state.fromFullDate.substring(5,that.state.fromFullDate.length)-1)/4)*3*365+((that.state.fromFullDate.substring(5,that.state.fromFullDate.length)-1)%4)*365;
             }
             else if(that.state.fromFullDate.substring(5,6)=='/'){
               console.log(that.state.fromFullDate.substring(5,6));
             month = that.state.fromFullDate.substring(3,5);
             yearDays = ((that.state.fromFullDate.substring(6,that.state.fromFullDate.length)-1)/4)*366+
             ((that.state.fromFullDate.substring(6,that.state.fromFullDate.length)-1)/4)*3*365+((that.state.fromFullDate.substring(6,that.state.fromFullDate.length)-1)%4)*365;
             }
           }
           else{
             if(that.state.fromFullDate.substring(3,4)=='/'){
             month = that.state.fromFullDate.substring(2,3);
             yearDays = ((that.state.fromFullDate.substring(4,that.state.fromFullDate.length)-1)/4)*366+
             ((that.state.fromFullDate.substring(4,that.state.fromFullDate.length)-1)/4)*3*365+
            ((that.state.fromFullDate.substring(4,that.state.fromFullDate.length)-1)%4)*365 ;
           }
           else if(that.state.fromFullDate.substring(4,5)=='/'){
             month = that.state.fromFullDate.substring(2,4);
             yearDays = ((that.state.fromFullDate.substring(5,that.state.fromFullDate.length)-1)/4)*366+
             ((that.state.fromFullDate.substring(5,that.state.fromFullDate.length)-1)/4)*3*365+
            ((that.state.fromFullDate.substring(5,that.state.fromFullDate.length)-1)%4)*365 ;
           }
         }
           if(month==1){
             monthDays = 0;
           }
           if(month==2){
             monthDays = 31
           }
           if(month==3){
             if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
             monthDays=31+28;
             else monthDays=31+29;
           }
           if(month==4){
             if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
             monthDays=31+28+31;
             else monthDays=31+29+31;
           }
           if(month==5){
             if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
             monthDays=31+28+31+30;
             else monthDays=31+29+31+30;
           }
           if(month==6){
             if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
             monthDays=31+28+31+30+31;
             else monthDays=31+29+31+30+31;
           }
           if(month==7){
             if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
             monthDays=31+28+31+30+31+30;
             else monthDays=31+29+31+30+31+30;
           }
           if(month==8){
             if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
             monthDays=31+28+31+30+31+30+31;
             else monthDays=31+29+31+30+31+30+31;
           }
           if(month==9){
             if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
             monthDays=31+28+31+30+31+30+31+31;
             else monthDays=31+29+31+30+31+30+31+31;
           }
           if(month==10){
             if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
             monthDays=31+28+31+30+31+30+31+31+30;
             else monthDays=31+29+31+30+31+30+31+31+30;
           }
           if(month==11){
             if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
             monthDays=31+28+31+30+31+30+31+31+30+31;
             else monthDays=31+29+31+30+31+30+31+31+30+31;
           }
           if(month==12){
             if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
             monthDays=31+28+31+30+31+30+31+31+30+31+30;
             else monthDays=31+29+31+30+31+30+31+31+30+31+30;
           }
           var fullDateNumber = 0;
           if(that.state.fromFullDate.substring(1)=='/'){
             fullDateNumber=monthDays+yearDays+parseFloat(that.state.fromFullDate.substring(0,1));
           }
           else{
             fullDateNumber=monthDays+yearDays+parseFloat(that.state.fromFullDate.substring(0,2));
           }
           console.log(fullDateNumber);

           var monthDays1 = 0;
           var yearDays1 = 0;
           var month1=0;
           if(that.state.toFullDate.substring(2,3)=='/'){
             console.log(that.state.toFullDate.substring(2,3));
             if(that.state.toFullDate.substring(4,5)=='/'){
               console.log(that.state.toFullDate.substring(4,5));
             month1 = that.state.toFullDate.substring(3,4);
             yearDays1 = ((that.state.toFullDate.substring(5,that.state.toFullDate.length)-1)/4)*366+
             ((that.state.toFullDate.substring(5,that.state.toFullDate.length)-1)/4)*3*365+((that.state.toFullDate.substring(5,that.state.toFullDate.length)-1)%4)*365;
             }
             else if(that.state.toFullDate.substring(5,6)=='/'){
               console.log(that.state.toFullDate.substring(5,6));
             month1 = that.state.toFullDate.substring(3,5);
             yearDays1 = ((that.state.toFullDate.substring(6,that.state.toFullDate.length)-1)/4)*366+
             ((that.state.toFullDate.substring(6,that.state.toFullDate.length)-1)/4)*3*365+((that.state.toFullDate.substring(6,that.state.toFullDate.length)-1)%4)*365;
             }
           }
           else{
             if(that.state.toFullDate.substring(3,4)=='/'){
             month1 = that.state.toFullDate.substring(2,3);
             yearDays1 = ((that.state.toFullDate.substring(4,that.state.toFullDate.length)-1)/4)*366+
             ((that.state.toFullDate.substring(4,that.state.toFullDate.length)-1)/4)*3*365+
            ((that.state.toFullDate.substring(4,that.state.toFullDate.length)-1)%4)*365 ;
           }
           else if(that.state.toFullDate.substring(4,5)=='/'){
             month1 = that.state.toFullDate.substring(2,4);
             yearDays1 = ((that.state.toFullDate.substring(5,that.state.toFullDate.length)-1)/4)*366+
             ((that.state.toFullDate.substring(5,that.state.toFullDate.length)-1)/4)*3*365+
            ((that.state.toFullDate.substring(5,that.state.toFullDate.length)-1)%4)*365 ;
           }
           }

           if(month1==1){
             monthDays1 = 0;
           }
           if(month1==2){
             monthDays1 = 31
           }
           if(month1==3){
             if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
             monthDays1=31+28;
             else monthDays1=31+29;
           }
           if(month1==4){
             if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
             monthDays1=31+28+31;
             else monthDays1=31+29+31;
           }
           if(month1==5){
             if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
             monthDays1=31+28+31+30;
             else monthDays1=31+29+31+30;
           }
           if(month1==6){
             if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
             monthDays1=31+28+31+30+31;
             else monthDays1=31+29+31+30+31;
           }
           if(month1==7){
             if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
             monthDays1=31+28+31+30+31+30;
             else monthDays1=31+29+31+30+31+30;
           }
           if(month1==8){
             if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
             monthDays1=31+28+31+30+31+30+31;
             else monthDays1=31+29+31+30+31+30+31;
           }
           if(month1==9){
             if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
             monthDays1=31+28+31+30+31+30+31+31;
             else monthDays1=31+29+31+30+31+30+31+31;
           }
           if(month1==10){
             if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
             monthDays1=31+28+31+30+31+30+31+31+30;
             else monthDays1=31+29+31+30+31+30+31+31+30;
           }
           if(month1==11){
             if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
             monthDays1=31+28+31+30+31+30+31+31+30+31;
             else monthDays1=31+29+31+30+31+30+31+31+30+31;
           }
           if(month1==12){
             if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
             monthDays1=31+28+31+30+31+30+31+31+30+31+30;
             else monthDays1=31+29+31+30+31+30+31+31+30+31+30;
           }

           var fullDateNumber1 = 0;
           if(that.state.toFullDate.substring(1)=='/'){
             fullDateNumber1=monthDays1+yearDays1+parseFloat(that.state.toFullDate.substring(0,1));
           }
           else{
             fullDateNumber1=monthDays1+yearDays1+parseFloat(that.state.toFullDate.substring(0,2));
           }
           console.log(fullDateNumber);
           var monthDays2 = 0;
           var yearDays2 = 0;
           var month2=0;
           var thisFullDate = childSnapshot.val().Date;
           console.log(thisFullDate);
           if(that.state.thisFullDate.substring(2,3)=='/'){
             console.log(that.state.thisFullDate.substring(2,3));
             if(that.state.thisFullDate.substring(4,5)=='/'){
               console.log(that.state.thisFullDate.substring(4,5));
             month2 = that.state.thisFullDate.substring(3,4);
             yearDays2 = ((that.state.thisFullDate.substring(5,that.state.thisFullDate.length)-1)/4)*366+
             ((that.state.thisFullDate.substring(5,that.state.thisFullDate.length)-1)/4)*3*365+((that.state.thisFullDate.substring(5,that.state.thisFullDate.length)-1)%4)*365;
             }
             else if(that.state.thisFullDate.substring(5,6)=='/'){
               console.log(that.state.thisFullDate.substring(5,6));
             month2 = that.state.thisFullDate.substring(3,5);
             yearDays2 = ((that.state.thisFullDate.substring(6,that.state.thisFullDate.length)-1)/4)*366+
             ((that.state.thisFullDate.substring(6,that.state.thisFullDate.length)-1)/4)*3*365+((that.state.thisFullDate.substring(6,that.state.thisFullDate.length)-1)%4)*365;
             }
           }
           else{
             if(that.state.thisFullDate.substring(3,4)=='/'){
             month2 = that.state.thisFullDate.substring(2,3);
             yearDays2 = ((that.state.thisFullDate.substring(4,that.state.thisFullDate.length)-1)/4)*366+
             ((that.state.thisFullDate.substring(4,that.state.thisFullDate.length)-1)/4)*3*365+
            ((that.state.thisFullDate.substring(4,that.state.thisFullDate.length)-1)%4)*365 ;
           }
           else if(that.state.thisFullDate.substring(4,5)=='/'){
             month2 = that.state.thisFullDate.substring(2,4);
             yearDays2 = ((that.state.thisFullDate.substring(5,that.state.thisFullDate.length)-1)/4)*366+
             ((that.state.thisFullDate.substring(5,that.state.thisFullDate.length)-1)/4)*3*365+
            ((that.state.thisFullDate.substring(5,that.state.thisFullDate.length)-1)%4)*365 ;
           }
           }
           console.log(month2);
           if(month2==1){
             monthDays2 = 0;
           }
           if(month2==2){
             monthDays2 = 31
           }
           if(month2==3){
             if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
             monthDays2=31+28;
             else monthDays2=31+29;
           }
           if(month2==4){
             if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
             monthDays2=31+28+31;
             else monthDays2=31+29+31;
           }
           if(month2==5){
             if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
             monthDays2=31+28+31+30;
             else monthDays2=31+29+31+30;
           }
           if(month2==6){
             if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
             monthDays2=31+28+31+30+31;
             else monthDays2=31+29+31+30+31;
           }
           if(month2==7){
             if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
             monthDays2=31+28+31+30+31+30;
             else monthDays2=31+29+31+30+31+30;
           }
           if(month2==8){
             if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
             monthDays2=31+28+31+30+31+30+31;
             else monthDays2=31+29+31+30+31+30+31;
           }
           if(month2==9){
             if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
             monthDays2=31+28+31+30+31+30+31+31;
             else monthDays2=31+29+31+30+31+30+31+31;
           }
           if(month2==10){
             if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
             monthDays2=31+28+31+30+31+30+31+31+30;
             else monthDays2=31+29+31+30+31+30+31+31+30;
           }
           if(month2==11){
             if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
             monthDays2=31+28+31+30+31+30+31+31+30+31;
             else monthDays2=31+29+31+30+31+30+31+31+30+31;
           }
           if(month2==12){
             if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
             monthDays2=31+28+31+30+31+30+31+31+30+31+30;
             else monthDays2=31+29+31+30+31+30+31+31+30+31+30;
           }
           console.log(monthDays2);
           console.log(yearDays2);
           var fullDateNumber2 = 0;
           if(thisFullDate.substring(1)=='/'){
             fullDateNumber2=monthDays1+yearDays1+parseFloat(thisFullDate.substring(0,1));
           }
           else{
             fullDateNumber2=monthDays1+yearDays1+parseFloat(thisFullDate.substring(0,2));
           }
           console.log(fullDateNumber2);

          if(fullDateNumber2>=fullDateNumber&&fullDateNumber2<=fullDateNumber1){
            var toTimeInMinutes = parseFloat(childSnapshot.val().ToTime.substring(0,2))*60+parseFloat(childSnapshot.val().ToTime.substring(3,5));
            var fromTimeInMinutes = parseFloat(childSnapshot.val().FromTime.substring(0,2))*60+parseFloat(childSnapshot.val().FromTime.substring(3,5));
            var totalTimeInMinutes = toTimeInMinutes-fromTimeInMinutes;
            reports.push({
              type: childSnapshot.val().Type,
              date: childSnapshot.val().Date,
              projectName: childSnapshot.val().ProjectName,
              comments: childSnapshot.val().Comments,
              totalHours: totalTimeInMinutes/60
            });
            console.log(reports);
            var i = 0;
            for(var j = 0; j<reports.length; j++){
              i = i+reports[j].totalHours;
            }
            that.setState({
              totalHoursInReport: i
            })
            that.setState({
              reports: reports,
              column1Label: "Type",
              column2Label: "Date",
              column3Label: "Project Name",
              column4Label: "Comments",
              column5Label: "Total Hours"
            },()=>{
              console.log(reports);
            })
          }
            console.log("here2");
            });
            console.log("outside");
          });
      })
      })
    })
  })
}
    if(this.state.selected3==true&&this.state.selected4==true){

      var that = this;
      console.log(that.state.selectedFromDate);
      that.setState({
        fromFullDate: that.state.selectedFromDate,
        toFullDate: that.state.selectedToDate
      })
      firebase.database().ref().child('Users').orderByChild('Name').equalTo(document.getElementById('employeeDropdown').value).once("value").then(function(snapshot){
        console.log(that);
        snapshot.forEach(function(childSnapshot){
          that.setState({
            emailOfNameSelected: childSnapshot.val().Email
          })
        })
      }).then(()=>{
       firebase.database().ref().child('StatusReport').orderByChild('ProjectName').once("value").then(function(snapshot){
         snapshot.forEach(function(childSnapshot){
           let emailFromFirebase = childSnapshot.val().UserEmail;
           let projectNameFromFirebase = childSnapshot.val().ProjectName;
           let emailFromUser = that.state.emailOfNameSelected;
           console.log(that.state);

           // console.log(childSnapshot.val().UserEmail);
           // console.log(that.state.emailOfNameSelected);
           // console.log(that.state.fromFullDate);
           // console.log(that.state.toFullDate);
           // console.log(that);
           if((emailFromUser === emailFromFirebase)&&(projectNameFromFirebase==document.getElementById('projectnameDropdown').value)){
             console.log("inside");
          var monthDays = 0;
          var yearDays = 0;
          var month = 0;

          console.log(that.state.fromFullDate);
          if(that.state.fromFullDate.substring(2,3)=='/'){
            console.log(that.state.fromFullDate.substring(2,3));
            if(that.state.fromFullDate.substring(4,5)=='/'){
              console.log(that.state.fromFullDate.substring(4,5));
            month = that.state.fromFullDate.substring(3,4);
            yearDays = ((that.state.fromFullDate.substring(5,that.state.fromFullDate.length)-1)/4)*366+
            ((that.state.fromFullDate.substring(5,that.state.fromFullDate.length)-1)/4)*3*365+((that.state.fromFullDate.substring(5,that.state.fromFullDate.length)-1)%4)*365;
            }
            else if(that.state.fromFullDate.substring(5,6)=='/'){
              console.log(that.state.fromFullDate.substring(5,6));
            month = that.state.fromFullDate.substring(3,5);
            yearDays = ((that.state.fromFullDate.substring(6,that.state.fromFullDate.length)-1)/4)*366+
            ((that.state.fromFullDate.substring(6,that.state.fromFullDate.length)-1)/4)*3*365+((that.state.fromFullDate.substring(6,that.state.fromFullDate.length)-1)%4)*365;
            }
          }
          else{
            if(that.state.fromFullDate.substring(3,4)=='/'){
            month = that.state.fromFullDate.substring(2,3);
            yearDays = ((that.state.fromFullDate.substring(4,that.state.fromFullDate.length)-1)/4)*366+
            ((that.state.fromFullDate.substring(4,that.state.fromFullDate.length)-1)/4)*3*365+
           ((that.state.fromFullDate.substring(4,that.state.fromFullDate.length)-1)%4)*365 ;
          }
          else if(that.state.fromFullDate.substring(4,5)=='/'){
            month = that.state.fromFullDate.substring(2,4);
            yearDays = ((that.state.fromFullDate.substring(5,that.state.fromFullDate.length)-1)/4)*366+
            ((that.state.fromFullDate.substring(5,that.state.fromFullDate.length)-1)/4)*3*365+
           ((that.state.fromFullDate.substring(5,that.state.fromFullDate.length)-1)%4)*365 ;
          }
          }
          if(month==1){
            monthDays = 0;
          }
          if(month==2){
            monthDays = 31
          }
          if(month==3){
            if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
            monthDays=31+28;
            else monthDays=31+29;
          }
          if(month==4){
            if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
            monthDays=31+28+31;
            else monthDays=31+29+31;
          }
          if(month==5){
            if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
            monthDays=31+28+31+30;
            else monthDays=31+29+31+30;
          }
          if(month==6){
            if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
            monthDays=31+28+31+30+31;
            else monthDays=31+29+31+30+31;
          }
          if(month==7){
            if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
            monthDays=31+28+31+30+31+30;
            else monthDays=31+29+31+30+31+30;
          }
          if(month==8){
            if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
            monthDays=31+28+31+30+31+30+31;
            else monthDays=31+29+31+30+31+30+31;
          }
          if(month==9){
            if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
            monthDays=31+28+31+30+31+30+31+31;
            else monthDays=31+29+31+30+31+30+31+31;
          }
          if(month==10){
            if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
            monthDays=31+28+31+30+31+30+31+31+30;
            else monthDays=31+29+31+30+31+30+31+31+30;
          }
          if(month==11){
            if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
            monthDays=31+28+31+30+31+30+31+31+30+31;
            else monthDays=31+29+31+30+31+30+31+31+30+31;
          }
          if(month==12){
            if((that.state.fromFullDate.substring(5, that.state.fromFullDate.length)+2)%4!=0)
            monthDays=31+28+31+30+31+30+31+31+30+31+30;
            else monthDays=31+29+31+30+31+30+31+31+30+31+30;
          }
          var fullDateNumber = 0;
          if(that.state.fromFullDate.substring(1)=='/'){
            fullDateNumber=monthDays+yearDays+parseFloat(that.state.fromFullDate.substring(0,1));
          }
          else{
            fullDateNumber=monthDays+yearDays+parseFloat(that.state.fromFullDate.substring(0,2));
          }
          console.log(fullDateNumber);

          var monthDays1 = 0;
          var yearDays1 = 0;
          var month1=0;

          if(that.state.toFullDate.substring(2,3)=='/'){
            console.log(that.state.toFullDate.substring(2,3));
            if(that.state.toFullDate.substring(4,5)=='/'){
              console.log(that.state.toFullDate.substring(4,5));
            month1 = that.state.toFullDate.substring(3,4);
            yearDays1 = ((that.state.toFullDate.substring(5,that.state.toFullDate.length)-1)/4)*366+
            ((that.state.toFullDate.substring(5,that.state.toFullDate.length)-1)/4)*3*365+((that.state.toFullDate.substring(5,that.state.toFullDate.length)-1)%4)*365;
            }
            else if(that.state.toFullDate.substring(5,6)=='/'){
              console.log(that.state.toFullDate.substring(5,6));
            month1 = that.state.toFullDate.substring(3,5);
            yearDays1 = ((that.state.toFullDate.substring(6,that.state.toFullDate.length)-1)/4)*366+
            ((that.state.toFullDate.substring(6,that.state.toFullDate.length)-1)/4)*3*365+((that.state.toFullDate.substring(6,that.state.toFullDate.length)-1)%4)*365;
            }
          }
          else{
            if(that.state.toFullDate.substring(3,4)=='/'){
            month1 = that.state.toFullDate.substring(2,3);
            yearDays1 = ((that.state.toFullDate.substring(4,that.state.toFullDate.length)-1)/4)*366+
            ((that.state.toFullDate.substring(4,that.state.toFullDate.length)-1)/4)*3*365+
           ((that.state.toFullDate.substring(4,that.state.toFullDate.length)-1)%4)*365 ;
          }
          else if(that.state.toFullDate.substring(4,5)=='/'){
            month1 = that.state.toFullDate.substring(2,4);
            yearDays1 = ((that.state.toFullDate.substring(5,that.state.toFullDate.length)-1)/4)*366+
            ((that.state.toFullDate.substring(5,that.state.toFullDate.length)-1)/4)*3*365+
           ((that.state.toFullDate.substring(5,that.state.toFullDate.length)-1)%4)*365 ;
          }
          }

          if(month1==1){
            monthDays1 = 0;
          }
          if(month1==2){
            monthDays1 = 31
          }
          if(month1==3){
            if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
            monthDays1=31+28;
            else monthDays1=31+29;
          }
          if(month1==4){
            if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
            monthDays1=31+28+31;
            else monthDays1=31+29+31;
          }
          if(month1==5){
            if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
            monthDays1=31+28+31+30;
            else monthDays1=31+29+31+30;
          }
          if(month1==6){
            if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
            monthDays1=31+28+31+30+31;
            else monthDays1=31+29+31+30+31;
          }
          if(month1==7){
            if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
            monthDays1=31+28+31+30+31+30;
            else monthDays1=31+29+31+30+31+30;
          }
          if(month1==8){
            if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
            monthDays1=31+28+31+30+31+30+31;
            else monthDays1=31+29+31+30+31+30+31;
          }
          if(month1==9){
            if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
            monthDays1=31+28+31+30+31+30+31+31;
            else monthDays1=31+29+31+30+31+30+31+31;
          }
          if(month1==10){
            if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
            monthDays1=31+28+31+30+31+30+31+31+30;
            else monthDays1=31+29+31+30+31+30+31+31+30;
          }
          if(month1==11){
            if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
            monthDays1=31+28+31+30+31+30+31+31+30+31;
            else monthDays1=31+29+31+30+31+30+31+31+30+31;
          }
          if(month1==12){
            if((that.state.fromFullDate.substring(5, that.state.toFullDate.length)+2)%4!=0)
            monthDays1=31+28+31+30+31+30+31+31+30+31+30;
            else monthDays1=31+29+31+30+31+30+31+31+30+31+30;
          }

          var fullDateNumber1 = 0;
          if(that.state.toFullDate.substring(1)=='/'){
            fullDateNumber1=monthDays1+yearDays1+parseFloat(that.state.toFullDate.substring(0,1));
          }
          else{
            fullDateNumber1=monthDays1+yearDays1+parseFloat(that.state.toFullDate.substring(0,2));
          }
          console.log(fullDateNumber);
          var monthDays2 = 0;
          var yearDays2 = 0;
          var month2=0;
          var thisFullDate = childSnapshot.val().Date;
          console.log(thisFullDate);

          if(that.state.thisFullDate.substring(2,3)=='/'){
            console.log(that.state.thisFullDate.substring(2,3));
            if(that.state.thisFullDate.substring(4,5)=='/'){
              console.log(that.state.thisFullDate.substring(4,5));
            month2 = that.state.thisFullDate.substring(3,4);
            yearDays2 = ((that.state.thisFullDate.substring(5,that.state.thisFullDate.length)-1)/4)*366+
            ((that.state.thisFullDate.substring(5,that.state.thisFullDate.length)-1)/4)*3*365+((that.state.thisFullDate.substring(5,that.state.thisFullDate.length)-1)%4)*365;
            }
            else if(that.state.thisFullDate.substring(5,6)=='/'){
              console.log(that.state.thisFullDate.substring(5,6));
            month2 = that.state.thisFullDate.substring(3,5);
            yearDays2 = ((that.state.thisFullDate.substring(6,that.state.thisFullDate.length)-1)/4)*366+
            ((that.state.thisFullDate.substring(6,that.state.thisFullDate.length)-1)/4)*3*365+((that.state.thisFullDate.substring(6,that.state.thisFullDate.length)-1)%4)*365;
            }
          }
          else{
            if(that.state.thisFullDate.substring(3,4)=='/'){
            month2 = that.state.thisFullDate.substring(2,3);
            yearDays2 = ((that.state.thisFullDate.substring(4,that.state.thisFullDate.length)-1)/4)*366+
            ((that.state.thisFullDate.substring(4,that.state.thisFullDate.length)-1)/4)*3*365+
           ((that.state.thisFullDate.substring(4,that.state.thisFullDate.length)-1)%4)*365 ;
          }
          else if(that.state.thisFullDate.substring(4,5)=='/'){
            month2 = that.state.thisFullDate.substring(2,4);
            yearDays2 = ((that.state.thisFullDate.substring(5,that.state.thisFullDate.length)-1)/4)*366+
            ((that.state.thisFullDate.substring(5,that.state.thisFullDate.length)-1)/4)*3*365+
           ((that.state.thisFullDate.substring(5,that.state.thisFullDate.length)-1)%4)*365 ;
          }
          }

          console.log(month2);
          if(month2==1){
            monthDays2 = 0;
          }
          if(month2==2){
            monthDays2 = 31
          }
          if(month2==3){
            if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
            monthDays2=31+28;
            else monthDays2=31+29;
          }
          if(month2==4){
            if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
            monthDays2=31+28+31;
            else monthDays2=31+29+31;
          }
          if(month2==5){
            if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
            monthDays2=31+28+31+30;
            else monthDays2=31+29+31+30;
          }
          if(month2==6){
            if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
            monthDays2=31+28+31+30+31;
            else monthDays2=31+29+31+30+31;
          }
          if(month2==7){
            if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
            monthDays2=31+28+31+30+31+30;
            else monthDays2=31+29+31+30+31+30;
          }
          if(month2==8){
            if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
            monthDays2=31+28+31+30+31+30+31;
            else monthDays2=31+29+31+30+31+30+31;
          }
          if(month2==9){
            if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
            monthDays2=31+28+31+30+31+30+31+31;
            else monthDays2=31+29+31+30+31+30+31+31;
          }
          if(month2==10){
            if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
            monthDays2=31+28+31+30+31+30+31+31+30;
            else monthDays2=31+29+31+30+31+30+31+31+30;
          }
          if(month2==11){
            if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
            monthDays2=31+28+31+30+31+30+31+31+30+31;
            else monthDays2=31+29+31+30+31+30+31+31+30+31;
          }
          if(month2==12){
            if((that.state.fromFullDate.substring(5, thisFullDate.length)+2)%4!=0)
            monthDays2=31+28+31+30+31+30+31+31+30+31+30;
            else monthDays2=31+29+31+30+31+30+31+31+30+31+30;
          }
          console.log(monthDays2);
          console.log(yearDays2);
          var fullDateNumber2 = 0;
          if(thisFullDate.substring(1)=='/'){
            fullDateNumber2=monthDays1+yearDays1+parseFloat(thisFullDate.substring(0,1));
          }
          else{
            fullDateNumber2=monthDays1+yearDays1+parseFloat(thisFullDate.substring(0,2));
          }
          console.log(fullDateNumber2);
          console.log(fullDateNumber);
          console.log(fullDateNumber1);
          console.log(that.state);
          const {reports} = that.state;
         if(fullDateNumber2>=fullDateNumber&&fullDateNumber2<=fullDateNumber1){
           console.log(fullDateNumber2);
           var toTimeInMinutes = parseFloat(childSnapshot.val().ToTime.substring(0,2))*60+parseFloat(childSnapshot.val().ToTime.substring(3,5));
           var fromTimeInMinutes = parseFloat(childSnapshot.val().FromTime.substring(0,2))*60+parseFloat(childSnapshot.val().FromTime.substring(3,5));
           var totalTimeInMinutes = toTimeInMinutes-fromTimeInMinutes;
           console.log(that.state.thisFullDate);
           reports.push({
             day: that.state.thisFullDate,
             date: childSnapshot.val().Date,
             comments: childSnapshot.val().Comments,
             totalHours: totalTimeInMinutes/60
           });
           var i = 0;
           for(var j = 0; j<reports.length; j++){
             i = i+reports[j].totalHours;
           }
           that.setState({
             totalHoursInReport: i
           })
           console.log(reports);
           that.setState({
             reports: reports,
             column1Label:"Day",
             column2Label:"Date",
             column3Label:"Comments",
             column4Label:"Total Hours",
             column5Label:""
           },()=>{
             console.log(reports);
           })
         }
    }
  })
})
  })


}
 document.getElementById('generatedReportTable').style.display = "block";
 document.getElementById('tableID').style.display = "none";
 document.getElementById('statusReportTable1').style.display = "none";
 document.getElementById('totalHoursInDisplay').style.display = "none";
 document.getElementById('currentUserNameDivInCol2b').style.display = "none";
}
}

setDay(dayNumber){
  if(dayNumber==0){
    return(
      <td>Monday</td>
    )
  }
  else if(dayNumber==1){
    return(
      <td>Tuesday</td>
    )
  }
  else if(dayNumber==2){
    return(
      <td>Wednesday</td>
    )
  }
  else if(dayNumber==3){
    return(
      <td>Thursday</td>
    )
  }
  else if(dayNumber==4){
    return(
      <td>Friday</td>
    )
  }
  else if(dayNumber==5){
    return(
      <td>Saturday</td>
    )
  }
  else if(dayNumber==6){
    return(
      <td>Sunday</td>
    )
  }
}

closeReportsTable(){
  document.getElementById('generatedReportTable').style.display="none";
  document.getElementById('projectListDiv').style.display="block";

  document.getElementById('manageDiv').style.backgroundColor="white";
  document.getElementById('NewProjectID').style.display="block";
}

closeFormEditProject(){
  document.getElementById('projectsTableID1').style.display = "none";
  document.getElementById('projectListDiv').style.display = "block";
}

closeFormNewProject(){
  document.getElementById('projectsTableID').style.display = "none";
  document.getElementById('projectListDiv').style.display = "block";
}

showProjectsListAndHideAllElse(){
  document.getElementById('projectListDiv').style.display="block";
  document.getElementById('generatedReportTable').style.display="none";
  document.getElementById('currentUserNameDivInCol2b').style.display="none";
  document.getElementById('projectsTableID').style.display="none";
  document.getElementById('projectsTableID1').style.display="none";
  document.getElementById('bgTextID').style.display="none";
  document.getElementById('statusReportTable1').style.display="none";
  document.getElementById('TotalHoursInDisplayDiv').style.display="none";
  document.getElementById('totalHoursInDisplay').style.display="none";
  document.getElementById('tableID').style.display="none";

}

setTotalHours(){
  var h = 0;
  this.state.totalHours.map((hours) => {
     h= h+hours
  })
  this.setState({
    th: h
  })
}

  render() {
    var user = firebase.auth().currentUser;
    var ref = firebase.database().ref();
    var adminRole;
    var value;
    var userRole;
    const {projects} = this.state;
    if(!user.exists){
    ref.child('Users').orderByChild('Email').equalTo(user["email"]).once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
            value = childSnapshot.val();
            adminRole = value.Role;
            if(adminRole==='Admin'){
              document.getElementById('manageDiv').style.display = "block";
              console.log(document.getElementById('manageDiv').style.display);
              document.getElementById('manageDiv').style.background = "#FFFFFF";
              document.getElementById('column2row1').style.display="block";
              document.getElementById('NewProjectID').style.display="block";
            }
            if(adminRole==='User'){
              document.getElementById('manageDiv').style.display = "none";
              document.getElementById('manageDiv').style.background = "#FFFFFF";
              document.getElementById('u').style.display = "none";
              document.getElementById('o').style.display = "none";
              document.getElementById('p').style.display = "none";
              document.getElementById('projectListDiv').style.display="none";
            }
        });
      });
    }

    return(
      <div className="container-fluid my-container">
        <div className="row my-row1">
            <div className="col-md-2 my-col1a">
               <Col1a/>
            </div>
            <div className="col-md-10 my-col1b" id="column2row1">

            <div id = "DatesOfGeneratedReportDiv">Status Report {this.state.date}</div>
            <div class="wrapper" id="wrapperForInformation">
            <DatePicker id="fromDatePicker"
                 placeholderText="Start Date"
                 selected={this.state.fullFromDate}
                 onChange={this.setSelected1}
            />

              <DatePicker id="toDatePicker"
                   placeholderText="End Date"
                   selected={this.state.fullToDate}
                   onChange={this.setSelected2}
              />

              <div>
              <select className="form-control" id="projectnameDropdown" onChange={this.setSelected3}>
              <option value="Project Name">Project Name</option>
              {this.state.projectsForForm.map((project) => {
                return (
                 <option value={project.name}>{project.name}</option>
              )}
              )}
              </select>
              </div>
              <div>
              <select className="form-control" id="employeeDropdown" onChange={this.setSelected4}>
              <option value="User">User</option>
              {this.state.users.map((user) => {
                return (
                 <option value={user.name}>{user.name}</option>
              )}
              )}
              {this.state.selectedUsers.map((selectedUser) => {
                return (
                 <option value={selectedUser.name}>{selectedUser.name}</option>
                )}
              )}
              </select>
              </div>

             <div>
              <button id="generateReportButton" className="btn" onClick={this.generateReport}>Generate Report</button>
             </div>
            </div>
            </div>
            </div>
        <div className="row my-row2">
            <div className="col-md-2 my-col2a">
              <Col2a/>
            </div>
            <div className="col-md-10 my-col2b">

            <button className = "btn" id = "NewProjectID" style={{textAlign: 'center'}} onClick={this.openProjectsTable}>New Project</button>
            <div id = "currentUserNameDivInCol2b">{this.state.currentUserName}</div>


            <div id="projectsTableID" class="" >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">New Project</h4>
                  </div>
                  <div class="modal-body">
                  <div>Name</div>
                  <input class="form-control" id ="nameInput"></input>
                  <div>
                  <div>
                  Type
                  </div>
                  <select className="form-control" id = "typeDropDown">
                        <option>Client
                        </option>
                        <option>Internal
                        </option>
                  </select>
                  <div>
                  Users
                  </div>
                  <select className="form-control" value="Please select from below" id = "usersSelectOption" onChange={this.handleChange}>
                  <option value="Please select from below">Please select from below</option>
                  {this.state.users.map((user) => {
                    return (
                     <option value={user.name}>{user.name}</option>
                  )}
                  )}
                  </select>
                  <div id="selectedUser">
                  {this.state.selectedUsers.map((selectedUser) => {
                    return (
                     <div>{selectedUser.name}
                     <img id="cross" src={CrossImage}
                     onClick={()=>{this.removeUserFromProject(selectedUser)}}/>
                     </div>
                  )}
                  )}
                  </div>
                  </div>
                  </div>
                  <div class="modal-footer">
                    <button className="btn" class="btn btn-default" data-dismiss="modal" id="projectsSubmitButton" style={{textAlign: 'center'}} onClick={this.submitProject.bind(this)}>Submit</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal" onClick={this.closeFormNewProject}>Close form</button>
                  </div>
                </div>
              </div>
            </div>

            <div id = "newProjectTable">
              <div className = "container" id = "projectsTable">
                <div>New Project</div>
                <div>Name</div>
                <input id ="nameInput"></input>
                <div>
                <select className="form-control" id = "typeDropDown">
                      <option>Client
                      </option>
                      <option>Internal
                      </option>
                </select>
                </div>
                <div>
                <div>
                Users
                </div>
                <select className="form-control" value="Please select from below" id = "usersSelectOption" onChange={this.handleChange}>
                <option value="Please select from below">Please select from below</option>
                {this.state.users.map((user) => {
                  return (
                   <option value={user.name}>{user.name}</option>
                )}
                )}
                </select>
                <div id="selectedUser">
                {this.state.selectedUsers.map((selectedUser) => {
                  return (
                   <div>{selectedUser.name}
                   <img id="cross" src={CrossImage}
                   onClick={()=>{this.removeUserFromProject(selectedUser)}}/>
                   </div>
                )}
                )}
                </div>
                <div>
                <button className="btn" id="projectsSubmitButton" style={{textAlign: 'center'}} onClick={this.submitProject.bind(this)}>Submit</button>
                <button onClick={this.closeFormNewProject}>Close form</button>
                </div>
             </div>
            </div>



           <div id = "bgTextID">
             Specify a query to generate the report
             </div>
           </div>

           <div id="projectsTableID1" class="" >
             <div class="modal-dialog">
               <div class="modal-content">
                 <div class="modal-header">
                   <h4 class="modal-title">Edit Project</h4>
                 </div>
                 <div class="modal-body">
                 <div>Name
                 </div>
                 <div>
                  <input class="form-control" type="text" id ="nameInput1" onChange={(e) => {
                    this.setState({
                      name2: e.target.value,
                    })
                  }}></input>
                 </div>
                 <div>
                 <div>
                 Type
                 </div>
                 <select className="form-control" id = "typeDropDown1">
                   <option>Client</option>
                   <option>Internal</option>
                 </select>
                 <div>
                 Users
                 </div>
                 <select className="form-control" value="Please select from below" id = "usersSelectOption1" onChange={this.handleChange1}>
                 <option value="Please select from below">Please select from below</option>
                 {this.state.users.map((user) => {
                   return (
                    <option value={user.name}>{user.name}</option>
                 )}
                 )}
                 </select>
                 <div id="selectedUser1">
                 {this.state.selectedUsers.map((selectedUser) => {
                   return (
                    <div>{selectedUser.name}
                    <img id="cross" src={CrossImage}
                    onClick={()=>{this.removeUserFromProject(selectedUser)}}/>
                    </div>
                 )}
                 )}
                 </div>
                 </div>
                 </div>
                 <div class="modal-footer">
                   <button type="button" class="btn btn-default" id="projectsSubmitButton1" style={{textAlign: 'center'}} onClick={this.editProject}>Submit</button>
                   <button type="button" class="btn btn-default" onClick={this.closeFormEditProject}>Close form</button>
               </div>
             </div>
           </div>
           </div>


           <div id = "projectsTableID2">
             <div className = "container">
               <div>Edit Project</div>
               <div>Name
                <input type="text" id ="nameInput1" onChange={(e) => {
                  this.setState({
                    name2: e.target.value,
                  })
                }}></input>
               </div>
             <div>
               <select className="form-control" id = "typeDropDown1">
                 <option>Client</option>
                 <option>Internal</option>
               </select>
             </div>
             <div>
               <button className="btn" id="projectsSubmitButton1" style={{textAlign: 'center'}} onClick={this.editProject}>Submit</button>
             </div>
             <button onClick={this.closeFormEditProject}>Close form</button>
           </div>
           </div>

           <div id = "projectListDiv">
           {projects.map((project) => {
             return (
             <div id = "projectNameBox">
             {project.name}
             <img src={EditPencil} id="editPencil"
             onClick={()=>this.reopenProjectsTable(project.name, project.type, project.members)}/>
             <div id = "projectTypeBox">{project.type}
             </div>
             <div id="projectMembersBox">{project.members}
             </div>
             </div>
           )}
           )}
           </div>
            <div>

            <div id = "tableID">

            <button className = "btn" id="todayBtn" value="today" onClick={(e)=>this.saveDate(e)}>Today</button>
            <button className = "btn" id="yesterdayBtn" value="yesterday" onClick={(e)=>this.saveDate(e)}>Yesterday</button>
             <button id="addSessionBtn" onClick = {this.addRowToProjectTable}>Add another session</button>

             <table>

             <div style={{display:"flex"}} className="headings">
               <div id="typeLabel">Type</div>
               <div id="projectNameLabel">Project Name</div>
               <div id="commentsLabel">Comments</div>
               <div id="fromTimeLabel">From(AM/PM)</div>
               <div id="toTimeLabel">To(AM/PM)</div>
            </div>
              {this.renderEntryRows}
             </table>
             <div id="totalHours">
             {
               this.state.th = 0,
               this.state.totalHours.map((hours) => {
                  this.state.th= this.state.th+hours
               })
             }
             total hours: {this.state.th}
             </div>
             <div>
             <button id="submitButton" onClick = {this.submitReport}>Submit</button>
             </div>
            </div>

            <table id = "generatedReportTable" border="1">
            <div id="dates">{this.state.selectedFromDate}-{this.state.selectedToDate}</div>
            <button onClick={this.closeReportsTable}>Close Table</button>
            <tr>
               <th id="column1Label">{this.state.column1Label}</th>
               <th id="column2Label">{this.state.column2Label}</th>
               <th id="column3Label">{this.state.column3Label}</th>
               <th id="column4Label">{this.state.column4Label}</th>
               <th id="column5Label">{this.state.column5Label}</th>
            </tr>
            {this.state.reports.map((report) => {
              var keys = Object.keys(report);
              console.log(keys);
              if(keys[0]=="type"&&keys[1]=="userEmail"&&keys[2]=="date"&&keys[3]=="comments"&&keys[4]=="totalHours"){
              console.log("inside if");
              return (
                <tr>
                   <td>{report.type}</td>
                   <td>{report.userEmail}</td>
                   <td>{report.date}</td>
                   <td>{report.comments}</td>
                   <td>{report.totalHours}</td>
                </tr>
            )}
            if(keys[0]=="type"&&keys[1]=="date"&&keys[2]=="projectName"&&keys[3]=="comments"&&keys[4]=="totalHours"){
            console.log("inside if");
            return (

              <tr>
                 <td>{report.type}</td>
                 <td>{report.date}</td>
                 <td>{report.projectName}</td>
                 <td>{report.comments}</td>
                 <td>{report.totalHours}</td>
              </tr>
          )}
          if(keys[0]=="day"&&keys[1]=="date"&&keys[2]=="comments"&&keys[3]=="totalHours"){
            return (
              <tr>
                 {this.setDay(report.day)}
                 <td>{report.date}</td>
                 <td>{report.comments}</td>
                 <td>{report.totalHours}</td>
              </tr>
          )
          }
            }
            )}
            </table>
            <table id = "statusReportTable1" border = "1">
               <tr>
                  <th>Type</th>
                  <th>Project</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Comments</th>
               </tr>
               {this.state.projectEntries.map((projectEntry) => {
                 return (
                   <tr>
                      <td>{projectEntry.typeOfWork}</td>
                      <td>{projectEntry.projectName}</td>
                      <td>{projectEntry.fromTime}</td>
                      <td>{projectEntry.toTime}
                      { projectEntry.overtime?
                        <img src={Flag} style={{backgroundColor: "yellow"}}/> : console.log("no overtime")
                      }
                      </td>
                      <td>{projectEntry.comments}</td>
                   </tr>

               )}
               )}
            </table>
            <div id = "TotalHoursInDisplayDiv">
              Total Hours: {this.state.totalHoursInReport}
            </div>
            </div>
            </div>
            <table id = "statusReportTable1" border = "1">
               <tr>
                  <td>Type</td>
                  <td>Project</td>
                  <td>From</td>
                  <td>To</td>
                  <td>Comments</td>
               </tr>
               {this.state.projectEntries.map((projectEntry) => {
                 return (
                   <tr>
                      <td>{projectEntry.typeOfWork}</td>
                      <td>{projectEntry.projectName}</td>
                      <td>{projectEntry.fromTime}</td>
                      <td>{projectEntry.toTime}
                      { projectEntry.overtime?
                        <img src={Flag} style={{backgroundColor: "yellow"}}/> : console.log("no overtime")
                      }
                      </td>
                      <td>{projectEntry.comments}</td>
                   </tr>

               )}
               )}
            </table>
            <div id = "totalHoursInDisplay">
            {
              this.setTotalHours

            }
            Total Hours: {this.state.th}
            </div>
          </div>
          </div>
    )
  }
}


export default Home;
