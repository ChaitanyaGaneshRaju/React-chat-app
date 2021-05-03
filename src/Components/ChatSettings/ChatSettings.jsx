import React, { Component } from "react";
import "./ChatSettings.css";
import logo from "../Rama.jpg";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import { db } from "../Firebase/Firebase";

class ChatSettings extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }

  userLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        this.props.userLogout({
          isLoggedIn: false,
          userId: "",
          userName: "",
          userEmail: "",
          userPhotoURL: "",
        });
      })
      .catch((error) => {
        // An error happened.
      });
  };
  getUser = () => {
    db.collection("users")
      .where("userId", "==", "uoEis1XDlDOeIAcSfJ3346cjRVw2")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  componentDidMount = () => {
    let user = firebase.auth().currentUser;

    if (user) {
      this.setState({
        userId: user.uid,
        isLoggedIn: true,
        userName: user.displayName,
        userEmail: user.email,
        userPhotoURL: user.photoURL,
      });
    } else {
      // No user is signed in.
    }
  };

  render() {
    this.getUser();
    return (
      <div className="chat-right-panel">
        <div className="chat-right-panel-inner-white-panel">
          <div className="wrong-button">
            <i className="far fa-times-circle"></i>
          </div>

          <div className="display-picture">
            <img src={this.state.userPhotoURL} alt="" />
          </div>
          <div className="search-button">
            <button>
              <i className="fas fa-search search-button-icon"></i>
              <label>Search messages</label>
            </button>
          </div>
          <div className="delete-chat">
            <button>Delete chat</button>
          </div>
          <div className="logout-chat">
            <button onClick={() => this.userLogout()}>Logout</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatSettings;
