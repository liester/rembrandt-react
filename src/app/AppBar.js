import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { goHome } from './appDuck';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class AppBar extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    goHome: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  componentWillUnmount() {
    this.state.itemUnsubscribe();
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  goHome = () => {
    this.setState({ anchorEl: null });
    this.props.goHome();
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <MuiAppBar position="static">
        <Toolbar>
          <div>
            <IconButton className={ classes.menuButton } color="inherit" aria-label="Menu"
              aria-owns={ anchorEl ? 'nav-menu' : null }
              aria-haspopup="true"
              onClick={ this.handleClick }>
              <MenuIcon />
            </IconButton>
            <Menu
              id="nav-menu"
              anchorEl={ anchorEl }
              open={ Boolean(anchorEl) }
              onClose={ this.handleClose }
              PaperProps={{
                style: {
                  width: 200,
                },
              }}
            >
              <MenuItem onClick={ () => this.goHome() }>Home</MenuItem>
            </Menu>
          </div>
          <span>
            Firestore React Redux Skeleton App
          </span>
        </Toolbar>
      </MuiAppBar>
    );
  }
}

export default withStyles(styles)(connect(null, {
  goHome,
})(AppBar));

