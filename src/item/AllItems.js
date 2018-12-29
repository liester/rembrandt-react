import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as itemsActions from './itemsActions.js';
import Item from './Item.js';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
};

class AllItems extends React.Component {
  static propTypes = {
    allItems: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    itemsActions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.itemsActions.getAll();
  }


  render() {
    const { allItems, classes } = this.props;
    return (
      <div className={classes.container}>
        {Object.values(allItems).map(
          (item, index) => <Item key={index} item={item} />)}
      </div>
    );
  }
}

function mapStateToProps({ items }) {
  return {
    allItems: items.allItems,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    itemsActions: bindActionCreators(itemsActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(AllItems));
