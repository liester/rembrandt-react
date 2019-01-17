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
import VisibleIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as itemsActions from './itemsActions.js';
import { withRouter } from 'react-router';
import moment from 'moment';

const styles = theme => ({
  card: {
    maxWidth: 345,
    width: '100%',
    margin: '1em 0em',
    height: '100%',
  },
  media: {
    width: '100%',
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  itemPassed: {
    color: red[500],
  },
  itemAvailable: {
    color: green[500],
  },
  watchingIcon: {
    color: red[500],
  },
  watchingText: {
    fontSize: 12,
  },
  watchingBlock: {
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noShadow: {
    boxShadow: 'none',
  },
  infoButton: {
    position: 'fixed',
    top: 30,
    right: 30,
  },
  itemFavorited: {
    color: red[300],
  },
  buyButton: {
    margin: '0 auto',
    marginTop: 20,
  },
  buyInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontWeight: 'bold',
  },
  itemSold: {
    color: red[500],
    fontWeight: 'bold',
  },
});

class Item extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    classes: PropTypes.object.isRequired,
    itemsActions: PropTypes.object,
  };

  state = {
    expanded: false,
    isFlipped: false,
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleFavoriteClick = () => {
    this.setState(state => ({ itemFavorited: !state.itemFavorited }));
  };

  renderStatus = (status, classes) => {
    if (status === 'AVAILABLE') {
      return <span className={classes.itemAvailable}>Available</span>;
    } else if (status === 'PASSED') {
      return <span className={classes.itemPassed}>Passed</span>;
    } else {
      return <span className={classes.itemSold}>Sold</span>;
    }
  };

  renderTimeRemaining = remainingTimeInSeconds => {
    const message = 'Price Drop In:';
    // if (remainingTimeInSeconds === 1) {
    //   return 'Price Drop In: a second';
    // }
    // return `Price Drop In: ${moment.duration(remainingTimeInSeconds, 'seconds').humanize()}`;
    // return `Price Drop In:${remainingTimeInSeconds} seconds`;
    const time = moment
      .utc(moment.duration(remainingTimeInSeconds, 's').asMilliseconds())
      .format('HH:mm:ss');

    return `${message} ${time}`;
  };

  renderTotalViewers = (totalViewers, classes) => {
    if (totalViewers > 5) {
      return (
        <div className={classes.watchingBlock}>
          <VisibleIcon className={classes.watchingIcon} />
          <span className={classes.watchingText}>
            &nbsp;&nbsp;{totalViewers}+ viewers!
          </span>
        </div>
      );
    } else {
      return null;
    }
  };

  buyItem = item => {
    this.props.itemsActions.buyItemById(item.id);
  };

  isAvailable = status => {
    return status === 'AVAILABLE';
  };

  render() {
    const { item, classes } = this.props;
    return (
      item && (
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {item && item.title.substring(0, 1)}
              </Avatar>
            }
            title={item.title}
            subheader={item.auctionCompany}
          />
          <CardMedia
            className={classes.media}
            image={item.imageUrl}
            title={item.title}
            component="img"
          />
          <CardContent>
            <div className={classes.buyInfo}>
              <Typography>{this.renderStatus(item.status, classes)}</Typography>
              <Typography variant="h5">
                {this.isAvailable(item.status)
                  && `Current Price: $${item.currentPrice}`}
                {!this.isAvailable(item.status) && `For: $${item.currentPrice}`}
              </Typography>
              <Typography variant="subtitle1">
                {this.isAvailable(item.status)
                  && this.renderTimeRemaining(item.secondsUntilDecrease)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                disabled={item.status !== 'AVAILABLE'}
                className={classes.buyButton}
                onClick={() => {
                  this.buyItem(item);
                }}
              >
                Buy This!
              </Button>
            </div>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Item ID: {item.id}</Typography>
              <Typography paragraph>Description:</Typography>
              <Typography paragraph>{item.description}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      )
    );
  }
}

const mapStateToProps = ({ items }, wrapperProps) => {
  return {
    item: items.allItems[wrapperProps.item.id],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    itemsActions: bindActionCreators(itemsActions, dispatch),
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Item))
);
