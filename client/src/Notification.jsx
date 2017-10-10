import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Notification extends Component {
  render() {
    return (
        <div className="message system">
          {this.props.message.content}
        </div>
    );
  }
}

export default Notification;

Notification.propTypes = {
  message: PropTypes.object
};