import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Item from './Item';
import { startListeningToItems } from './itemDuck';

class AllItems extends React.Component {
  static propTypes = {
    allItems: PropTypes.array.isRequired,
    startListeningToItems: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      itemsUnsubscribe: props.startListeningToItems(),
    };
  }
  componentWillUnmount() {
    this.state.itemsUnsubscribe();
  }

  render() {
    const { allItems } = this.props;
    return (
      <React.Fragment>
        { allItems.map(item => <Item item={ item } key={ item.id }/>) }
      </React.Fragment>
    );
  }
}

function mapStateToProps({ items }) {
  return {
    allItems: items.allItems,
  };
}
export default connect(mapStateToProps, { startListeningToItems })(AllItems);
