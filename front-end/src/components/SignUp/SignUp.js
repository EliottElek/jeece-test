import React, { useState } from "react";
import { Card, Typography, TextField, Button } from "@mui/material";
import AccountPage from "../AccountPage/AccountPage";
import { Link } from "react-router-dom";
import axios from "axios";

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

const SignUp = ({ user, setUser }) => {
  const [emptyFirstnameMessage, setEmptyFirstnameMessage] =
    useState("Votre prénom");
  const [emptyLastnameMessage, setEmptyLastnameMessage] = useState("Votre nom");
  const [emptyEmailMessage, setEmptyEmailMessage] = useState("Votre mail");
  const [emptyPassMessage, setEmptyPassMessage] =
    useState("Votre mot de passe");
  const [emptyVerifPassMessage, setEmptyVerifPassMessage] = useState(
    "Vérifiez votre mot de passe"
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
    e.preventDefault();
    if (!user) {
      if (firstname === "") {
        setEmptyFirstnameMessage("- Votre prénom est requis.");
      } else {
        setEmptyFirstnameMessage("");
      }
      if (lastname === "") {
        setEmptyLastnameMessage("- Votre nom est requis.");
      } else {
        setEmptyLastnameMessage("");
      }
      if (email === "") {
        setEmptyEmailMessage("- Votre email est requis.");
      } else {
        setEmptyEmailMessage("");
      }
      if (password === "") {
        setEmptyPassMessage("- Un mot de passe est requis.");
      } else {
        setEmptyPassMessage("");
      }
      if (verifPassword === "") {
        setEmptyVerifPassMessage("- Vous devez vérifier votre mot de passe.");
      } else {
        setEmptyVerifPassMessage("");
      }
      if (verifPassword !== password) {
        setEmptyVerifPassMessage("- Les mots de passe doivent correspondre.");
      } else {
        setEmptyVerifPassMessage("");
      }
      if (
        email !== "" &&
        password !== "" &&
        firstname !== "" &&
        lastname !== "" &&
        verifPassword !== "" &&
        verifPassword === password
      ) {
        try {
          const usr = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            birthdate: "29/02/1999",
            password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
          };
          const { data: res } = await axios.post(
            `http://localhost:5000/users/`,
            { user: usr }
          );
          console.log(res);
          if (res.creation) {
            setEmptyEmailMessage(res.message);
            setUser(res.user[0]);
          } else {
            setEmptyEmailMessage(res.message);
            setUser(null);
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
  };
  return (
    <div style={styles.root}>
      {!user ? (
        <Card sx={styles.card} elevation={1}>
          <Typography variant="h5" style={styles.title}>
            Créez un compte
          </Typography>
          <form style={styles.form} onSubmit={handleSubmit}>
            <TextField
              color={
                emptyFirstnameMessage === "Votre prénom" ? "primary" : "warning"
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
                emptyVerifPassMessage === "Vérifiez votre mot de passe"
                  ? "primary"
                  : "warning"
              }
              fullWidth
              label={emptyVerifPassMessage}
              id="margin-none"
              onChange={handleChangeVerifPassword}
              value={verifPassword}
              style={styles.input}
              placeholder="Vérifiez votre mot de passe...*"
              type="password"
            />
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              style={styles.button}
            >
              Créer mon compte
            </Button>
            <Typography style={styles.link}>
              Déjà un compte ?
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
