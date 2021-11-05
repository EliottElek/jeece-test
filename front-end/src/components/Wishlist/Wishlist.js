import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
const CartItem = ({ user, cart, removeFromWishList, getTotalWishList }) => {
  if (!cart)
    return <h2>Connectez-vous pour accéder à votre liste de souhaits.</h2>;

  return (
    <>
      {cart.length === 0 ? (
        <h1>Votre liste est vide.</h1>
      ) : (
        <>
          <TableContainer
            sx={{ width: "95%", maxWidth: "1000px", margin: "auto" }}
            component={Paper}
            elevation={1}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow sx={{ padding: 0 }}>
                  <TableCell>
                    <bold>Image</bold>
                  </TableCell>
                  <TableCell align="left">Titre</TableCell>
                  <TableCell align="left">Auteur</TableCell>
                  <TableCell align="center">Prix (€)</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      padding: 0,
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell
                      style={{ maxHeight: "100px", padding: 0 }}
                      align="left"
                    >
                      <Link to={`/produit/${row._id}`} key={row.id}>
                        <img
                          style={{ maxHeight: "100px", padding: 0 }}
                          src={row.mediaUrl}
                          alt={row._id}
                        />
                      </Link>
                    </TableCell>
                    <TableCell
                      style={{ maxHeight: "100px", padding: 0 }}
                      align="left"
                    >
                      {row.title}
                    </TableCell>
                    <TableCell
                      style={{ maxHeight: "100px", padding: 0 }}
                      align="left"
                    >
                      {row.author}
                    </TableCell>
                    <TableCell
                      style={{ maxHeight: "100px", padding: 0 }}
                      align="center"
                    >
                      {row.price}€
                    </TableCell>
                    <TableCell
                      style={{ maxHeight: "100px", padding: 0 }}
                      align="right"
                    >
                      <IconButton onClick={() => removeFromWishList(row)}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ padding: 0 }}>
                  <TableCell
                    style={{ maxHeight: "100px", padding: 0 }}
                    align="right"
                  ></TableCell>
                  <TableCell
                    style={{ maxHeight: "100px", padding: 0 }}
                    align="right"
                  ></TableCell>
                  <TableCell
                    style={{ maxHeight: "100px", padding: 0 }}
                    align="right"
                  >
                    <Typography>Total :</Typography>
                  </TableCell>
                  <TableCell
                    style={{ maxHeight: "100px", padding: 12 }}
                    align="center"
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {getTotalWishList}€ TTC
                    </Typography>
                  </TableCell>
                  <TableCell
                    style={{ maxHeight: "100px", padding: 12 }}
                    align="right"
                  ></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default CartItem;
