import React, { Component } from "react";
import logo from "../Rama.jpg";
import "./ChatList.css";

class ChatList extends Component {
  render() {
    return (
      <div>
        <div className="chat-contact chat-contact-active">
          <div className="chat-contact-individual-logo">
            <img src={logo} alt="" />
          </div>
          <div className="chat-contact-message-details">
            <label className="chat-contact-name">Lord Rama</label>
            <label className="chat-contact-message">hello world</label>
          </div>
          <div className="chat-contact-message-time">
            <label>10:30</label>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatList;
