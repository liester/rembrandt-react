import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
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

  // sortBy(key) {
  //   const {allItems} = this.props;
  //   switch (key) {
  //     case "priceLowToHigh":
  //       allItems.sort(this.compareFavoritedAndLowToHigh);
  //       break;
  //     default:
  //       allItems.sort(this.compareFavoritedHightToLow);
  //   }
  // }
  //
  // comparePriceLowToHigh(a, b) {
  //   const priceA = a.price;
  //   const priceB = b.price;
  //
  //   let comparison = 0;
  //   if (priceA > priceB) {
  //     comparison = 1;
  //   } else if (priceA < priceB) {
  //     comparison = -1;
  //   }
  //   return comparison;
  // }
  //
  // comparePriceHighToLow(a, b) {
  //   const priceA = a.price;
  //   const priceB = b.price;
  //
  //   let comparison = 0;
  //   if (priceA < priceB) {
  //     comparison = 1;
  //   } else if (priceA > priceB) {
  //     comparison = -1;
  //   }
  //   return comparison;
  // }
  //
  // compareFavoritedAndLowToHigh(a, b) {
  //   const favoriteA = this.state.favoritedItems.contains(a.id);
  //   const favoriteB = this.state.favoritedItems.contains(b.id);
  //
  //   let comparison = 0;
  //   if (favoriteA && !favoriteB) {
  //     comparison = 1;
  //   } else if (!favoriteA && favoriteB) {
  //     comparison = -1;
  //   } else {
  //     comparison = this.comparePriceLowToHigh(a, b);
  //   }
  //   return comparison;
  // }
  //
  // compareFavoritedHightToLow(a, b) {
  //   const favoriteA = a.favorite;
  //   const favoriteB = b.favorite;
  //
  //   let comparison = 0;
  //   if (favoriteA && !favoriteB) {
  //     comparison = 1;
  //   } else if (!favoriteA && favoriteB) {
  //     comparison = -1;
  //   } else{
  //     comparison = this.comparePriceHighToLow(a, b);
  //   }
  //   return comparison;
  // }

  render() {
    const {allItems, classes} = this.props;
    return (
        <div className={classes.container}>
          {Object.values(allItems).map(
              (item, index) => <ShortItem item={item} key={index}/>)}
        </div>
    );
  }
}

function mapStateToProps({items}) {
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
