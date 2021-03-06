import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Typography, CircularProgress, Button, Chip } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
const OrderListAdmin = ({ orders }) => {
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
            {row.items.length === 1
              ? row.items.length + "  article"
              : row.items.length + "  articles"}
          </TableCell>
          <TableCell style={{ maxHeight: "100px", padding: 0 }} align="center">
            {row.total}€
          </TableCell>
          <TableCell style={{ maxHeight: "100px", padding: 0 }} align="right">
            <Chip color="success" label="En préparation" />
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
                          Total (€)
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
                      <TableCell align="right">{row.total} €</TableCell>
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
                  Résumé
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
                          Référence
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
                          Quantité
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          sx={{ color: "primary.main", fontWeight: "bold" }}
                        >
                          Prix (€)
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
                        <TableCell align="left">{item._id}</TableCell>
                        <TableCell align="center">{item.title}</TableCell>
                        <TableCell align="right">{item.author}</TableCell>
                        <TableCell align="right">1</TableCell>
                        <TableCell align="right">{item.price} €</TableCell>
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
  if (orders.length===0) {
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
        <Typography>Aucune commande passée.</Typography>
      </div>
    );
  }
  if (!orders.length) {
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

  return (
    <div style={{ margin: "20px" }}>
      <TableContainer
        sx={{ width: "95%", maxWidth: "1000px", margin: "auto" }}
        component={Paper}
        elevation={1}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ padding: 0 }}>
              <TableCell align="left">Numéro de commande</TableCell>
              <TableCell align="left">Nombre d'articles</TableCell>
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

export default OrderListAdmin;
