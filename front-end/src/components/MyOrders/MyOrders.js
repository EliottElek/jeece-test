import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Typography, CircularProgress, Button, Chip } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import { Link, Redirect } from "react-router-dom";
import { Context } from "../Context/Context";
const MyOrders = ({ profilePage }) => {
  const { user, setHeader } = useContext(Context)
  const [orders, setOrders] = useState();
  setHeader("Mon compte");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: orders } = await axios.get(
          `http://localhost:5000/users/${user?.email}/orders`
        );
        if (profilePage) {
          const firstFive = orders.slice(0, 5);
          setOrders(firstFive);
        } else setOrders(orders);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, [profilePage, user?.email]);

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow
          key={props.index}
          sx={{
            padding: "10px",
            "&:last-child td, &:last-child th": { border: 0 },
          }}
        >
          <TableCell style={{ maxHeight: "100px", padding: 0 }} align="left">
            <Typography
              component={Button}
              onClick={() => setOpen(!open)}
              style={{
                margin: "3px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {row?._id}
              {!open ? (
                <VisibilityIcon sx={{ marginLeft: "5px" }} />
              ) : (
                <VisibilityOffIcon sx={{ marginLeft: "5px" }} />
              )}
            </Typography>
          </TableCell>
          <TableCell style={{ maxHeight: "100px", padding: 0 }} align="left">
            {new Date(row?.creation).getDate()}/{new Date(row?.creation).getMonth()}/{new Date(row?.creation).getFullYear()}
          </TableCell>
          <TableCell style={{ maxHeight: "100px", padding: 0 }} align="center">
            {row.total}???
          </TableCell>
          <TableCell style={{ maxHeight: "100px", padding: 0 }} align="right">
            <Chip color="success" label="En pr??paration" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Historique
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{ color: "primary.main", fontWeight: "bold" }}
                        >
                          Date
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ color: "primary.main", fontWeight: "bold" }}
                        >
                          Client
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          sx={{ color: "primary.main", fontWeight: "bold" }}
                        >
                          Paiement
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          sx={{ color: "primary.main", fontWeight: "bold" }}
                        >
                          Total (???)
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={row._id}>
                      <TableCell component="th" scope="row">
                        {new Date(row.creation).getDate()}/
                        {new Date(row.creation).getMonth()}/
                        {new Date(row.creation).getFullYear()}
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell align="right">
                        {row.paymentMethod.cardNumber}
                      </TableCell>
                      <TableCell align="right">{row.total} ???</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Adresses
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{ color: "primary.main", fontWeight: "bold" }}
                        >
                          Adresse de Livraison
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ color: "primary.main", fontWeight: "bold" }}
                        >
                          Pays
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={"item._id"}>
                      <TableCell component="th" scope="row">
                        {row.deliveryAddress.address}, {row.deliveryAddress.postal}, {row.deliveryAddress.city}
                      </TableCell>
                      <TableCell> {row.deliveryAddress.country}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{ color: "primary.main", fontWeight: "bold" }}
                        >
                          Adresse de facturation
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ color: "primary.main", fontWeight: "bold" }}
                        >
                          Pays
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={"item._id"}>
                      <TableCell component="th" scope="row">
                        {row.facturationAddress.address}, {row.facturationAddress.postal}, {row.facturationAddress.city}
                      </TableCell>
                      <TableCell> {row.facturationAddress.country}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  R??sum??
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        {" "}
                        <Typography
                          sx={{ color: "primary.main", fontWeight: "bold" }}
                        >
                          Miniature
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ color: "primary.main", fontWeight: "bold" }}
                        >
                          R??f??rence
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Typography
                          sx={{ color: "primary.main", fontWeight: "bold" }}
                        >
                          Titre
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          sx={{ color: "primary.main", fontWeight: "bold" }}
                        >
                          Auteur
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          sx={{ color: "primary.main", fontWeight: "bold" }}
                        >
                          Quantit??
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          sx={{ color: "primary.main", fontWeight: "bold" }}
                        >
                          Prix (???)
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.items.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell component="th" scope="row">
                          <img
                            height="80px"
                            width="auto"
                            src={item.mediaUrl}
                            alt={item._id}
                          />
                        </TableCell>
                        <TableCell align="left">{item?._id}</TableCell>
                        <TableCell align="center">{item?.title}</TableCell>
                        <TableCell align="right">{item?.author}</TableCell>
                        <TableCell align="right">{item?.quantity}</TableCell>
                        <TableCell align="right">{item?.price} ???</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  if (user?.admin || !user) {
    return (
      <div>
        <Redirect to="/404" />
      </div>
    );
  }
  if (orders?.length === 0) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Vos commandes s'afficheront ici.</Typography>
      </div>
    );
  }
  if (!orders?.length) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color={"primary"} />
      </div>
    );
  }
  if (!user)
    return (
      <Typography variant="h5" style={{ margin: "20px" }}>
        Vous n'??tes pas connect??. <Link to="compte">Connectez-vous</Link> pour
        acc??der ?? vos commandes.
      </Typography>
    );
  return (
    <div style={{ margin: "20px" }}>
      {!profilePage ? (
        <Typography
          variant="h5"
          sx={{ width: "92%", margin: "auto" }}
        >
          Vos commandes
        </Typography>
      ) : orders?.length === 1 ? (
        <Typography
          variant="h6"
          sx={{
            width: "95%",
            maxWidth: "1000px",
            margin: "auto",
            marginBottom: "10px",
          }}
        >
          Votre derni??re commande
        </Typography>
      ) : (
        <Typography
          variant="h6"
          sx={{
            width: "95%",
            maxWidth: "1000px",
            margin: "auto",
            marginBottom: "10px",
          }}
        >
          Vos {orders?.length} derni??res commandes <Button component={Link} to="/myorders">Tout voir </Button>
        </Typography>
      )}
      <TableContainer
        sx={{ width: "92%", margin: "auto" }}
        component={Paper}
        elevation={1}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ padding: 0 }}>
              <TableCell align="left">Num??ro de commande</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="right">Etat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              ?.map((row, index) => (
                <Row key={row._id} index={index} row={row} />
              ))
              .reverse()}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyOrders;
