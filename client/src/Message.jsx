import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
  render() {
    this.messageColors = ['purple', 'blue', 'green', 'orange']

    return (
      <div className="message">
        <span className={'message-username user-' + this.messageColors[this.props.message.userCycle]}>{this.props.message.username}</span>
        <span className="message-content">{this.props.message.content}</span>
      </div>
    );
  }
}
export default Message;

Message.propTypes = {
  message: PropTypes.object,
  cycleNumber: PropTypes.number
};