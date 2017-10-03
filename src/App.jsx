import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          id: 2,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    }
    this.onSubmitMessage = this.onSubmitMessage.bind(this)
  }


  onSubmitMessage(newMessage){
    this.setState({
      messages: this.state.messages.concat(newMessage)
    })
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
