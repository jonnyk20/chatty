import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx'
import PropTypes from 'prop-types';

class MessageList extends Component {
  render() {
    const messages = this.props.messages;
    const messageList = messages.map((message) =>{
      if (message.type === 'incomingMessage' ){
        return (<Message  key={message.id} message={message} />
          )} else {
        return ( <Notification key={message.id} message={message} />
      )}
    }
  );
    return (
      <main className='messages'>
        {messageList}
      </main>
    );
  }
}
export default MessageList;

MessageList.propTypes = {
  messages: PropTypes.array,
  cycleNumber: PropTypes.number
};