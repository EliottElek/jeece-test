import { Paper, Grid, Avatar, Typography, Button } from "@mui/material";
import { FormControl, TextField, Alert } from "@mui/material";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import MyOrders from "../MyOrders/MyOrders";
import BookList from "../BookList/BookList";
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
  input: {
    width: "100%",
    marginTop: "5px",
    marginBottom: "5px"
  },
  control: {
    width: "100%",

  },
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  }
};

const AccountPage = ({ user, wishlist, removeFromWishList }) => {
  const [openModal, setOpenModal] = useState(false);
  if (!user)
    return (
      <div>
        <Redirect to="/404" />
      </div>
    );
  return (
    <div style={styles.root}>
      <Paper sx={styles.paper} elevation={0}>
        <Grid container>
          <Grid
            sx={{ display: "flex", alignItems: "center" }}
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
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
            md={8}
            lg={8}
          >
            {!user.admin ? (
              <Grid
                spacing={1}
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
                      textDecoration: "none",
                    }}
                    component={Link}
                    to="/myorders"
                  >
                    <Typography align="center" variant="h6">
                      Mes commandes
                    </Typography>
                    {/* <FormatListBulletedIcon style={{ fontSize: "50px" }} /> */}
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
                      color: "white",
                      cursor: "pointer",
                      height: "100%",
                      padding: "12px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textDecoration: "none",
                    }}
                    onClick={() => setOpenModal(true)}
                  >
                    <Typography align="center" variant="h6">
                      Mes infos
                    </Typography>
                    {/* <FormatListBulletedIcon style={{ fontSize: "50px" }} /> */}
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
                    component={Link}
                    to="/wishlist"
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
                      textDecoration: "none",
                      alignItems: "center",
                    }}
                  >
                    <Typography align="center" variant="h6">
                      Ma liste d'envies
                    </Typography>
                    {/* <RedeemIcon style={{ fontSize: "50px" }} /> */}
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
                    {/* <MenuBookIcon style={{ fontSize: "50px" }} /> */}
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
                    component={Link}
                    to="/admin/orders"
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
                    {/* <FormatListBulletedIcon style={{ fontSize: "50px" }} /> */}
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
                    component={Link}
                    to="/admin/clients"
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
                  </Paper>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
        <div style={{ height: "35px" }} />
        {!user.admin && (
          <>
            <MyOrders user={user} profilePage={true} />
          </>
        )}
        {!user.admin && (
          <>
            <BookList user={user} bookList={wishlist} account={true} inWish={true} removeFromWishList={removeFromWishList} />
          </>
        )}
      </Paper>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.box}>
          <FormControl style={styles.control}>
            <Typography>Modifier vos informations</Typography>
            <TextField style={styles.input} label="Nom" />
            <TextField style={styles.input} label="Prénom" />
            <TextField style={styles.input} label="Email" />
            <TextField style={styles.input} label="Adresses" />
            <Button variant="contained" >Sauvegarder</Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
};

export default AccountPage;
