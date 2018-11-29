import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import {trimText} from "../utils";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";

const styles = theme => ({
  card: {
    display: 'flex',
    height: '154px',
    marginTop: '10px',
    width: "100%",
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
  itemAvailable: {
    color: green[500],
  },
});

// https://cdn-az.allevents.in/banners/bf3d43247e063472a0f82054176a2b71-rimg-w720-h479-gmir.jpg

class ShortItem extends Component {

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
    return `drops in: ${remainingTimeInSeconds} seconds`;
  };

  render() {
    const { key, item, classes, theme } = this.props;

    return (
        <Card className={classes.card}>
          <CardMedia
              className={classes.cover}
              image={item.imageUrl}
              title={item.title}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h6" variant="h6">
                {trimText(item.title, 18)}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {trimText(item.description, 28)}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              <div className={classes.countDown}>
              <Typography variant="h5">
                ${item.currentPrice}
              </Typography>
              <Typography>
                {this.renderTimeRemaining(item.secondsUntilDecrease)}
              </Typography>
                <Typography>
                  {this.renderStatus(item.status, classes)}
                </Typography>
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
