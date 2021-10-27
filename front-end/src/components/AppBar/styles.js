import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  appBar: {
    boxShadow: "none",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  title: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex",
    textDecoration: "none",
  },
  image: {
    marginRight: "10px",
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
  },
  searchIcon: {
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  mobileLinks: {
    textAlign: "center",
  },
  desktopLinks: {
    display: "flex",
    flexDirection: "row",
  },
  links: {
    color: "inherit",
    textDecoration: "none",
    textTransform: "uppercase",
    letterSpacing: "-0.05em",
    fontWeight: "bold",
    borderRadius: "8px",
  },
  custom: {
    color: "white",
    textDecoration: "none",
    textTransform: "uppercase",
    letterSpacing: "-0.05em",
    fontWeight: "bold",
    borderRadius: "8px",
    backgroundColor: "#95ADF9",
    "@media (max-width: 900px)": {
      color: "inherit",
    },
  },
  buttonMobile: {
    marginRight: "10px",
  },
  logoTitle: {
    fontFamily: "Parisienne",
  },
}));