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
import { Component } from 'react';
import TimeRangeSlider from 'react-time-range-slider';
import moment from "moment";
import TimePicker from 'react-time-picker';
import './compose.css';
import Col2a from './Col2a';
import Col1a from './Col1a';
import Home from './Home';


import {BrowserRouter as Router, Route, Link , Switch} from 'react-router-dom';

class Compose extends React.Component {

  constructor(props){
    super(props);
    var d = new Date();
    var month = d.getMonth();
    month = month+1;
    this.state={
       date:d.getDate()+"/"+month+"/"+d.getFullYear(),
       day:d.getDay().toString(),
       entries: [],
       projectEntries:[],
       totalHours: [],
       th: 0,
       projectsForForm:[],
       authUser: null
    }
    this.saveDate=this.saveDate.bind(this);
    this.addRowToProjectTable=this.addRowToProjectTable.bind(this);
    this.deleteEntry=this.deleteEntry.bind(this);
    this.saveProjectEntry=this.saveProjectEntry.bind(this);
    this.submitReport=this.submitReport.bind(this);
  }

/*componentWillMount(){
  let {projectsForForm}=this.state;
  var that = this;
  firebase.database().ref().child('Projects').once("value").then(function(snapshot){
    snapshot.forEach(function(childSnapshot) {
    var name1=childSnapshot.val().ProjectName;
    projectsForForm.push({name: name1});
    that.setState({
      projectsForForm: projectsForForm
    });
  });
});
}*/

componentDidMount(){
  firebase.auth().onAuthStateChanged((user) => {
     console.log('Auth state changed');
     console.log('user: ',user);
     if (user) {
       this.setState({authUser: user},()=>{
         if(this.state.authUser!=null)
         var emailCurrentUser = this.state.authUser.email;
         else
         var emailCurrentUser= firebase.auth().currentUser.email;
         var that = this;
         const {projectsForForm}=this.state;
         firebase.database().ref().child('Projects').once("value").then(function(snapshot){
           snapshot.forEach(function(childSnapshot) {
           var name1=childSnapshot.val().ProjectName;
           var projectMemberEmails = childSnapshot.val().ProjectMembers;
           var projectMemberEmailsArray=projectMemberEmails.split(',');
           var a = false;
           for(var i = 0; i<projectMemberEmailsArray.length; i++){
             if(emailCurrentUser==projectMemberEmailsArray[i])a =true;
           }
           if(a==true){
           projectsForForm.push({name: name1});
              that.setState({
               projectsForForm: projectsForForm
              });
            }
            });
         });
       });
     } else {
       this.setState({authUser: user},()=>{
         if(this.state.authUser!=null)
         var emailCurrentUser = this.state.authUser.email;
         else
         var emailCurrentUser= firebase.auth().currentUser.email;
         var that = this;
         const {projectsForForm}=this.state;
         firebase.database().ref().child('Projects').once("value").then(function(snapshot){
           snapshot.forEach(function(childSnapshot) {
           var name1=childSnapshot.val().ProjectName;
           var projectMemberEmails = childSnapshot.val().ProjectMembers;
           var projectMemberEmailsArray=projectMemberEmails.split(',');
           var a = false;
           for(var i = 0; i<projectMemberEmailsArray.length; i++){
             if(emailCurrentUser==projectMemberEmailsArray[i])a =true;
           }
           if(a==true){
           projectsForForm.push({name: name1});
              that.setState({
               projectsForForm: projectsForForm
              });
            }
            });
         });
       });
     }
  });

}

    saveDate(e){
      var d= new Date();
      var month = d.getMonth();
      month = month+1;
      if(e.target.value=="today"){
      console.log(d);
      console.log(d.getYear());
      console.log(d.getMonth());
      this.state.date = d.getDate()+"/"+month+"/"+d.getFullYear();
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
      this.state.fullDate=d;
      this.state.date = d.getDate()+"/"+month+"/"+d.getFullYear();
      }
      this.setState({
        date: this.state.date,
        day: this.state.day
      })
      console.log(this.state.date);
    }

    addRowToProjectTable(){
      const {entries} = this.state;
      const {projectEntries} = this.state;
      var that = this;
      entries.push({comments: "new"});
      projectEntries.push({
        typeOfWork:"",
        projectName:"",
        fromTime:"",
        toTime:"",
        comments:"",
        overtime: false
      })
      that.setState({
        entries: entries,
        projectEntries: projectEntries
      })
    }

    deleteEntry(index){
      console.log(index);
      const {entries}=this.state;
      entries.splice(index, 1);
      const {projectEntries} = this.state;
      projectEntries.splice(index, 1);
      const {totalHours} = this.state;
      totalHours.splice(index, 1);
      var newth = 0;
      this.state.totalHours.map((hours) => {
         newth= newth+hours
      })
      this.setState({
        entries: entries,
        projectEntries: projectEntries,
        th: newth
      })
    }

    saveProjectEntry(index, property, e){
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
          if(index>=1){
            if(projectEntries[index].toTime!=""){
              console.log("here");
          if((projectEntries[index].toTime>=e.target.value)&&(projectEntries[index-1].toTime!="")){
            if(projectEntries[index-1].toTime<e.target.value)
          projectEntries[index].fromTime=e.target.value;
            }
           }
            else{
              if(projectEntries[index-1].toTime!=""){
             if(projectEntries[index-1].toTime<=e.target.value){
             projectEntries[index].fromTime=e.target.value;
             }
           }
          }
        }
          else{
            if(projectEntries[index].toTime!=""){
            if((projectEntries[index].toTime>=e.target.value)){
            projectEntries[index].fromTime=e.target.value;
             }
            }
            else{
              projectEntries[index].fromTime = e.target.value;
            }
          }
        }
        else if(property=="toTime"){
        /*  console.log(index);
          if((index+1)>=projectEntries.length){
            if(projectEntries[index].fromTime!=""){
             if(projectEntries[index].fromTime<=e.target.value){
             projectEntries[index].toTime=e.target.value;
            }
          }
           else{*/
           if(projectEntries[index].fromTime!=""){
           if(projectEntries[index].fromTime<e.target.value)
             projectEntries[index].toTime=e.target.value;
           }
          /* }
        }*/
      /*   else{
           if(projectEntries[index+1].fromTime!=""){
             console.log("here 5");
           if((projectEntries[index].fromTime<=e.target.value)&&(projectEntries[index+1].fromTime>=e.target.value)){
               projectEntries[index].toTime=e.target.value;
            }
           }
           else{
             if((projectEntries[index].fromTime<=e.target.value)){
                 projectEntries[index].toTime=e.target.value;
              }
           }
         }*/
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
    }

    get renderEntryRows(){
          console.log("hello");
          const entries = this.state.entries;
          const {projectEntries} = this.state;
          if(entries.length == 0){
          entries.push({comments:"..."});
          projectEntries.push({
            typeOfWork:"",
            projectName:"",
            fromTime:"",
            toTime:"",
            comments:"",
            overtime: false
          })
          }
          console.log("entries array",entries);
          return(
            <div>
            {
              this.state.entries.map((entry, ind) => {
              return (
                <tr key="ind">
                <img src={CrossImage} onClick={()=>{this.deleteEntry(ind)}}/>
                <td>
                  <select value = {projectEntries.length!=0? projectEntries[this.state.entries.indexOf(entry)].typeOfWork: "Please select from below"} id="WorkTypeSelect" onChange={(e) => this.saveProjectEntry(this.state.entries.indexOf(entry), "typeOfWork", e)}>
                    <option value="Please select from below">Please select from below</option>
                    <option>WAW</option>
                    <option>WAH</option>
                  </select>
                </td>
                <td>
                <select value = {projectEntries.length!=0? projectEntries[this.state.entries.indexOf(entry)].projectName: "Please select from below"} id="ProjectNameSelect" onChange={(e) => this.saveProjectEntry(this.state.entries.indexOf(entry), "projectName", e)} >
                <option value="Please select from below">Please select from below</option>
                {console.log(this.state.projectsForForm)}
                {this.state.projectsForForm.map((project) => {
                  return (
                   <option value={project.name}>{project.name}</option>
                )}
                )}
                </select>
                </td>
                <td>
                <input value = {projectEntries.length!=0? projectEntries[this.state.entries.indexOf(entry)].comments: ""}  placeholder="Comments" id="commentsInput" onChange={(e) => this.saveProjectEntry(this.state.entries.indexOf(entry), "comments", e)}/>
                </td>
                <td>
                <input value = {projectEntries.length!=0? projectEntries[this.state.entries.indexOf(entry)].fromTime: ""}  type="time" id="fromTimeInput" onChange={(e) => this.saveProjectEntry(this.state.entries.indexOf(entry), "fromTime", e)}></input>
                </td>
                <td>
                <input value = {projectEntries.length!=0? projectEntries[this.state.entries.indexOf(entry)].toTime: ""}  type="time" id="toTimeInput" onChange={(e) => this.saveProjectEntry(this.state.entries.indexOf(entry), "toTime", e)}></input>
                </td>
                <td>
                <img src={Flag} onClick={(e) => this.saveProjectEntry(this.state.entries.indexOf(entry),"overtime", e)}/>
                </td>
                </tr>
            )}
           )}
           </div>
        )
      }

      submitReport(){
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
         })
         }
        document.getElementById('statusReportTable1').style.display = "block";
        document.getElementById('TotalHoursInDisplayDiv').style.display="block";
        document.getElementById('tableID3').style.display="none";
      }

      logout(){
          fire.auth().signOut();
      }

closeSubmittedTable(){
  document.getElementById('statusReportTable1').style.display = "none";
  document.getElementById('TotalHoursInDisplayDiv').style.display="none";
  document.getElementById('tableID3').style.display="block";
}

  render(){
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

             <div id = "DatesOfGeneratedReportDiv3">Status Report {this.state.date}</div>
             <div id = "tableID3">

             <button className = "btn" id="todayBtn" value="today" onClick={(e)=>this.saveDate(e)}>Today</button>
             <button className = "btn" id="yesterdayBtn" value="yesterday" onClick={(e)=>this.saveDate(e)}>Yesterday</button>
              <button id="addSessionBtn" onClick = {this.addRowToProjectTable}>Add another session</button>

              <table className="table">

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
                  if(parseFloat(hours)==hours)
                   this.state.th= this.state.th+hours
                })
              }
              total hours: {this.state.th}
              </div>
              <div>
              <button id="submitButton" onClick = {this.submitReport}>Submit</button>
              </div>
             </div>
             <table id = "statusReportTable1" className="table table-bordered">
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
             {console.log(this.state.th)}
             <div id = "TotalHoursInDisplayDiv">
               Total Hours: {this.state.th}
             </div>
             </div>
             </div>
             </div>

    )
  }

}

export default Compose;
