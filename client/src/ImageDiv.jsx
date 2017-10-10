import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ImageDiv extends Component {
  render() {
    return (
      <div className="image">
        <a href={this.props.source}>
          <img src={this.props.source} />
        </a>
      </div>
    );
  }
}
export default ImageDiv;

ImageDiv.propTypes = {
  source: PropTypes.string
};