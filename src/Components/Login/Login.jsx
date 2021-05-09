import React, { Component } from "react";
import "./Login.css";
import { db } from "../Firebase/Firebase";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userId: "",
      userName: "",
      userEmail: "",
      userPhotoURL: "",
    };
  }

  authenticateUser = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
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

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //creating user in firestore db
        // Add a new document in collection "cities"

        db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (!doc.exists) {
              db.collection("users")
                .doc(user.uid)
                .set(
                  {
                    userId: user.uid,
                    userName: user.displayName,
                    userEmail: user.email,
                    userPhotoURL: user.photoURL,
                    onlineStatus: true,
                    contacts: [],
                  },
                  { merge: true }
                )
                .then(() => {})
                .catch((error) => {
                  console.error("Error writing document: ", error);
                });
            }
          })
          .catch((error) => {
            console.log(error)
          });
          
        this.setState({
          userId: user.uid,
          isLoggedIn: true,
          userName: user.displayName,
          userEmail: user.email,
          userPhotoURL: user.photoURL,
        });
        this.props.updateUserLoginInfo(this.state);
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
          onClick={this.authenticateUser}
        >
          Login with Google
        </button>
      </div>
    );
  }
}

export default Login;
