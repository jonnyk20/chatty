import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImageDiv from './ImageDiv.jsx';

class Message extends Component {
  render() {
    this.messageColors = ['purple', 'blue', 'green', 'orange'];
    const imagePath = new RegExp(/https?:\/\/.*\.(?:png|jpg)/, 'ig');
    const foundImages = this.props.message.content.match(imagePath);
    let messageImages;
    let filteredString = this.props.message.content;
    if (foundImages !== null){
        messageImages = foundImages.map((match, index) => {
        return (<ImageDiv key={index} source={match} /> )
       })
       filteredString = this.props.message.content.replace(imagePath, '')
    }

    return (
      <div className="message">
        <span className={'message-username user-' + this.messageColors[this.props.message.userCycle]}>{this.props.message.username}</span>
        <span className="message-content">{filteredString}</span>
         { foundImages && messageImages}
      </div>
    );
  }
}
export default Message;

Message.propTypes = {
  message: PropTypes.object,
  cycleNumber: PropTypes.number
};