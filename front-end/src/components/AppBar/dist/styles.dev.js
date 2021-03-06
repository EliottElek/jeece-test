"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styles = require("@mui/styles");

var _default = (0, _styles.makeStyles)(function (theme) {
  return {
    appBar: {
      boxShadow: "none!important",
      width: '100vw',
      borderBottom: "1px solid rgba(238, 43, 105, 0.12)"
    },
    title: {
      alignItems: "center",
      display: "flex",
      textDecoration: "none"
    },
    image: {
      marginRight: "10px"
    },
    grow: {
      flexGrow: 1
    },
    search: {
      position: "relative"
    },
    searchIcon: {
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit"
    },
    mobileLinks: {
      textAlign: "center"
    },
    desktopLinks: {
      display: "flex",
      flexDirection: "row"
    },
    buttonMobile: {
      marginRight: "10px"
    },
    logoTitle: {
      fontFamily: "Parisienne"
    }
  };
});

exports["default"] = _default;