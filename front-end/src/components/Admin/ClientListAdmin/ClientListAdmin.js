import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Avatar } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
export default function ClientListAdmin({ clients }) {
  return (
    <TableContainer
      sx={{ width: "95%", maxWidth: "1000px", margin: "auto" }}
      component={Paper}
      elevation={1}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "primary.main", fontWeight: "bold" }}>
              Avatar
            </TableCell>
            <TableCell sx={{ color: "primary.main", fontWeight: "bold" }}>
              Nom
            </TableCell>
            <TableCell
              sx={{ color: "primary.main", fontWeight: "bold" }}
              align="left"
            >
              Email
            </TableCell>
            <TableCell
              sx={{ color: "primary.main", fontWeight: "bold" }}
              align="right"
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Avatar src={row.avatarUrl} />
              </TableCell>
              <TableCell align="left">
                {row.firstname + " " + row.lastname}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="right">
                <IconButton>
                  <EditIcon color='primary'/>
                </IconButton>
                <IconButton>
                  <DeleteForeverIcon color='primary'/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
