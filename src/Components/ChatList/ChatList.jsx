import React, { Component } from "react";
import "./ChatList.css";
import firebase from "firebase/app";
import { db } from "../Firebase/Firebase";

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedUser: this.props.loggedUser,
      usersList: this.props.usersList,
    };
  }

  chatWithContact = (e) => {

    //updating the contacts list when the user clicks on the contact
    db.collection("users")
    .doc(this.state.loggedUser.userId)
    .update({
      contacts: firebase.firestore.FieldValue.arrayUnion(this.state.usersList[0].userId),
    });

    //creating a document of the contact with the following fields
    db.collection("users")
      .doc(this.state.loggedUser.userId)
      .collection(this.state.usersList[0].userId)
      .doc("last profile check")
      .set(
        {
          toOrFrom: "",
          message: "",
          timeStamp: firebase.firestore.Timestamp.fromDate(new Date()),
          isSeenMessage: "",
        },
        { merge: true }
      )
      .then((resolve) => {
        console.log("document entered");
      })
      .catch((reject) => {
        console.log("document rejected");
      });
    
    //whenever user clicks on the contact updating the userslist back to the app to open the chat feed
    this.props.onUserClick(this.state.usersList[0]);
  };
  render() {

    //removing the chatlist when the seach bar is empty
    if (document.getElementById("chat-list") !== null)
      document.getElementById("chat-list").remove();

    //diplaying the all contacts in the chat list of userList of this state
    return this.state.usersList.map((user, index) => {
      return (
        <div id="chat-list" key={index}>
          <div className="chat-contact chat-contact-active">
            <div className="chat-contact-individual-logo">
              <img src={user.userPhotoURL} alt="" />
            </div>
            <div className="chat-contact-message-details">
              <label
                className="chat-contact-name"
                onClick={(e) => this.chatWithContact(e)}
              >
                {user.userName}
              </label>
            </div>
          </div>
        </div>
      );
    });
  }
}

export default ChatList;
