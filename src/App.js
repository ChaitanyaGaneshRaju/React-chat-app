import React, { Component } from "react";
import "./App.css";
import logo from "./Rama.jpg";
import ChatList from "./Components/ChatList/ChatList";
import ChatFeed from "./Components/ChatFeed/ChatFeed";
import ChatSettings from "./Components/ChatSettings/ChatSettings";
import Login from "./Components/Login/Login";
import { db } from "./Components/Firebase/Firebase";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userId: "",
      userName: "",
      userEmail: "",
      userPhotoURL: "",
      usersList: [],
      clickedUser: {},
    };
  }

  //this method is userful to open chat with the particular contact upon clicking on the chat list
  onUserClick = (localClickedUser) => {
    this.setState({
      clickedUser: localClickedUser,
    });
  };


  //listcontacts to list the contacts of the user in chatlist

  listContacts = () => {
    console.log(localStorage.getItem("userId"));
    db.collection("users")
      .doc(this.state.userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
  };


  //this method is useful when user search for a contact by using their id
  searchUser = (e) => {
    //let userContacts=[]
    if (e.target.value === "") {
      this.listContacts();
    }

    //searching user collection by userId
    db.collection("users")
      .where("userId", "==", e.target.value)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let currentUsers = this.state.usersList;
          currentUsers.push(doc.data());
          this.setState({
            usersList: currentUsers,
          });
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  //updating the user login info to the state
  updateUserLoginInfo = (userInfo) => {
    this.setState({
      loggedUser: userInfo,
      userId: userInfo.userId,
      isLoggedIn: userInfo.isLoggedIn,
      userName: userInfo.userName,
      userEmail: userInfo.email,
      userPhotoURL: userInfo.userPhotoURL,
    });
    console.log(userInfo);
    localStorage.setItem("userId", userInfo.userId);
  };

  render() {
    //If user is not logged in redirect to the signin page
    if (this.state.isLoggedIn === false) {
      return <Login updateUserLoginInfo={this.updateUserLoginInfo} />;
    }

    //else diplay the home page
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
              <input
                type="text"
                placeholder="Search or paste userId"
                onChange={(e) => this.searchUser(e)}
              />
            </div>

            {/* Chat list passing props which are userlist to display the list f users
            
            logged user to have logged user information

            onUserClick method to update the userlist back in this app when user search for a contact

            */}
            <ChatList
              usersList={this.state.usersList}
              loggedUser={this.state.loggedUser}
              onUserClick={this.onUserClick}
            />
          </div>
        </div>

        {/* 
          
          chatfeed having the prop current contact with whom the logged user is chatting and loggeduser info

          */}

        <ChatFeed
          currentContact={this.state.clickedUser}
          loggedUser={this.state.loggedUser}
        />
        {/* 
        
        UserLogout prop to make the user logout but updating the user login info

        */}
        <ChatSettings userLogout={this.updateUserLoginInfo} />
      </div>
    );
  }
}

export default App;
