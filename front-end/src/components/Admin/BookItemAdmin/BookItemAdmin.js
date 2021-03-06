import React, { useContext, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Paper,
  FormControl,
  TextField,
} from "@mui/material";
import "../../BookItem/style.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Context } from "../../Context/Context";
const styles = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 400,
    width: "90%",
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  },
  gridItem: {
    padding: 12,
  },
  item: {
    width: "100%",
    height: "100%",
    margin: "auto",
    display: "grid",
    borderRadius: "5px",
    gridTemplateRows: "70% 30%",
  },
  itemImage: {
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    height: "auto",
    maxHeight: "100%",
    width: "100%",
    objectFit: "cover",
    margin: "auto",
  },
  itemInfos: {
    padding: "6px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  itemActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    paddingTop: "0!important",
    height: "35px",
  },
  heartContainer: {
    opacity: 0.8,
    width: "auto",
    position: "absolute",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
    background: "whitesmoke",
  },
};

const BookItem = ({ bookItem }) => {
  const { user, setAllProducts, allProducts } = useContext(Context)
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState(bookItem?.title);
  const [author, setAuthor] = useState(bookItem?.author);
  const [price, setPrice] = useState(bookItem?.price);
  const [response, setResponse] = useState(null);
  const handleMakeModifs = async () => {
    try {
      const { data: res } = await axios.post(
        `http://localhost:5000/products/${bookItem?._id}/modify`,
        { author: author, price: price, title: title }
      );
      const newProducts = allProducts;
      newProducts.find(x => x._id === bookItem._id).title = title;
      newProducts.find(x => x._id === bookItem._id).price = price;
      newProducts.find(x => x._id === bookItem._id).author = author;
      setAllProducts(newProducts)
      setResponse(res);
      setOpenSnack(true);
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };
  if (!user || !user?.admin)
    return (
      <div>
        <Redirect to="/404" />
      </div>
    );

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <>
      <Grid
        style={styles.gridItem}
        key={bookItem._id}
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
      >
        <div style={styles.item} className="item">
          <Paper style={styles.heartContainer} elevation={0}>
            <Button onClick={handleOpen}>Modification rapide</Button>
          </Paper>
          <Link to={`/produit/${bookItem._id}/admin`} key={bookItem.id}>
            <img
              style={styles.itemImage}
              src={bookItem.mediaUrl}
              alt={bookItem.id}
            />
          </Link>
          <div style={styles.itemInfos}>
            <div>
              <Typography
                align="center"
                variant="h6"
                style={{ fontSize: "1rem" }}
              >
                {bookItem.title}
              </Typography>
              <Typography
                align="center"
                variant="h6"
                style={{ fontSize: "0.8rem" }}
              >
                {bookItem.author}
              </Typography>
            </div>
            <div>
              <Typography align="center" color="primary" variant="body1">
                {bookItem.price}???
              </Typography>
            </div>
            <Button
              component={Link}
              to={`/produit/${bookItem._id}/admin`}
              key={bookItem.id}
              variant='contained'
            >
              Modification avanc??e
            </Button>
          </div>
        </div>
      </Grid>
      <Modal
        style={{ zIndex: 33333333333 }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modal}>
          <FormControl style={{ width: "100%" }}>
            <TextField
              sx={{ marginTop: "22px" }}
              label="Titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              sx={{ marginTop: "12px" }}
              label="Auteur"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <TextField
              sx={{ marginTop: "12px", marginBottom: "12px" }}
              label="Prix"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Button
              component={Link}
              to={`/produit/${bookItem._id}/admin`}
              key={bookItem.id}
            >
              Modification avanc??e
            </Button>
            <Button
              type="submit"
              onClick={handleMakeModifs}
              variant="contained"
            >
              Sauvegarder
            </Button>
          </FormControl>
        </Box>
      </Modal>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        action={action}
      >
        {response && response?.add ? (
          <Alert onClose={handleCloseSnack} severity="success">
            {response.message}
          </Alert>
        ) : (
          response && (
            <Alert onClose={handleCloseSnack} severity="error">
              {response.message}
            </Alert>
          )
        )}
      </Snackbar>
    </>
  );
};

export default BookItem;
