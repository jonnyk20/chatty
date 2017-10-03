import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'}, 
      messages: []
    }
    this.onSubmitMessage = this.onSubmitMessage.bind(this)
    this.onUserChange = this.onUserChange.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.onNewMessage = this.onNewMessage.bind(this)
  }

  onUserChange(newUsername) {
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
      this.onNewMessage(JSON.parse(event.data))
    }
  }
  onNewMessage(newMessage) {
    this.setState({
      messages: this.state.messages.concat(newMessage)
    });
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages}/>
        <ChatBar 
          user={this.state.currentUser} 
          onSubmitMessage={this.onSubmitMessage}
          onUserChange={this.onUserChange}
        />
      </div>
    );
  }
}
export default App;
