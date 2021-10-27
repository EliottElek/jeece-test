import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Drawer,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ShoppingCart, AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import logo from "../../images/logo.png";
const PrimarySearchAppBar = ({ totalItems }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const links = [
    { label: "Boutique", path: "/", class: classes.links },
    { label: "Ma liste d'envies", path: "/wishlist", class: classes.links },
  ];
  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 600
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    return (
      <Toolbar>
        <Typography
          component={Link}
          to="/"
          variant="h6"
          className={classes.title}
          color="inherit"
        >
        <img src={logo} style={{ height: "50px", width: "auto" }} alt="logo" />
        </Typography>
        <div className={classes.button}>
          <IconButton
            component={Link}
            to="/connexion"
            aria-label="logIn"
            color="inherit"
          >
            <Badge color="secondary">
              <AccountCircle />
            </Badge>
          </IconButton>
        </div>
        <div className={classes.buttonMobile}>
          <IconButton
            component={Link}
            to="/panier"
            aria-label="Show cart items"
            color="inherit"
          >
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </div>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          {getDrawerChoices(links, classes.mobileLinks, handleDrawerClose)}
        </Drawer>
      </Toolbar>
    );
  };
  const getDrawerChoices = (links, classMode, handleDrawerClose) => (
    <div className={classMode}>
      {links.map((link) => {
        return (
          <Link
            {...{
              to: link.path,
              className: link.class,
              key: link.label,
              onClick: handleDrawerClose,
            }}
          >
            <MenuItem>{link.label}</MenuItem>
          </Link>
        );
      })}
    </div>
  );
  const displayDesktop = () => (
    <Toolbar>
      <Typography
        component={Link}
        to="/"
        variant="h6"
        className={classes.title}
        color="inherit"
      >
        <img src={logo} style={{ height: "50px", width: "auto" }} alt="logo" />
      </Typography>
      <div className={classes.grow} />
      {getDrawerChoices(links, classes.desktopLinks)}
      <div className={classes.button}>
        <IconButton
          component={Link}
          to="/connexion"
          aria-label="logIn"
          color="inherit"
        >
          <Badge color="secondary">
            <AccountCircle />
          </Badge>
        </IconButton>
      </div>
      <div className={classes.button}>
        <IconButton
          component={Link}
          to="/panier"
          aria-label="Show cart items"
          color="inherit"
        >
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </div>
    </Toolbar>
  );

  return (
    <div style={{ marginBottom: "80px" }}>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </div>
  );
};

export default PrimarySearchAppBar;
