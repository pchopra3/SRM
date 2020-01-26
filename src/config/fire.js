import Rebase from 'rebase';
import firebase from 'firebase';

var app_fireBase = {};
const firebaseConfig = {
  apiKey: "AIzaSyDDq1_1gEWC5N511snwy_b8-_Au1y8-XAw",
  authDomain: "projectkc-666e3.firebaseapp.com",
  databaseURL: "https://projectkc-666e3.firebaseio.com",
  projectId: "projectkc-666e3",
  storageBucket: "",
  messagingSenderId: "374769226120",
  appId: "1:374769226120:web:715edaf7df6615cc"
}
  // Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

  //const app = firebase.initializeApp(firebaseConfig);
  //var React = require('react');
  //var createReactClass = require('create-react-class');
  //const base = Rebase.createReactClass(app.database());

export {fire}

//export  { base }
