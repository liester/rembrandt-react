import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Item from './Item';
import * as itemsActions from './itemsActions.js';
import ShortItem from "./ShortItem";

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
    classes: PropTypes.object.isRequired,
    itemsActions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.itemsActions.getAll();
  }

  render() {
    const { allItems, classes } = this.props;
    return (
      <div className={ classes.container }>
        {allItems.map((item, index) => <ShortItem item={ item } key={ index } />)}
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AllItems));
