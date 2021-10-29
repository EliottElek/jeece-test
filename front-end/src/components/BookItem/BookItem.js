import React, { useState } from "react";
import { Grid, IconButton, Paper, Typography } from "@mui/material";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const styles = {
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
const BookItem = ({ bookItem, addWish, user }) => {
  const [like, setLike] = useState(false);
  const addToWishlist = async () => {
    try {
      await axios.post(`http://localhost:5000/users/${user.email}/wishlist`, {
        user: user,
        item: bookItem,
      });
      addWish(bookItem);
      setLike(!like);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid
      style={styles.gridItem}
      key={bookItem.id}
      item
      xs={12}
      sm={6}
      md={3}
      lg={2}
    >
      <div style={styles.item} className="item">
        <Paper style={styles.heartContainer}>
          {like ? (
            <IconButton onClick={addToWishlist}>
              <FavoriteIcon sx={{ color: "red" }} />
            </IconButton>
          ) : (
            <IconButton onClick={addToWishlist}>
              <FavoriteBorderIcon />
            </IconButton>
          )}
        </Paper>
        <Link to={`/produit/${bookItem._id}`} key={bookItem.id}>
          <img
            style={styles.itemImage}
            src={bookItem.mediaUrl}
            alt={bookItem.id}
          />
        </Link>
        <div style={styles.itemInfos}>
          <div>
            <Typography align="center" variant="h6" style ={{fontSize:"1rem"}}>
              {bookItem.title}
            </Typography>
            <Typography align="center" variant="h6" style ={{fontSize:"0.8rem"}}>
              {bookItem.author}
            </Typography>
          </div>
          <div>
            <Typography align="center" color="#f83e49" variant="body1">
              {bookItem.price}€
            </Typography>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default BookItem;
