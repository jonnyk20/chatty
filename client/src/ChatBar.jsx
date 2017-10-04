import React, {Component} from 'react';
import PropTypes from 'prop-types';



class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: '',
      user: this.props.user.name
    }
  }  

  render() {
    return (
      <footer className='chatbar'>
          <input 
            onKeyPress={(event) => {
              if(event.key === 'Enter') {
                this.onHandleUserSubmit(event)
              }
            }}
            onBlur={(event) => this.onHandleUserSubmit(event)}
            className='chatbar-username' 
            value={this.state.user}
            onChange={(event) => this.onUserChange(event)}
          />

          <input
            className='chatbar-message' 
            value={this.state.message} 
            onChange={(event) => this.onMessageChange(event)}
            onKeyPress={(event) => {
              if(event.key === 'Enter') {
                this.onHandleMessageSubmit(event)
              }
            }}
          />
      </footer>
    );
  }

  onMessageChange(e){
    this.setState({
      message: e.target.value
    })
  }

  onHandleMessageSubmit(event){
    event.preventDefault();
    this.props.onSubmitMessage({
      type: 'postMessage',
      username: this.state.user, 
      content: this.state.message,
      userCycle: this.props.cycleNumber
    })
  }

  onUserChange(e){
    this.setState({
      user: e.target.value
    })
  }

  onHandleUserSubmit(event){
    event.preventDefault();
    this.props.onNewUsername(this.state.user)
  }

}
export default ChatBar;

ChatBar.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  onSubmitMessage: PropTypes.func,
  onNewUsername: PropTypes.func,
  cycleNumber: PropTypes.number
};