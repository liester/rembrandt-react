import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Badge from '@material-ui/core/Badge';
import { history } from '../common/storeConfig.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authenticationActions from '../common/authenticationActions';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    textTransform: 'uppercase',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class ResponsiveDrawer extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
    user: PropTypes.object,
    width: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    authenticationActions: PropTypes.object,
  };

  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  renderUser = (user, width) => {
    if (user) {
      return (
        <React.Fragment>
          <div>{user.displayName}</div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (width === 'xs') {
                this.handleDrawerToggle();
              }
              this.props.authenticationActions.signOut();
            }}
          >
            Sign Out
          </Button>
        </React.Fragment>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.push('/login');
            if (width === 'xs') {
              this.handleDrawerToggle();
            }
          }}
        >
          Sign In
        </Button>
      );
    }
  };

  render() {
    const { classes, theme, width, user } = this.props;
    const userId = user && user.uid;
    const menuItems = [
      {
        label: 'Home',
        path: '/',
        icon: <HomeIcon />,
      },
      {
        label: 'My Items',
        path: `/buyer/${userId || 'auth'}`,
        icon: (
          <Badge color="primary" badgeContent={4}>
            <ShoppingCartIcon />
          </Badge>
        ),
      },
    ];
    const drawer = (
      <div>
        <div className={classes.toolbar}>{this.renderUser(user, width)}</div>
        <Divider />
        <List>
          {menuItems.map(item => {
            return (
              <ListItem
                button
                key={item.label}
                onClick={() => {
                  history.push(item.path);
                  if (width === 'xs') {
                    this.handleDrawerToggle();
                  }
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.label}</ListItemText>
              </ListItem>
            );
          })}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <div style={{display: 'flex', justifyContent: 'space-between', flexGrow: 1}}>
            <Typography variant="h6" color="inherit" noWrap>
              Rembrandt
            </Typography>
            <Typography variant="h6" color="inherit" noWrap>
              {user && user.profile && `Funds $${user.profile.cash}`}
            </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="js">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }) => {
  return {
    user: authentication.user,
    isAuthenticated: !!authentication.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticationActions: bindActionCreators(authenticationActions, dispatch),
  };
};

export default withWidth()(
  withStyles(styles, { withTheme: true })(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(ResponsiveDrawer)
  )
);
