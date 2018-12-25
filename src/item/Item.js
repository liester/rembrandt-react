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
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import Info from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as itemsActions from './itemsActions.js';
import { withRouter } from 'react-router';

const styles = theme => ({
  card: {
    maxWidth: 345,
    width: '100%',
    margin: '1em 0em',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
    match: PropTypes.object,
    itemsActions: PropTypes.object,
  };

  state = {
    expanded: false,
    isFlipped: false,
  };

  componentWillMount() {
    const itemId = this.props.match.params.id;
    this.props.itemsActions.getById(itemId);
  }

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
    // if (remainingTimeInSeconds === 1) {
    //   return 'Price Drop In: a second';
    // }
    // return `Price Drop In: ${moment.duration(remainingTimeInSeconds, 'seconds').humanize()}`;
    return `Price Drop In:${remainingTimeInSeconds} seconds`;
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

  render() {
    const { item, classes } = this.props;
    return (
      <React.Fragment>
        {item && (
          <Card className={classes.card}>
            <Flippy
              flipOnHover={false} // default false
              flipOnClick={false} // default false
              flipDirection="horizontal" // horizontal or vertical
              ref={r => (this.flippy = r)} // to use toggle method like this.flippy.toggle()
              // if you pass isFlipped prop component will be controlled component.
              // and other props, which will go to div
            >
              <FrontSide className={classes.noShadow}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      R
                    </Avatar>
                  }
                  action={
                    <IconButton onClick={() => this.flippy.toggle()}>
                      <Info />
                    </IconButton>
                  }
                  title={item.title}
                  subheader={item.auctionCompany}
                />
                <CardMedia
                  className={classes.media}
                  image={item.imageUrl}
                  title={item.title}
                />
              </FrontSide>
              <BackSide className={classes.noShadow}>
                <IconButton onClick={() => this.flippy.toggle()}>
                  <Info className={classes.infoButton} />
                </IconButton>
                <CardContent>
                  <Typography paragraph className={classes.description}>
                    Description:
                  </Typography>
                  <Typography paragraph>{item.description}</Typography>
                </CardContent>
              </BackSide>
            </Flippy>
            <CardContent>
              <div className={classes.buyInfo}>
                <Typography>
                  {this.renderStatus(item.status, classes)}
                </Typography>
                <Typography variant="h5">
                  Current Price: ${item.currentPrice}
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
                {/* <Typography>
                {this.renderTimeRemaining(item.secondsUntilDecrease)}
              </Typography> */}
              </div>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              <IconButton aria-label="Add to favorites">
                <FavoriteIcon onClick={this.handleFavoriteClick} />
              </IconButton>
              <IconButton aria-label="Share">
                <ShareIcon />
              </IconButton>
              {this.renderTotalViewers(item.totalViews, classes)}
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded,
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              />
            </CardActions>
          </Card>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ items }, { match }) => {
  const itemId = match.params.id;
  return {
    item: items.allItems[itemId],
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
