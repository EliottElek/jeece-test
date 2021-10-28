import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress, Grid, Typography, Button } from "@mui/material";
import BasicRating from "../Rating/Rating";

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
  button: {
    width: "auto",
    borderRadius: "30px",
    padding: "10px",
    margin: 10,
  },
  actions: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
};

const Product = ({ id }) => {
  const [product, setProduct] = useState();

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
        <img style={styles.image} src={product?.mediaUrl} alt={product?._id} />
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
        <Grid container style={styles.actions}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Button style={styles.button} variant="contained" color="primary">
              Ajouter au panier
            </Button>
          </Grid>{" "}
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Button style={styles.button} variant="contained" color="secondary">
              Ajouter à ma liste d'envies
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Product;
