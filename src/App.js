import React, { Component } from "react";
import "./App.css";
import logo from "./Rama.jpg";
import ChatList from "./Components/ChatList/ChatList";
import ChatFeed from "./Components/ChatFeed/ChatFeed";
import ChatSettings from "./Components/ChatSettings/ChatSettings";
import Login from "./Components/Login/Login";
import {db} from "./Components/Firebase/Firebase";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userId:"",
      userName: "",
      userEmail: "",
      userPhotoURL: "",
      usersList:[]
    };
  }

  searchUser=(e)=>{
    db.collection("users")
      .where("userId", "==", e.target.value)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let currentUsers=this.state.usersList;
          currentUsers.push(doc.data())
          this.setState({
            usersList:currentUsers
          })
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }


  updateUserLoginInfo = (userInfo) => {
    this.setState({
      loggedUser:userInfo,
      userId:userInfo.uid,
      isLoggedIn: userInfo.isLoggedIn,
      userName: userInfo.displayName,
      userEmail: userInfo.email,
      userPhotoURL: userInfo.photoURL,
    });
  };
  render() {
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
            <div className="chat-list-search">
              <input type="text" placeholder="Search or paste userId" onChange={(e)=>this.searchUser(e)} />
              {/* <i class="fas fa-user"></i>
              <i className="fas fa-users"></i>
              <i class="fas fa-search"></i> */}
            </div>
            <ChatList usersList={this.state.usersList}  loggedUser={this.state.loggedUser}/>
          </div>
        </div>
        <ChatFeed />
        <ChatSettings userLogout={this.updateUserLoginInfo}/>
      </div>
    );
  }
}

export default App;
