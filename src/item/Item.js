import React from 'react';
import PropTypes from 'prop-types';

class Item extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { item } = this.props;
    return (
      <React.Fragment>
        <span>{ item.description }</span>
      </React.Fragment>
    );
  }
}

export default Item;
