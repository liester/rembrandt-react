import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import VisibleIcon from '@material-ui/icons/Visibility';
import Info from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button'
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
