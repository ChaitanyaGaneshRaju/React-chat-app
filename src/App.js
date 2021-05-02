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
      isLoggedIn: false,
      userName: "",
      userEmail: "",
      userPhotoURL: "",
    };
  }

  updateUserLoginInfo = (userInfo) => {
    this.setState({
      isLoggedIn: userInfo.isLoggedIn,
      userName: userInfo.displayName,
      userEmail: userInfo.email,
      userPhotoURL: userInfo.photoURL,
    });
  };
  render() {
    console.log(this.state.isLoggedIn)
    if (this.state.isLoggedIn === false) {
      return <Login updateUserLoginInfo={this.updateUserLoginInfo} />;
    }
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
        <ChatSettings userLogout={this.updateUserLoginInfo}/>
      </div>
    );
  }
}

export default App;
