import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { THEME } from "../utils/theme";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: "10px",
    fontSize: "18px",
    color: "white"
  },
  menuIcon: {
    marginLeft: "10px",
    color: "white"
  },
  menuBar: {
    backgroundColor: THEME.MAIN.DARK
  },
  menu: {
    minWidth: "140px"
  },
  menuItem: {
    padding: "8px",
    fontSize: "18px"
  },
  title: {
    flexGrow: 1
  }
}));

const NavBar = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.menuBar} position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            HOME
          </Typography>
          <Button className={classes.menuButton} onClick={handleClick}>
            {props.client}
            <AccountCircle className={classes.menuIcon} />
          </Button>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className={classes.menu}
          >
            <MenuItem
              className={classes.menuItem}
              onClick={props.handleLogout()}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
