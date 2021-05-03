import firebase from 'firebase/app'
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDbm2aTKcYhqzIsqJv7R1IKd4Hm5cBUyzI",
  authDomain: "react-chat-app-f02a0.firebaseapp.com",
  projectId: "react-chat-app-f02a0",
  storageBucket: "react-chat-app-f02a0.appspot.com",
  messagingSenderId: "932860658148",
  appId: "1:932860658148:web:47fafd2d9785281fab47f1",
  measurementId: "G-0K1CJ38N22",
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

// Initialize Firebase
export {firebaseConfig,db}

