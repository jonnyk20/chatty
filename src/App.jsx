import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
    this.onSubmitMessage = this.onSubmitMessage.bind(this)
  }


  onSubmitMessage(newMessage){
    this.socket.send(JSON.stringify(newMessage))
  }
  
  componentDidMount(){
    this.socket = new WebSocket('ws://localhost:3001');
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages}/>
        <ChatBar user={this.state.currentUser} onSubmitMessage={this.onSubmitMessage}/>
      </div>
    );
  }
}
export default App;
