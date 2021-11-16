import React, { useState } from "react";
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

const Profile = ({
  user,
  setUser,
  setCart,
  setWishlist,
  wishlist,
  removeFromWishList,
}) => {
  const [emptyEmailMessage, setEmptyEmailMessage] = useState("Votre mail");
  const [emptyPassMessage, setEmptyPassMessage] =
    useState("Votre mot de passe");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      if (email === "") {
        setEmptyEmailMessage("- Please enter your email.");
      } else {
        setEmptyEmailMessage("");
      }
      if (password === "") {
        setEmptyPassMessage("- Please enter your password.");
      } else {
        setEmptyPassMessage("");
      }
      if (email !== "" && password !== "") {
        setSubmitted(true);
        try {
          const { data: res } = await axios.get(
            `http://localhost:5000/users/${email}/${password}`
          );
          if (res.auth) {
            setEmptyEmailMessage("");
            setUser(res.user);
            setCart(res.user.cart);
            setWishlist(res.user.wishlist);
          } else {
            try {
              const { data: res } = await axios.get(
                `http://localhost:5000/admins/${email}/${password}`
              );
              if (res.auth) {
                setEmptyEmailMessage("");
                setUser(res.admin);
              } else {
                setEmptyEmailMessage(res.message);
                setUser(null);
              }
            } catch (err) {
              setUser(null);
            }
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
            Connectez-vous à votre compte
          </Typography>
          <form style={styles.form} onSubmit={handleSubmit}>
            <TextField
              required
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
            <Typography component={Link} style={styles.link} to={"/"}>
              Mot de passe oublié ?
            </Typography>
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              style={styles.button}
            >
              {!submitted ? "Connexion" : <CircularProgress style={{color:"white", height:"30px", width:"30px"}} />}
            </Button>
            <Typography style={styles.link}>
              Pas de compte ?
              <Link style={styles.sign} to={"/register"}>
                Créez-en un.
              </Link>
            </Typography>
          </form>
        </Card>
      ) : (
        <AccountPage
          user={user}
          removeFromWishList={removeFromWishList}
          wishlist={wishlist}
        />
      )}
    </div>
  );
};

export default Profile;
