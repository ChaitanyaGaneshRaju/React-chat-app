import React, { Component } from "react";
import "./ChatSettings.css";
import logo from "../Rama.jpg";

class ChatSettings extends Component {
  render() {
    return (
      <div className="chat-right-panel">
        <div className="chat-right-panel-inner-white-panel">
          <div className="wrong-button">
            <i class="far fa-times-circle"></i>
          </div>

          <div className="display-picture">
            <img src={logo} alt="" />
          </div>
          <div className="search-button">
            <button>
              <i class="fas fa-search search-button-icon"></i>
              <label>Search messages</label>
            </button>
          </div>
          <div className="delete-chat">
              <button>Delete chat</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatSettings;
