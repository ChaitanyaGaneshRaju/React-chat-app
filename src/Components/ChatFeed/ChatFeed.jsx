import React, { Component } from "react";
import "./ChatFeed.css";
import logo from "../Rama.jpg";

class ChatFeed extends Component {
  render() {
    return (
      <div className="chat-feed">
        <div className="chat-contact-header">
          <div className="chat-contact-logo">
            <img src={logo} alt="" />
          </div>
          <div className="chat-contact-info">
            <label className="contact-name">Lord Rama</label>
            <label className="online-status">Online</label>
          </div>
        </div>
        <div className="chat-messages">
          <div className="my-messages">
            <p>my I'm speech bubble asdasdbajhdbajjdbajshbdajbdjasbdjasbdajhsbdjashbdj</p>
            <p>hello world</p>
          </div>
          <div className="their-messages">
            <p> I'm speech bubble sdasdbaksdbakhdakdaasdasdasdasdasdadasdasdasda</p>
            <p>hello wrold</p>
          </div>
        </div>
        <div className="chat-form">
          <i className="fas fa-paperclip insert-clip"></i>
          <input type="text" placeholder="Press Enter to send message" />
        </div>
      </div>
    );
  }
}

export default ChatFeed;
