import React, { Component } from "react";
import "./ChatFeed.css";
import firebase from "firebase/app";
import { db } from "../Firebase/Firebase";

class ChatFeed extends Component {
  constructor(props){
    super(props);
    this.state={
      messages:[]
    }
  }

  //scroll to the bottom when user opens a contact or a new message entered
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate = () => {
    this.scrollToBottom();
  };

  sendMessage = (e) => {
    e.preventDefault();//preventing the default page refresh upon sending the message
    
    const dateAndTime=new Date();

    //creating document for each and every message at sender side
    db.collection("users")
      .doc(this.props.loggedUser.userId)
      .collection(this.props.currentContact.userId)
      .doc(`${dateAndTime}`)
      .set({
        toOrFrom: "to", //since sender side its to
        message: e.target.elements.chatinput.value,
        timeStamp: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .then((resolve) => {
        //clearing the chat input value after message successfully sent
        e.target.elements.chatinput.value = "";
      })
      .catch((reject) => {
        console.log("document rejected");
      });

    //creating document for each and every message at recevier side  
    db.collection("users")
      .doc(this.props.currentContact.userId)
      .collection(this.props.loggedUser.userId)
      .doc(`${dateAndTime}`)
      .set({
        toOrFrom: "from", //since receiver side it from
        message: e.target.elements.chatinput.value,
        timeStamp: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .then((resolve) => {
        e.target.elements.chatinput.value = "";
      })
      .catch((reject) => {
        console.log("document rejected");
      });


      //getting all the messages into the messages array

      let messages=[]

      db.collection("users")
      .doc(this.props.loggedUser.userId)
      .collection(this.props.currentContact.userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.data())
          messages.push(doc.data())
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
      

      //updating the messages array to the state
      this.setState({
        messages:messages
      })
  };

  render() {
    //for the first time when user login display the message "Click contact to have conversation"
    if (Object.keys(this.props.currentContact).length === 0) {
      return (
        <div className="chat-feed">
          <div className="chat-no-selected-user-display">
            <h3>Click a contact to have conversation</h3>
          </div>
          <div
            className="scroll-div"
            ref={(el) => {
              this.messagesEnd = el;
            }}
          ></div>
        </div>
      );
    }

    //when user opens a chat by clicking particular contact open the chat
    return (
      <div className="chat-feed">
        <div className="chat-contact-header">
          <div className="chat-contact-logo">
            <img src={this.props.currentContact.userPhotoURL} alt="" />
          </div>
          <div className="chat-contact-info">
            <label className="contact-name">{this.props.currentContact.userName}</label>
            <label className="online-status">{(this.props.currentContact.onlineStatus)?`online`:`offline`}</label>
          </div>
        </div>
        
        <div className="chat-messages">
          <label className="chat-date">30-04-2021</label>
          <div className="my-messages">
            <p>
              my I'm speech bubble
              asdasdbajhdbajjdbajshbdajbdjasbdjasbdajhsbdjashbdj{" "}
              <label>10:30</label>
            </p>
            <p>
              hello world <label>10:30</label>
            </p>
          </div>
          <div className="their-messages">
            <p>
              {" "}
              I'm speech bubble sdasdbaksdbakhdakdaasdasdasdasdasdadasdasdasda{" "}
              <label>10:30</label>
            </p>
            <p>
              hello world <label>10:30</label>
            </p>
          </div>
          <div
            ref={(el) => {
              this.messagesEnd = el;
            }}
          ></div>
        </div>
        
        
        
        
        
        <div className="chat-form">
          <i className="fas fa-paperclip insert-clip"></i>
          <form action="" onSubmit={(e) => this.sendMessage(e)}>
            <input
              id="chat-input"
              type="text"
              placeholder="Press Enter to send message"
              name="chatinput"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default ChatFeed;
