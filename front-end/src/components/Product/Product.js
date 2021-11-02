import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress, Grid, Typography, Button } from "@mui/material";
import BasicRating from "../Rating/Rating";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

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
  actions: {
    display: "flex",
  },
};

const Product = ({ id, user, addCart, addWish }) => {
  const [product, setProduct] = useState();
  const [rating, setRating] = useState();

  const addToCart = async () => {
    try {
      await axios.post(`http://localhost:5000/users/${user.email}/cart`, {
        user: user,
        item: product,
      });
      addCart(product);
    } catch (err) {
      console.log(err);
    }
  };
  const addToWishlist = async () => {
    try {
      await axios.post(`http://localhost:5000/users/${user.email}/wishlist`, {
        user: user,
        item: product,
      });
      addWish(product);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(`http://localhost:5000/products/${id}`);
      setProduct(data.data);
    }
    console.log("fetched");
    fetchData();
  }, [id]);
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
        <CircularProgress />
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
              <Typography variant="body1">
                Publié le {product?.publishingDate}
              </Typography>
            )}
            <BasicRating rating={4} />
          </div>
          <Typography variant="body1">{product?.description}</Typography>
          <Typography variant="h6">
            Tarif régulier :{" "}
            <span style={{ color: "#f85966" }}>{product?.price}€</span>
          </Typography>
          <div container style={styles.actions}>
            <Button
              disabled={user ? false : true}
              onClick={addToCart}
              style={styles.addCartButton}
              variant="contained"
              color="primary"
            >
              Ajouter au panier
            </Button>
            <Button
              style={styles.addWishButton}
              disabled={user ? false : true}
              onClick={addToWishlist}
              variant="contained"
              color="secondary"
            >
              Ajouter à ma liste d'envies
            </Button>
          </div>
        </Grid>
      </Grid>
      <div style={{ height: "60px" }}></div>
      <div style={styles.grid2}>
        {user ? (
          <Typography variant="h6">
            Vous avez lu ce livre ? Donnez votre avis !
          </Typography>
        ) : (
          <Typography variant="h6">
            Connnectez-vous pour laisser un avis.
          </Typography>
        )}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Stack spacing={1}>
            <Rating
              size="large"
              disabled={user ? false : true}
              name="half-rating"
              defaultValue={0}
              precision={0.5}
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </Stack>
          <Typography
            style={{ marginLeft: "12px", fontSize: "1.4rem" }}
            variant="body1"
          >
            {rating} {rating > 1 && rating ? "étoiles" : "étoile"}
          </Typography>
          <Button
            style={styles.sendRating}
            disabled={user ? false : true}
            onClick={addToWishlist}
            variant="contained"
            color="secondary"
            size="small"
          >
            envoyer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
