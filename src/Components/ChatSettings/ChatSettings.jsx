import React, { Component } from "react";
import "./ChatSettings.css";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

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

        //clearing all the user info of the state
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

  componentDidMount = () => {
    //updating the state info with the current user
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
