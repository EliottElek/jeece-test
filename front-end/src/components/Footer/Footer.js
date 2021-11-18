import { Grid, Typography, Paper, Link } from "@mui/material";
import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import logo from "../../images/logo.png";
const Footer = () => {
  return (
    <>
      <div
        style={{
          marginTop: "100px",
          padding: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTop: "solid 1px whitesmoke",
          borderBottom: "solid 1px whitesmoke",
        }}
      >
        <Grid container>
          <Grid xs={12} md={6} lg={3} xl={3} item>
            <Paper
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              elevation={0}
            >
              <LocalShippingIcon
                sx={{ fontSize: "70px", color: "primary.main" }}
              />
              <Typography align="center">
                Frais de port offerts dès le premier livre
              </Typography>
            </Paper>
          </Grid>
          <Grid xs={12} md={6} lg={3} xl={3} item>
            <Paper
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              elevation={0}
            >
              <PaymentIcon sx={{ fontSize: "70px", color: "primary.main" }} />
              <Typography align="center">Paiement sécurisé</Typography>
            </Paper>
          </Grid>
          <Grid xs={12} md={6} lg={3} xl={3} item>
            <Paper
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              elevation={0}
            >
              <CardGiftcardIcon
                sx={{ fontSize: "70px", color: "primary.main" }}
              />
              <Typography align="center">
                Un livre offert après trois livres achetés
              </Typography>
            </Paper>
          </Grid>
          <Grid xs={12} md={6} lg={3} xl={3} item>
            <Paper
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              elevation={0}
            >
              <PhoneCallbackIcon
                sx={{ fontSize: "70px", color: "primary.main" }}
              />
              <Typography align="center">
                Contact service client tous les jours de la semaine
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <div
        style={{
          padding: "2px 60px 20px 60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "solid 1px whitesmoke",
          borderBottom: "solid 1px whitesmoke",
        }}
      >
        <Grid container>
          <Grid xs={12} md={6} lg={3} xl={3} item>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={logo}
                alt={logo}
                width="75px"
                style={{ marginBottom: "10px" }}
              />
              <Typography variant="caption">23 rue du Général JEECE</Typography>
              <Typography variant="caption">75015 Paris</Typography>
              <Typography variant="body1">tel : 06 12 23 34 45</Typography>
            </div>
          </Grid>
          <Grid xs={12} md={6} lg={3} xl={3} item>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Link
                style={{ marginTop: "12px", marginBottom: "8px" }}
                to="/"
                variant="body1"
              >
                Qui sommes-nous ?
              </Link>
              <Link style={{ marginBottom: "8px" }} to="/" variant="body1">
                Actualité
              </Link>
              <Link to="/" variant="body1">
                FAQ
              </Link>
            </div>
          </Grid>
          <Grid xs={12} md={6} lg={3} xl={3} item>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Link
                style={{ marginTop: "12px", marginBottom: "8px" }}
                to="/"
                variant="body1"
              >
                Contactez-nous
              </Link>
              <Link style={{ marginBottom: "8px" }} to="/" variant="body1">
                Mentions légales
              </Link>
              <Link to="/" variant="body1">
                CGV
              </Link>
            </div>{" "}
          </Grid>{" "}
          <Grid xs={12} md={6} lg={3} xl={3} item>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Link
                style={{ marginTop: "12px", marginBottom: "8px" }}
                to="/"
                variant="body1"
              >
                CGU
              </Link>
              <Link style={{ marginBottom: "8px" }} to="/" variant="body1">
                Cookies
              </Link>
              <Link to="/" variant="body1">
                Données personnelles
              </Link>
            </div>{" "}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Footer;
