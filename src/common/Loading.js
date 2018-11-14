import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  progress: {
    marginTop: 150,
  },
});

class Loading extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <CircularProgress className={ classes.progress } size={ 50 } />
    );
  }
}

export default withStyles(styles)(Loading);
