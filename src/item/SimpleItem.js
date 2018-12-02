import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as itemsActions from './itemsActions.js';
import { withRouter} from 'react-router'

const styles = theme => ({
  card: {
    maxWidth: 345,
    width: '100%',
    margin: '1em 0em',
  },
  
});

class SimpleItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
  };

  state = {
    expanded: false,
  };

  componentWillMount() {
    const itemId = this.props.match.params.id;
    this.props.itemsActions.getById(itemId);
  }
render() {
    const { item, classes } = this.props;
    return (
      <React.Fragment>
        {item &&
          <Card className={classes.card}>
            
           </Card>
        }</React.Fragment>
    );
  }
}

const mapStateToProps = ({items}, {match} )=> {
  const itemId = match.params.id;
  return {
    item: items.allItems[itemId]
  };
};


const mapDispatchToProps = dispatch => {
  return {
    itemsActions: bindActionCreators(itemsActions, dispatch),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SimpleItem)));
