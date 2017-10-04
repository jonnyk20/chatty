import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className='online-users'> {this.props.userCount} User(s) Online </span>
      </nav>
    );
  }
}
export default Header;

Header.propTypes = {
  userCount: PropTypes.number
};