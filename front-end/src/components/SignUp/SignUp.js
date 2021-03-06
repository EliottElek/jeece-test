import React, { useContext, useState } from "react";
import {
  Card,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import AccountPage from "../AccountPage/AccountPage";
import { Link } from "react-router-dom";
import axios from "axios";
import { validEmail, validPassword } from "../Regex";
import { Context } from "../Context/Context";
const bcrypt = require("bcryptjs");

const styles = {
  title: {
    alignSelf: "flex-start",
    marginBottom: "22px",
  },
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderRadius: "8px",
    display: "flex",
    width: "80%",
    maxWidth: "600px",
    minHeight: "300px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "40px",
    padding: "30px 30px 30px 30px",
  },
  label: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "0.8rem",
    margin: "15px 0px 5px 5px",
  },
  button: {
    alignSelf: "flex-start",
    minWidth: "30%",
    borderRadius: "30px",
    padding: "8px",
    outline: "none",
    border: "none",
    marginTop: "32px",
    cursor: "pointer",
  },
  errorMessage: {
    color: "#DB4437",
    fontSize: "0.7rem",
    textTransform: "none",
  },
  form: {
    color: "white",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  forgotPassword: {
    fontSize: "0.8rem",
  },
  sign: {
    margin: 0,
    padding: 0,
    marginLeft: "5px",
  },
  link: {
    alignSelf: "flex-start",
    fontSize: " 0.9rem",
    textAlign: "center",
    marginTop: "15px",
    display: "flex",
    alignItems: "center",
    color: "gray",
  },
  iconGithub: {
    marginLeft: "10px",
  },
  googleLog: {
    transition: "0.1 ease-in",
    bgcolor: "#0F9D58",
    "&:hover": {
      bgcolor: "#0F9D58",
      opacity: "0.8",
      transition: "0.1s ease-in",
    },
  },
  githubLog: {
    transition: "0.1 ease-in",
    bgcolor: "#6e5494",
    "&:hover": {
      bgcolor: "#6e5494",
      opacity: "0.8",
      transition: "0.1s ease-in",
    },
  },
  iconGoogle: {
    marginLeft: "10px",
  },
};

const SignUp = () => {
  const {
    user,
    setUser,
    setWishlist,
    setCart,
    setHeader,
    setOpenSnack,
    setResponse,
    setCookie,
  } = useContext(Context);
  const [submitted, setSubmitted] = useState(false);
  setHeader("Cr??ez votre compte");
  const [emptyFirstnameMessage, setEmptyFirstnameMessage] =
    useState("Votre pr??nom");
  const [emptyLastnameMessage, setEmptyLastnameMessage] = useState("Votre nom");
  const [emptyEmailMessage, setEmptyEmailMessage] = useState("Votre mail");
  const [emptyPassMessage, setEmptyPassMessage] =
    useState("Votre mot de passe");
  const [emptyVerifPassMessage, setEmptyVerifPassMessage] = useState(
    "V??rifiez votre mot de passe"
  );

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifPassword, setVerifPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeFirstname = (e) => {
    setFirstname(e.target.value);
  };
  const handleChangeLastname = (e) => {
    setLastname(e.target.value);
  };
  const handleChangeVerifPassword = (e) => {
    setVerifPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    setSubmitted(true);
    e.preventDefault();
    if (!user) {
      if (firstname === "") {
        setEmptyFirstnameMessage("- Votre pr??nom est requis.");
        setSubmitted(false);
      } else {
        setEmptyFirstnameMessage("");
      }
      if (lastname === "") {
        setEmptyLastnameMessage("- Votre nom est requis.");
        setSubmitted(false);
      } else {
        setEmptyLastnameMessage("");
      }
      if (email === "") {
        setEmptyEmailMessage("- Votre email est requis.");
        setSubmitted(false);
      } else {
        setEmptyEmailMessage("");
      }
      if (password === "") {
        setEmptyPassMessage("- Un mot de passe est requis.");
        setSubmitted(false);
      } else {
        setEmptyPassMessage("");
      }
      if (!validEmail.test(email)) {
        setEmptyEmailMessage("- Vous devez entrer un email valide.");
        setSubmitted(false);
      } else {
        setEmptyEmailMessage("");
      }
      if (!validPassword.test(password)) {
        setEmptyPassMessage("- Au moins 6 caract??res, une majuscule, un chiffre et un caract??re sp??cial.");
        setSubmitted(false);
      } else {
        setEmptyPassMessage("");
      }
      if (verifPassword === "") {
        setEmptyVerifPassMessage("- Vous devez v??rifier votre mot de passe.");
        setSubmitted(false);
      } else {
        setEmptyVerifPassMessage("");
      }
      if (verifPassword !== password) {
        setEmptyVerifPassMessage("- Les mots de passe doivent correspondre.");
        setSubmitted(false);
      } else {
        setEmptyVerifPassMessage("");
      }
      if (
        email !== "" &&
        password !== "" &&
        firstname !== "" &&
        lastname !== "" &&
        verifPassword !== "" &&
        verifPassword === password &&
        validEmail.test(email) &&
        validPassword.test(password)
      ) {
        try {
          const usr = {
            avatarUrl:
              "https://static-openask-com.s3.amazonaws.com/content/images/tests/large/3784_test.jpg",
            firstname: firstname,
            lastname: lastname,
            email: email,
            birthdate: "29/02/1999",
            cart: [],
            wishlist: [],
            password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
          };
          const { data: res } = await axios.post(
            `http://localhost:5000/users/`,
            { user: usr }
          );
          console.log(res);
          if (res.success) {
            const userForCookies = { ...res.user[0], cart: [], wishlist: [] };
            setCookie("user", userForCookies);
            setCookie("cart", []);
            setCookie("wishlist", []);
            setUser(res.user[0]);
            setResponse(res);
            setOpenSnack(true);
            setCart([]);
            setWishlist([]);
            window.location.reload();
          } else {
            setEmptyEmailMessage(res.message);
            setUser(null);
            setSubmitted(false);
          }
        } catch (err) {
          console.error(err);
          setSubmitted(false);
        }
      }
    }
  };
  return (
    <div style={styles.root}>
      {!user ? (
        <Card sx={styles.card} elevation={1}>
          <Typography variant="h5" style={styles.title}>
            Cr??ez un compte
          </Typography>
          <form style={styles.form} onSubmit={handleSubmit}>
            <TextField
              color={
                emptyFirstnameMessage === "Votre pr??nom" ? "primary" : "warning"
              }
              fullWidth
              label={emptyFirstnameMessage}
              id="margin-none"
              autoComplete="on"
              onChange={handleChangeFirstname}
              value={firstname}
              style={styles.input}
              placeholder="Votre nom...*"
              type="name"
            />
            <div style={{ height: "30px" }}></div>
            <TextField
              color={
                emptyLastnameMessage === "Votre nom" ? "primary" : "warning"
              }
              fullWidth
              label={emptyLastnameMessage}
              id="margin-none"
              autoComplete="on"
              onChange={handleChangeLastname}
              value={lastname}
              style={styles.input}
              placeholder="Votre nom...*"
              type="name"
            />
            <div style={{ height: "30px" }}></div>
            <TextField
              color={emptyEmailMessage === "Votre mail" ? "primary" : "warning"}
              fullWidth
              label={emptyEmailMessage}
              id="margin-none"
              autoComplete="on"
              onChange={handleChangeEmail}
              value={email}
              style={styles.input}
              placeholder="Votre email...*"
              type="email"
            />
            <div style={{ height: "30px" }}></div>
            <TextField
              color={
                emptyPassMessage === "Votre mot de passe"
                  ? "primary"
                  : "warning"
              }
              fullWidth
              label={emptyPassMessage}
              id="margin-none"
              onChange={handleChangePassword}
              value={password}
              style={styles.input}
              placeholder="Votre mot de passe...*"
              type="password"
            />
            <div style={{ height: "30px" }}></div>
            <TextField
              color={
                emptyVerifPassMessage === "V??rifiez votre mot de passe"
                  ? "primary"
                  : "warning"
              }
              fullWidth
              label={emptyVerifPassMessage}
              id="margin-none"
              onChange={handleChangeVerifPassword}
              value={verifPassword}
              style={styles.input}
              placeholder="V??rifiez votre mot de passe...*"
              type="password"
            />
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              style={styles.button}
            >
              {!submitted ? (
                "Cr??er mon compte"
              ) : (
                <CircularProgress
                  style={{ color: "white", height: "30px", width: "30px" }}
                />
              )}
            </Button>
            <Typography style={styles.link}>
              D??j?? un compte ?
              <Link style={styles.sign} to={"/compte"}>
                Connectez-vous.
              </Link>
            </Typography>
          </form>
        </Card>
      ) : (
        <AccountPage user={user} />
      )}
    </div>
  );
};

export default SignUp;
