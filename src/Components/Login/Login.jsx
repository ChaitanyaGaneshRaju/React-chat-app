import React, { Component } from "react";
import "./Login.css";
import {firebaseConfig} from "../Firebase/Firebase"

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

firebase.initializeApp(firebaseConfig);


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userName: "",
      userEmail: "",
      userPhotoURL: "",
    };
  }

  authenticateUser = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount=()=>{
    firebase.auth().onAuthStateChanged((user) => { // 👈
      if (user) {
        console.log(this)
        this.setState({
          isLoggedIn:true,
          userName:user.displayName,
          userEmail: user.email,
          userPhotoURL: user.photoURL,
        })
        this.props.updateUserLoginInfo(this.state);
        console.log("userSignedIn")
      } else {
        console.log(" No user is signed in.");
      }
    });    
  }

  render() {
    return (
      <div className="chat-login">
        <h1>React App Login</h1>
        <button
          className="loginBtn loginBtn--google"
          onClick={this.authenticateUser}
        >
          Login with Google
        </button>
      </div>
    );
  }
}

export default Login;
