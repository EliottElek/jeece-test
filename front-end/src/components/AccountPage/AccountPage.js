import { Paper, Grid, Avatar, Typography, Button } from "@mui/material";
import React from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LockIcon from "@mui/icons-material/Lock";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RedeemIcon from "@mui/icons-material/Redeem";
import PeopleIcon from '@mui/icons-material/People';
import { Link } from "react-router-dom";
import MyOrders from "../MyOrders/MyOrders";
const styles = {
  root: {
    width: "90%",
    height: "100%",
    margin: "auto",
    borderRadius: "8px",
  },
  paper: {
    width: "100%",
    height: "100%",
  },
};
const AccountPage = ({ user }) => {
  return (
    <div style={styles.root}>
      <Paper sx={styles.paper} elevation={0}>
        <Grid container>
          <Grid
            sx={{ display: "flex", alignItems: "center" }}
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
          >
            <Avatar
              src={user?.avatarUrl}
              sx={{ margin: 3, width: 100, height: 100 }}
            />
            <div>
              {user.admin && (
                <Typography variant="h6">ADMINISTRATEUR</Typography>
              )}
              <Typography variant="h6">
                {user.firstname} {user.lastname}
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
              <Button
                sx={{ marginTop: "20px" }}
                size="small"
                variant="contained"
                color="primary"
                onClick={() => window.location.reload()}
              >
                Se déconnecter
              </Button>
            </div>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
          >
            {!user.admin ? (
              <Grid
                spacing={4}
                container
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Grid
                  sx={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    maxHeight: "100px",
                  }}
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                >
                  <Paper
                    sx={{
                      bgcolor: "primary.main",
                      width: "100%",
                      color: "white",
                      cursor: "pointer",
                      height: "100%",
                      padding: "12px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    component={Link}
                    to="/myorders"
                  >
                    <Typography align="center" variant="h6">
                      Mes commandes
                    </Typography>
                    <FormatListBulletedIcon style={{ fontSize: "50px" }} />
                  </Paper>
                </Grid>
                <Grid
                  sx={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    maxHeight: "100px",
                  }}
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                >
                  <Paper
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      width: "100%",
                      cursor: "pointer",
                      height: "100%",
                      padding: "12px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography align="center" variant="h6">
                      Modifier mon mot de passe
                    </Typography>
                    <LockIcon style={{ fontSize: "50px" }} />
                  </Paper>
                </Grid>
                <Grid
                  sx={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    maxHeight: "100px",
                  }}
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                >
                  <Paper
                    sx={{
                      bgcolor: "primary.main",
                      width: "100%",
                      cursor: "pointer",
                      height: "100%",
                      padding: "12px",
                      display: "flex",
                      color: "white",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography align="center" variant="h6">
                      Ma liste d'envies
                    </Typography>
                    <RedeemIcon style={{ fontSize: "50px" }} />
                  </Paper>
                </Grid>
              </Grid>
            ) : (
              <Grid
                spacing={4}
                container
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Grid
                  sx={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    maxHeight: "100px",
                  }}
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                >
                  <Paper
                    sx={{
                      bgcolor: "primary.main",
                      width: "100%",
                      color: "white",
                      cursor: "pointer",
                      height: "100%",
                      padding: "12px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    component={Link}
                    to="/admin/products"
                  >
                    <Typography align="center" variant="h6">
                     Produits
                    </Typography>
                    <MenuBookIcon style={{ fontSize: "50px" }}/>
                  </Paper>
                </Grid>
                <Grid
                  sx={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    maxHeight: "100px",
                  }}
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                >
                  <Paper
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      width: "100%",
                      cursor: "pointer",
                      height: "100%",
                      padding: "12px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography align="center" variant="h6">
                      Commandes
                    </Typography>
                    <FormatListBulletedIcon style={{ fontSize: "50px" }} />
                  </Paper>
                </Grid>
                <Grid
                  sx={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    maxHeight: "100px",
                  }}
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                >
                  <Paper
                    sx={{
                      bgcolor: "primary.main",
                      width: "100%",
                      cursor: "pointer",
                      height: "100%",
                      padding: "12px",
                      display: "flex",
                      color: "white",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography align="center" variant="h6">
                      Clients
                    </Typography>
                    <PeopleIcon style={{ fontSize: "50px" }} />
                  </Paper>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
        <div style={{ height: "35px" }} />
        {!user.admin && (
          <>
            <Typography variant="h5">Vos 5 dernières commandes</Typography>
            <MyOrders user={user} profilePage={true} />
          </>
        )}
      </Paper>
    </div>
  );
};

export default AccountPage;
