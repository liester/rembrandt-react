import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as itemsActions from '../item/itemsActions.js';
import SimpleItem from "../item/SimpleItem.js";
import ShortItem from "../item/ShortItem";

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
};

class Buyer extends React.Component {
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
    const buyerId = this.props.match.params.buyerId;
    const buyerItems = Object.values(allItems).filter((item) => {
        return item.soldToBuyerId == buyerId;
    })

    return (
      <div className={ classes.container }>
        {Object.values(buyerItems).map((item, index) => <ShortItem item={ item } key={ index } />)}
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Buyer));
