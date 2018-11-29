import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {trimText} from "../utils";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {history} from "../common/storeConfig";

const styles = theme => ({
  actions: {
    display: 'flex',
  },
  card: {
    display: 'flex',
    height: '154px',
    marginTop: '10px',
    width: "100%",
    maxWidth: '330px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  countdown: {},
  playIcon: {
    height: 38,
    width: 38,
  },
  itemPassed: {
    color: red[500],
  },
  icon: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  },
  itemAvailable: {
    color: green[500],
  },
  itemFavorited: {
    color: red[300],
  },
  itemSold: {
    color: red[500],
  }
});


class ShortItem extends Component {

  state = {countdownTextColor: 'textPrimary'};

  interval = null;

  handleFavoriteClick = () => {
    this.setState(state => ({ itemFavorited: !state.itemFavorited }));
  };

  renderStatus = (status, classes) => {
    if (status === 'AVAILABLE') {
      return (
          <span className={classes.itemAvailable}>Available</span>
      );
    } else if (status === 'PASSED'){
      return (
          <span className={classes.itemPassed}>Passed</span>
      )
    } else {
      return (
          <span className={classes.itemSold}>Sold</span>
      )
    }
  };

  flashRedInFinalSeconds = (secondsLeft) => {
    const startFlashingAt = 60;
    if (secondsLeft < startFlashingAt && this.interval == null) {
      this.interval = setInterval(this.toggleCountdownTextColor(), 250);
    }
    else if (secondsLeft >= startFlashingAt && this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
    }

  };

  toggleCountdownTextColor = () => {
    if (this.state.countdownTextColor === 'textPrimary') {
      this.setState(state => ({countdownTextColor: 'error'}));
    }
    else {
      this.setState(state => ({countdownTextColor: 'textPrimary'}));
    }
  };

  renderTimeRemaining = remainingTimeInSeconds => {
    // if (remainingTimeInSeconds === 1) {
    //   return 'Price Drop In: a second';
    // }
    // return `Price Drop In: ${moment.duration(remainingTimeInSeconds, 'seconds').humanize()}`;
    this.flashRedInFinalSeconds(remainingTimeInSeconds);
    return `drops in: ${remainingTimeInSeconds} seconds`;
  };

  render() {
    const {key, item, classes, theme} = this.props;

    return (
        <Card className={classes.card}>
          <CardMedia
              className={classes.cover}
              image={item.imageUrl}
              title={item.title}
              onClick={()=>history.push(`/item/${item.id}`)}
          />
          <div className={classes.details}>
            <CardContent className={classes.content} onClick={()=>history.push(`/item/${item.id}`)}>
              <Typography component="h6" variant="h6">
                {trimText(item.title, 20)}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {trimText(item.description, 20)}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              <div className={classes.countDown}>
                <Typography variant="h5">
                  ${item.currentPrice}
                </Typography>
                <Typography color={this.state.countdownTextColor}>
                  {this.renderTimeRemaining(item.secondsUntilDecrease)}
                </Typography>
                <Typography>
                  {this.renderStatus(item.status, classes)}
                </Typography>
              </div>
              <div>
                <IconButton aria-label="Add to favorites"
                            className={classes.icon}>
                  <FavoriteIcon className={{[classes.itemFavorited]: this.state.itemFavorited}}
                  onClick={this.handleFavoriteClick}/>
                </IconButton>
              </div>
            </div>
          </div>
        </Card>
    );
  }
}

ShortItem.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(ShortItem);
