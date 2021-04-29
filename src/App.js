import React, { Component } from "react";
import "./App.css";
import logo from "./Rama.jpg";
import ChatList from "./Components/ChatList/ChatList";
import ChatFeed from "./Components/ChatFeed/ChatFeed";
import ChatSettings from "./Components/ChatSettings/ChatSettings";
import Login from "./Components/Login/Login";

class App extends Component {
  constructor() {
    super();
    this.state = {
      login: false,
    };
  }
  render() {
    if (this.state.login === false) return <Login />;
    return (
      <div className="app-container">
        <div className="chat-left-panel">
          <div className="my-info">
            <div className="my-logo">
              <img src={logo} alt="" />
            </div>
            <div className="user-name">
              <label>Hello</label>
            </div>
          </div>
          <div className="chat-list">
            <ChatList />
            <div className="chat-list-search">
              <input type="text" placeholder="Search" />
              {/* <i class="fas fa-user"></i>
              <i className="fas fa-users"></i>
              <i class="fas fa-search"></i> */}
            </div>
          </div>
        </div>
        <ChatFeed />
        <ChatSettings />
      </div>
    );
  }
}

export default App;
