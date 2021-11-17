import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Avatar, Box, Modal, Typography, Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from 'axios';
import { Context } from "../../Context/Context";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: "70%",
  overflowY: "auto",
  bgcolor: 'background.paper',
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};
export default function ClientListAdmin({ clients, setClients }) {
  const { setResponse, setOpenSnack } = React.useContext(Context);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [clientToDelete, setClientToDelete] = React.useState(null);
  const handleDeleteClient = async () => {
    try {
      const { data: res } = await axios.post(`http://localhost:5000/users/${clientToDelete?.email}/delete`);
      //On le retire de la liste
      var newListOfUser = clients.filter(function (el) { return el.email !== clientToDelete?.email; });
      setClients(newListOfUser);
      setResponse(res);
      setOpenDeleteModal(false);
      setOpenSnack(true);
      setClientToDelete(null);
    } catch (err) {
      console.log(err);
      setResponse(err);
      setOpenDeleteModal(false);
      setOpenSnack(true);
    }
  }
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
                <IconButton onClick={() => { setOpenDeleteModal(true); setClientToDelete(row) }}>
                  <DeleteForeverIcon color='primary' />
                </IconButton>
              </TableCell>
              <Modal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography>Êtes-vous sûr(e) de vouloir supprimer {clientToDelete?.firstname} ?</Typography>
                  <Typography variant='caption'>La suppression est définitive.</Typography>
                  <div style={{ display: 'flex', marginTop: '20px', justifyContent: "space-between" }}>
                    <Button onClick={handleDeleteClient} variant="contained">Supprimer</Button>
                    <Button onClick={() => setOpenDeleteModal(false)}>Annuler</Button>
                  </div>
                </Box>
              </Modal>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
