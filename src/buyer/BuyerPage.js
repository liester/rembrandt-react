import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as itemsActions from '../item/itemsActions.js';
import ShortItem from '../item/ShortItem.js';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { history } from '../common/storeConfig.js';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  muchEmpty: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
};

class BuyerPage extends React.Component {
  static propTypes = {
    allItems: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    itemsActions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.itemsActions.getAll();
  }

  renderMuchEmpty = () => {
    return (
      <div className={ this.props.classes.muchEmpty }>
        <img src="../images/travolta.gif" style={{ width: '100%' }} />
        <Typography variant="h4" color="inherit" noWrap>
          Wow, such empty.
        </Typography>
        <Button variant="contained" color="primary" onClick={ () => history.push('/') } >
          What's for Sale?
        </Button>
      </div>
    );
  };

  render() {
    const { allItems, classes } = this.props;
    const userId = this.props.match.params.userId;
    const buyerItems = Object.values(allItems).filter(item => {
      return item.soldTouserId === userId;
    });

    return (
      <div className={ classes.container }>
        {!buyerItems.length && this.renderMuchEmpty()}
        {Object.values(buyerItems).map((item, index) => <ShortItem item={ item } key={ index } />)}
      </div>
    );
  }
}

const mapStateToProps = ({ items }) => {
  return {
    allItems: items.allItems,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    itemsActions: bindActionCreators(itemsActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BuyerPage));
