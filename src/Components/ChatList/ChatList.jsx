import React, { Component } from "react"
import "./ChatList.css";
import {db} from "../Firebase/Firebase"

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedUser:this.props.loggedUser,
      usersList: this.props.usersList,
    };
  }
  chatWithContact = () => {
    db.collection("users").doc(this.state.loggedUser.userId)
  };
  render() {
    return this.state.usersList.map((user) => {
      return (
        <div key={user.uid}>
          <div className="chat-contact chat-contact-active">
            <div className="chat-contact-individual-logo">
              <img src={user.userPhotoURL} alt="" />
            </div>
            <div className="chat-contact-message-details">
              <label className="chat-contact-name" onClick={() => this.chatWithContact()}>
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
