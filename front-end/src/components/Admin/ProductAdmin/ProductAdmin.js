import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress, Grid, Typography, Button } from "@mui/material";
import BasicRating from "../../Rating/Rating";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const styles = {
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
};

const Product = ({ id, user, addToCart, addToWishlist }) => {
  const [product, setProduct] = useState();
  const [ratingValues, setRatingValues] = useState([]);
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
        setProduct(data.data);
        setRatingValues(data.data.rating);
        const emails = [];
        data.data.rating.map((rate) => emails.push(rate.email));
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [id, user?.email]);
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
              onClick={() => addToCart(product)}
              style={styles.addCartButton}
              variant="contained"
              color={"primary"}
            >
              Modification avancée
              <ModeEditIcon sx={styles.icon} />
            </Button>
            <Button
              style={styles.addWishButton}
              disabled={user ? false : true}
              onClick={() => addToWishlist(product)}
              color={"secondary"}
              variant="contained"
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
    </div>
  );
};

export default Product;
