import React, { Component } from 'react';
import NavBar from './navBar.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Notification from './notification.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.socket = "";
    //this.handleKeyPress = this.handleKeyPress.bind(this);
    this.id = 4

    this.addMessage = this.addMessage.bind(this);
    this.userNameChange = this.userNameChange.bind(this);

    this.state = {
      currentUser: {name: 'Anonymous'}, // If currentUser is not defined, it means the user is Anonymous
      messages: [],
      notifications: [],
      numClients: 1
    }
  }


  addMessage(message) {
    const uuidv4 = require('uuid/v4');
    const oldMSG = this.state.messages;
    const newMSG = { type: 'message', id: uuidv4(), username: this.state.currentUser.name, content: message};
    //const allMSG = oldMSG.concat(newMSG);
    this.socket.send(JSON.stringify(newMSG))

  }

  userNameChange(name) {
    const uuidv4 = require('uuid/v4');
    const newMSG = { type: 'notification', id: uuidv4(), username: this.state.currentUser.name, content: `changed their name to ${name}`};
    this.setState({currentUser: {name: name}});
    this.socket.send(JSON.stringify(newMSG))

  }


    componentDidMount() {

    this.socket = new WebSocket("ws://localhost:8080");
    //console.log("componentDidMount <App />");

    // this.socket.onopen = (event) => {
    //   this.setState({numClients: this.state.numClients + 1})
    //   //const parsedMsgs = JSON.parse(event.data);
    //   console.log('Connected to server')
    // }

    this.socket.onmessage = (event) => {

      const parsedMsgs = JSON.parse(event.data);
      console.log('PARSED MESSAGES', parsedMsgs);
      if (parsedMsgs.type === 'message' || parsedMsgs.type === 'notification') {
        const messages = this.state.messages.concat(parsedMsgs);

        console.log('concatted messages', messages);
        this.setState({messages: messages})


    } if (parsedMsgs.type === 'userConnected'){
        this.setState({numClients: parsedMsgs.onlineNumber})
    }
    // if (){

    // }
    else {
      console.log('users', this.state.numClients);
    }
  }

    // this.socket.onclose = (event) => {
    //   const parsedMsgs = JSON.parse(event.data);
    //   this.setState({numClients: numClients - 1})
    // }
  }

  render() {
    const { messages } = this.state
    return (
      <div>
      <NavBar numClients = {this.state.numClients} />
      <ChatBar socket = {this.socket} currentUser = { this.state.currentUser } message = { this.onChange } addMessage = { this.addMessage.bind(this) } userNameChange = { this.userNameChange }/>
      <Message/>
      <MessageList messages = { this.state }/>
      </div>
    );
  }
}

export default App;