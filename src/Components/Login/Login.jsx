import React, { Component } from "react";
import "./Login.css";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

class Login extends Component {
  constructor(){
    super();
    this.state={
      isLoggedIn:false,
      userName:"",
      email:"",
      userPhotoURL:"",
    }
  }
  hello=()=>{

    this.setState({
      isLoggedIn:true
    })
  }
  authenticateUser = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        //var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        //var token = credential.accessToken;
        // The signed-in user info.
        //var user = result.user;
        // ...
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        //var errorCode = error.code;
        //var errorMessage = error.message;
        // The email of the user's account used.
        //var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        //var credential = error.credential;
        // ...
      });
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        this.setState({
          isLoggedIn:true,
          userName:user.displayName,
          email:user.email,
          userPhotoURL:user.photoURL
        })
        console.log(" User is signed in.");
      } else {
        console.log(" No user is signed in.");
      }
    });
  };

  render() {
    return (
      <div className="chat-login">
        <h1>React App Login</h1>
        <button
          className="loginBtn loginBtn--google"
          onClick={()=>this.authenticateUser()}
        >
          Login with Google
        </button>
      </div>
    );
  }
}

export default Login;
