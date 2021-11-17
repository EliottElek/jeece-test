import React, { useContext, useState } from "react";
import { Grid, CircularProgress, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import BookItem from "../BookItemAdmin/BookItemAdmin";
import { Redirect } from "react-router";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddProduct from "../AddProduct/AddProduct";
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

const BookList = () => {
  const { allProducts, user } = useContext(Context)
  const [openAddPopup, setOpenAddPopup] = useState(false);
  if (!user?.admin || !user) {
    return (
      <div>
        <Redirect to="/404" />
      </div>
    );
  }
  return (
    <>
      <Fab style={{ marginLeft: "6%" }} variant="extended" color="primary" aria-label="add" onClick={() => setOpenAddPopup(true)}
      >
        <AddIcon sx={{ ml: 1 }} />
        Ajouter un produit
      </Fab>
      {allProducts?.length === 0 ? (
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
      ) : (
        <Grid
          container
          justifyContent="flex-start"
          spacing={4}
          sx={{ width: "90%", margin: "auto", height: "100%" }}
        >
          {allProducts?.map((book) => (
            <BookItem bookItem={book} user={user} />
          ))}
        </Grid>
      )}
      <Fab style={{
        position: 'sticky',
        bottom: 16,
        left: "95%",
      }} color="primary" aria-label="add"
        onClick={() => setOpenAddPopup(true)}
      >
        <AddIcon />
      </Fab>
      <Modal
        open={openAddPopup}
        onClose={() => setOpenAddPopup(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddProduct setOpenAddPopup={setOpenAddPopup} />
        </Box>
      </Modal>
    </>
  );
};
export default BookList;
