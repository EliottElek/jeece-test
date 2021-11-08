import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Typography } from "@mui/material";
import { Link,Redirect } from "react-router-dom";
const MyOrders = ({ user, profilePage }) => {
  const [orders, setOrders] = useState();

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
  }, [orders, profilePage, user?.email]);
  if (user?.admin || !user) {
    return (
      <div>
        <Redirect to="/404" />
      </div>
    );
  }
  if (!user)
    return (
      <Typography variant="h5" style={{ margin: "20px" }}>
        Vous n'êtes pas connecté. <Link to="compte">Connectez-vous</Link> pour
        accéder à vos commandes.
      </Typography>
    );
  return (
    <div style={{ margin: "20px" }}>
      {!profilePage && <Typography variant="h5">Vos commandes</Typography>}
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
            {orders?.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  padding: "10px",
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  style={{ maxHeight: "100px", padding: 0 }}
                  align="left"
                >
                  {row._id}
                </TableCell>
                <TableCell
                  style={{ maxHeight: "100px", padding: 0 }}
                  align="left"
                >
                  {row.items.length === 1
                    ? row.items.length + "  article"
                    : row.items.length + "  articles"}
                </TableCell>
                <TableCell
                  style={{ maxHeight: "100px", padding: 0 }}
                  align="center"
                >
                  {row.total}€
                </TableCell>
                <TableCell
                  style={{ maxHeight: "100px", padding: 0 }}
                  align="right"
                >
                  En préparation
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyOrders;
