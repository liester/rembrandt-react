import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Item from './Item';
import { startListeningToItems } from './itemDuck';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
};

class AllItems extends React.Component {
  static propTypes = {
    allItems: PropTypes.array.isRequired,
    startListeningToItems: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
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
    const { allItems, classes } = this.props;
    return (
      <div className={ classes.container }>
        {allItems.map(item => <Item item={ item } key={ item.id } />)}
      </div>
    );
  }
}

function mapStateToProps({ items }) {
  return {
    allItems: items.allItems,
  };
}
export default connect(mapStateToProps, { startListeningToItems })(withStyles(styles)(AllItems));
