import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CircularProgress, Grid, Typography, Button, FormControl, TextField, InputLabel, Select, MenuItem, TextareaAutosize, Alert } from "@mui/material";
import BasicRating from "../../Rating/Rating";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Context } from "../../Context/Context";
import { useHistory } from 'react-router-dom';

const styles = {
  input: {
    width: "100%",
    marginTop: "7px",
    marginBottom: "7px"
  },
  image: {
    height: "auto",
    width: "90%",
    margin: "auto",
    border: "solid 0.15px #ececec",
  },
  grid: {
    width: "90%",
    margin: "auto",
  },
  grid2: {
    width: "85%",
    margin: "auto",
  },
  grid3: {
    display: "flex",
    alignItems: "flex-end",
  },
  addCartButton: {
    width: "300px!important",
    borderRadius: "30px",
    padding: "10px",
    margin: 10,
  },
  addWishButton: {
    width: "350px!important",
    borderRadius: "30px",
    padding: "10px",
    margin: 10,
  },
  sendRating: {
    borderRadius: "30px",
    padding: "5px",
    margin: 15,
  },
  textarea: {
    maxWidth: 500,
    minHeight: "40px",
    width: "90%",
    borderRadius: "12px",
    padding: "5px",
    border: "solid 1px gray",
  },
  titleInput: {
    maxWidth: 500,
    width: "90%",
    marginBottom: "8px",
    height: "30px",
    borderRadius: "7px",
    border: "solid 1px gray",
  },
  actions: {
    display: "flex",
  },
  icon: { marginLeft: "7px" },
  modal: {
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
  },
};

const Product = ({ id }) => {
  const history = useHistory();
  const { user, setAllProducts, setOpenSnack, allProducts, setHeader, categList, response, setResponse } = useContext(Context)
  const [product, setProduct] = useState();
  const [ratingValues, setRatingValues] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [price, setPrice] = useState();
  const [mediaUrl, setMediaUrl] = useState();
  const [category, setCategory] = useState();
  const [stock, setStock] = useState();
  const [description, setDescription] = useState();

  const [success, setSuccess] = useState({});
  const handleMakeModifs = async () => {
    try {
      const { data: res } = await axios.post(
        `http://localhost:5000/products/${product?._id}/modifyDeep`,
        { author: author, price: price, title: title, category: category, mediaUrl: mediaUrl, stock: stock, description: description }
      );
      const newProducts = allProducts;
      newProducts.find(x => x._id === product?._id).title = title;
      newProducts.find(x => x._id === product?._id).price = price;
      newProducts.find(x => x._id === product?._id).author = author;
      newProducts.find(x => x._id === product?._id).category = category;
      newProducts.find(x => x._id === product?._id).stock = stock;
      newProducts.find(x => x._id === product?._id).description = description;
      newProducts.find(x => x._id === product?._id).mediaUrl = mediaUrl;

      setAllProducts(newProducts)
      setSuccess({ success: true, message: "Produit modifié avec succès." });
      setResponse(res);
      setOpenModifyModal(false);
      setOpenSnack(true);

    } catch (err) {
      setSuccess({ success: false, message: "Impossible de modifier le produit." });
      console.error(err);
    }
  };
  const handleDeleteProduct = async () => {
    try {
      const { data: res } = await axios.post(`http://localhost:5000/products/${product?._id}/delete`);
      //On le retire de la liste
      var newList = allProducts.filter(function (el) { return el._id !== product?._id; });
      setAllProducts(newList);
      setResponse(res);
      setOpenDeleteModal(false);
      setOpenSnack(true);
      history.push('/admin/products');

    } catch (err) {
      console.log(err);
    }
  }
  const getMeanRating = () => {
    if (ratingValues.length > 0) {
      var sum = 0;
      for (let i = 0; i < ratingValues.length; i++) {
        sum += parseInt(ratingValues[i].value);
      }
      const avg = sum / ratingValues.length;
      return avg.toFixed(1);
    } else return 0;
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await axios.get(`http://localhost:5000/products/${id}`);
        setHeader(`${data.data.title} (administrateur)`)
        setProduct(data.data);
        setRatingValues(data.data.rating);
        setTitle(data.data.title);
        setAuthor(data.data.author);
        setPrice(data.data.price);
        setMediaUrl(data.data.mediaUrl);
        setStock(data.data.stock);
        setDescription(data.data.description);
        setCategory(data.data.category)
        const emails = [];
        console.log("fetched")
        data.data.rating.map((rate) => emails.push(rate.email));
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [id, user?.email, response, setHeader]);
  if (!product) {
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
    <div>
      <Grid sx={styles.grid} container direction="row" justifyContent="center">
        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          lg={4}
          sx={{
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={styles.image}
            src={product?.mediaUrl}
            alt={product?._id}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={8}
          lg={8}
          sx={{
            padding: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <div>
            <Typography variant="h4">{product?.title}</Typography>
            <Typography variant="h6">{product?.author}</Typography>
            <Typography variant="body1">{product?.nbPages}</Typography>
            {product?.publishingDate && (
              <Typography variant="caption">
                Publié le {product?.publishingDate}
              </Typography>
            )}
            <div style={{ display: "flex", alignItems: "center" }}>
              <BasicRating rating={getMeanRating()} />
              {product?.rating?.length <= 1 ? (
                <Typography variant="caption">
                  {product?.rating?.length} avis donné ({getMeanRating()}{" "}
                  {getMeanRating() <= 1 ? "étoile" : "étoiles"})
                </Typography>
              ) : (
                <Typography variant="caption">
                  {product?.rating?.length} avis donnés ({getMeanRating()}{" "}
                  {getMeanRating() <= 1 ? "étoile" : "étoiles"})
                </Typography>
              )}
            </div>
          </div>
          <Typography variant="body1">{product?.description}</Typography>
          <div style={{ display: "flex" }}>
            <Typography variant="h6">Tarif régulier :</Typography>
            <Typography variant="h6" sx={{ color: "primary.main" }}>
              {" "}
              {product?.price}€
            </Typography>
          </div>
          <div container style={styles.actions}>
            <Button
              disabled={user ? false : true}
              style={styles.addCartButton}
              variant="contained"
              color={"primary"}
              onClick={() => setOpenModifyModal(true)}
            >
              Modification avancée
              <ModeEditIcon sx={styles.icon} />
            </Button>
            <Button
              style={styles.addWishButton}
              disabled={user ? false : true}
              color={"secondary"}
              variant="contained"
              onClick={() => setOpenDeleteModal(true)}
            >
              Supprimer définitivement
              <DeleteForeverIcon sx={styles.icon} />
            </Button>
          </div>
        </Grid>
      </Grid>
      <div style={{ height: "60px" }}></div>
      <div style={styles.grid2}>
        {product.comments.length === 0 ? (
          <Typography>Aucun commentaire.</Typography>
        ) : (
          <div>
            <Typography>Commentaires ({product.comments.length})</Typography>
            <List
              sx={{
                width: "100%",
                maxWidth: 460,
                bgcolor: "background.paper",
              }}
            >
              {product.comments
                .map((comment) => (
                  <>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt={comment?.firstname + " " + comment.lastname}
                          src={comment?.avatar}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <>
                            {comment?.title}{" "}
                            {ratingValues?.find(
                              (item) => item?.email === comment?.email
                            )?.value && (
                                <BasicRating
                                  rating={
                                    ratingValues?.find(
                                      (item) => item?.email === comment?.email
                                    )?.value
                                  }
                                />
                              )}
                          </>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {comment.firstname} {comment.lastname}
                            </Typography>
                            {" — "}
                            {comment.content}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </>
                ))
                .reverse()}
            </List>
          </div>
        )}
      </div>
      <Modal
        open={openModifyModal}
        onClose={() => setOpenModifyModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modal}>
          <FormControl style={{ width: "100%" }}>
            <TextField style={styles.input} label="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
            <TextField style={styles.input} label="Auteur" value={author} onChange={(e) => setAuthor(e.target.value)} />
            <TextField style={styles.input} label="Prix" value={price} onChange={(e) => setPrice(e.target.value)} />
            <TextField style={styles.input} label="Media" value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} />
            <Box style={styles.input}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Catégorie</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Catégorie"
                  onChange={(e) => setCategory(e.target.value)}
                >

                  {categList?.map((categ) => (
                    <MenuItem value={categ}>{categ}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField style={styles.input} label="Inventaire" value={stock} onChange={(e) => setStock(e.target.value)} />
            <Typography variant="caption">Description</Typography>
            <TextareaAutosize
              style={{ marginBottom: "5px", padding: '4px' }}
              aria-label="empty textarea"
              placeholder={"Description"}
              value={description}
              minRows={10}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button variant="contained" onClick={handleMakeModifs}>Sauvegarder</Button>
            {success.success ? <Alert severity="success">{success.message}</Alert>
              : success.success === false && <Alert severity="error">{success.message}</Alert>}
            <Button onClick={() => setOpenModifyModal(false)}>Annuler</Button>
          </FormControl>
        </Box>
      </Modal>
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modal}>
          <Typography>Êtes-vous sûr(e) de vouloir supprimer ce produit ?</Typography>
          <Typography variant='caption'>La suppression est définitive.</Typography>
          <div style={{ display: 'flex', marginTop: '20px', justifyContent: "space-between" }}>
            <Button onClick={handleDeleteProduct} variant="contained">Supprimer</Button>
            <Button onClick={() => setOpenDeleteModal(false)}>Annuler</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Product;
