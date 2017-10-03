import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Header from './Header.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'}, 
      messages: [],
      userCount: 0
    }
    this.onSubmitMessage = this.onSubmitMessage.bind(this)
    this.onNewUsername = this.onNewUsername.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.onNewMessage = this.onNewMessage.bind(this)
    this.onUserCountChange = this.onUserCountChange.bind(this)
  }

  onNewUsername(newUsername) {
    const oldUsername = this.state.currentUser.name;
    if (oldUsername === newUsername) { return; }
    this.socket.send(JSON.stringify({
      type: 'postNotification',
      content: `${oldUsername} changed username to ${newUsername}`
    }))
    this.setState({
      currentUser: {name: newUsername}
    });
  }

  onSubmitMessage(newMessage){
    this.socket.send(JSON.stringify(newMessage))
  }
  
  componentDidMount(){
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onmessage = (event) => {
      const incomingMessage = JSON.parse(event.data)
      this.onNewMessage(incomingMessage);
      if (incomingMessage.newCount) {
        this.onUserCountChange(incomingMessage.newCount);
      }
    }
  }
  onNewMessage(newMessage) {
    this.setState({
      messages: this.state.messages.concat(newMessage)
    });
  }
  onUserCountChange(newCount) {
    this.setState({
      userCount: newCount
    })
  }

  render() {
    return (
      <div>
        <Header userCount={this.state.userCount}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar 
          user={this.state.currentUser} 
          onSubmitMessage={this.onSubmitMessage}
          onNewUsername={this.onNewUsername}
        />
      </div>
    );
  }
}
export default App;
