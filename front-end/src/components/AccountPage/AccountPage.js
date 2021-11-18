import { Paper, Grid, Avatar, Typography, Button } from "@mui/material";
import { FormControl, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import MyOrders from "../MyOrders/MyOrders";
import BookList from "../BookList/BookList";
import { Context } from "../Context/Context";
import { useContext } from "react";
import axios from 'axios';
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
    display: "flex",
    justifyContent: "center",
    //alignItems:"center",
  },
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxHeight: "80%",
    overflowY: "auto",
    bgcolor: 'background.paper',
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  }
};

const AccountPage = () => {
  const { user, wishlist, setHeader, handleLogOut, setUser, setResponse, setOpenSnack, setCookie } = useContext(Context)
  const [openModal, setOpenModal] = useState(false);
  const [newFirstname, setNewFirstname] = useState(user.firstname);
  const [newLastname, setNewLastname] = useState(user.lastname);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newAvatar, setNewAvatar] = useState(user.avatarUrl);

  setHeader("Votre compte");

  const handleMakeModifs = async () => {
    try {
      const { data: res } = await axios.post(
        `http://localhost:5000/users/${user?.email}/modify`,
        { firstname: newFirstname, lastname: newLastname, email: newEmail, avatarUrl: newAvatar }
      );
      const newUser = user;
      newUser.firstname = newFirstname;
      newUser.lastname = newLastname;
      newUser.email = newEmail;
      newUser.avatarUrl = newAvatar;
      setUser(newUser);
      setCookie("user", newUser);
      setOpenModal(false);
      setResponse(res);
      setOpenSnack(true);
    } catch (err) {
      console.error(err);
    }
  };


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
                {user.firstname} {user?.lastname}
              </Typography>
              <Typography variant="body1">{user?.email}</Typography>
              <Button
                sx={{ marginTop: "20px" }}
                size="small"
                variant="contained"
                color="primary"
                onClick={() => handleLogOut()}
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
                      Mes informations
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
            <MyOrders profilePage={true} />
          </>
        )}
        {!user.admin && (
          <>
            <BookList bookList={wishlist} inWish={true} />
          </>
        )}
      </Paper>
      <Modal
        style={{ zIndex: 33333333333 }}
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.box}>
          <FormControl style={styles.control}>
            <Avatar
              src={user?.avatarUrl}
              sx={{ margin: 3, width: 200, height: 200, alignSelf: 'center' }}
            />
            <TextField value={newAvatar} onChange={(e) => setNewAvatar(e.target.value)} style={styles.input} label="URL de l'avatar" />
            <Typography style={{ marginBottom: "5px" }}>Modifier vos informations</Typography>
            <TextField value={newLastname} onChange={(e) => setNewLastname(e.target.value)} style={styles.input} label="Nom" />
            <TextField value={newFirstname} onChange={(e) => setNewFirstname(e.target.value)} style={styles.input} label="Prénom" />
            <TextField value={newEmail} onChange={(e) => setNewEmail(e.target.value)} style={styles.input} label="Email" />
            <Button variant="contained" onClick={handleMakeModifs}>Sauvegarder</Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
};

export default AccountPage;
