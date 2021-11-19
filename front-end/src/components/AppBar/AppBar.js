import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Drawer,
  MenuItem,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import logo from "../../images/logo.png";
import { Context } from "../Context/Context";
import { useContext } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchBar from "../SearchBar/SearchBar";
const PrimarySearchAppBar = () => {
  const { user, cart, wishlist, removeFilter, handleLogOut } =
    useContext(Context);
  const classes = useStyles();
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const linksMobile = [
    { label: "Accueil", path: "/", class: classes.links },
    { label: "Boutique", path: "/boutique", class: classes.links },
    { label: "Ma liste d'envies", path: "/wishlist", class: classes.links },
    { label: "Mon compte", path: "/compte", class: classes.links },
    { label: "Mon Panier", path: "/panier", class: classes.links },
  ];
  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 750
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
      <Toolbar sx={{ zIndex: 3 }}>
        <Typography
          onClick={removeFilter}
          component={Link}
          to="/"
          variant="h6"
          className={classes.title}
          color="inherit"
        >
          <img
            src={logo}
            style={{ height: "50px", width: "auto" }}
            alt="logo"
          />
        </Typography>
        <div className={classes.grow}></div>
        <div className={classes.button}>
          <IconButton
            component={Link}
            to="/compte"
            aria-label="logIn"
            color="inherit"
          >
            <Badge color="secondary">
              <Avatar src={user?.avatarUrl} />
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
        sx={{zIndex:6666666666}}
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          {getDrawerChoices(
            linksMobile,
            classes.mobileLinks,
            handleDrawerClose
          )}
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
    <Toolbar sx={{ zIndex: 3 }}>
      <Typography
        onClick={removeFilter}
        component={Link}
        to="/"
        variant="h6"
        className={classes.title}
        color="inherit"
      >
        <img src={logo} style={{ height: "50px", width: "auto" }} alt="logo" />
      </Typography>
      <SearchBar placeholder={"Trouvez un livre..."}/>
      <div className={classes.grow}>{/* <SearchBar books = {books}/> */}</div>
      <MenuItem component={Link} to="/">
        Accueil
      </MenuItem>
      <MenuItem component={Link} to="/boutique">
        Boutique
      </MenuItem>
      <MenuItem component={Link} to="/wishlist">
        <Badge badgeContent={wishlist?.length} color="secondary">
          <FavoriteBorderIcon sx={{ color: "#bdbdbd" }} />
        </Badge>
      </MenuItem>
      <MenuItem component={Link} to="/panier">
        <Badge badgeContent={cart?.length} color="primary">
          <ShoppingBasketIcon sx={{ color: "#bdbdbd" }} />
        </Badge>
      </MenuItem>
      <Typography variant="body2">
        {user?.firstname} {user?.lastname}
      </Typography>
      <div className={classes.button}>
        <IconButton
          component={Link}
          to="/compte"
          aria-label="logIn"
          color="inherit"
        >
          <Badge color="secondary">
            <Avatar src={user?.avatarUrl} />
          </Badge>
        </IconButton>
        {user && (
          <IconButton onClick={handleLogOut}>
            <LogoutIcon sx={{ color: "primary.main" }} />
          </IconButton>
        )}
      </div>
    </Toolbar>
  );

  return (
    <div style={{ marginBottom: "80px", zIndex: 2 }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: 34234323 }}
        className={classes.appBar}
        color="inherit"
      >
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </div>
  );
};

export default PrimarySearchAppBar;
