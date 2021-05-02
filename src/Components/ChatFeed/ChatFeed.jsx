import React, { Component } from "react";
import "./ChatFeed.css";
import logo from "../Rama.jpg";

class ChatFeed extends Component {

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  
  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }
  
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
          <label className="chat-date">30-04-2021</label>
          <div className="my-messages">
            <p>my I'm speech bubble asdasdbajhdbajjdbajshbdajbdjasbdjasbdajhsbdjashbdj <label>10:30</label></p>
            <p>hello world <label>10:30</label></p>
          </div>
          <div className="their-messages">
            <p> I'm speech bubble sdasdbaksdbakhdakdaasdasdasdasdasdadasdasdasda <label>10:30</label></p>
            <p>hello world <label>10:30</label></p>
          </div>
          <div ref={(el) => { this.messagesEnd = el; }}></div>
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
