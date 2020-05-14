import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { lightGreen } from '@material-ui/core/colors';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setToken } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header( {user, setToken} ) {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);


  const theme = createMuiTheme({
    palette: {
      primary: lightGreen,
    },
  });

  const history = useHistory();

  const onLogout = () => {
    setToken("");
    history.push("/");
  }

  const onAuto = () => {
    history.push("/");
  }

  let menuItem = null

  if (user) {
    menuItem = <MenuItem onClick = {onLogout}>Выйти</MenuItem>
  } else {
    menuItem = <MenuItem onClick = {onAuto}>Вы не авторизованы</MenuItem>
  }

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}> 
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Photos app
            </Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              {menuItem}
            </Menu>
          </Toolbar>
        </AppBar>
      </ThemeProvider> 
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.token
});

const mapDispatchToProps = (dispatch) => ({
  setToken: (new_token) => dispatch(setToken(new_token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

