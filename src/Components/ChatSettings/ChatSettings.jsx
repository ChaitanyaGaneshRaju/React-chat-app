import React, { Component } from "react";
import "./ChatSettings.css";
import logo from "../Rama.jpg";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

class ChatSettings extends Component {
  userLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("signout");
        this.props.userLogout({
          isLoggedIn: false,
          userName: "",
          userEmail: "",
          userPhotoURL: "",
        });
      })
      .catch((error) => {
        // An error happened.
      });
  };
  render() {
    return (
      <div className="chat-right-panel">
        <div className="chat-right-panel-inner-white-panel">
          <div className="wrong-button">
            <i className="far fa-times-circle"></i>
          </div>

          <div className="display-picture">
            <img src={logo} alt="" />
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
