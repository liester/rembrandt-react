import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {history} from '../common/storeConfig.js'

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
});

class Item extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
  };

  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  renderStatus = (status, classes) => {
    if (status === 'AVAILABLE') {
      return (
        <span className={ classes.itemAvailable }>Available</span>
      );
    } else {
      return (
        <span className={ classes.itemPassed }>Passed</span>
      );
    }
  };

  renderTimeRemaining = remainingTimeInSeconds => {
    // if (remainingTimeInSeconds === 1) {
    //   return 'Price Drop In: a second';
    // }
    // return `Price Drop In: ${moment.duration(remainingTimeInSeconds, 'seconds').humanize()}`;
    return `Price Drop In:${remainingTimeInSeconds} seconds`;
  };

  render() {
    const { item, classes } = this.props;
    return (
      <Card className={ classes.card }>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={ classes.avatar } onClick={()=>history.push(`/item/${item.id}`)}>
              R
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={ item.title }
          subheader={ item.auctionCompany }
        />
        <CardMedia
          className={ classes.media }
          image={ item.imageUrl }
          title={ item.title }
        />
        <CardContent>
          <Typography variant="h5">
            Current Price: ${item.currentPrice}
          </Typography>
          <Typography>
            {this.renderTimeRemaining(item.secondsUntilDecrease)}
          </Typography>
          <Typography>
            {this.renderStatus(item.status, classes)}
          </Typography>
        </CardContent>
        <CardActions className={ classes.actions } disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={ classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            }) }
            onClick={ this.handleExpandClick }
            aria-expanded={ this.state.expanded }
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={ this.state.expanded } timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Description:</Typography>
            <Typography paragraph>
              {item.description}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default withStyles(styles)(Item);
