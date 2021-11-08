import React, { useState } from "react";
import { Grid, IconButton, Paper, Typography, Button } from "@mui/material";
import "./style.css";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "../Rating/Rating";
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
const BookItem = ({
  inWish,
  bookItem,
  addWish,
  removeFromWishList,
  user,
  wishlist,
}) => {
  const [like, setLike] = useState(false);
  const getMeanRating = () => {
    if (bookItem?.rating?.length > 0) {
      var sum = 0;
      for (let i = 0; i < bookItem?.rating?.length; i++) {
        sum += parseInt(bookItem?.rating[i]?.value);
      }
      const avg = sum / bookItem?.rating?.length;
      return avg.toFixed(1);
    } else return 0;
  };
  return (
    <Grid
      style={styles.gridItem}
      key={bookItem.id}
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
    >
      <div style={styles.item} className="item">
        <Paper style={styles.heartContainer} elevation={0}>
          {!inWish &&
          (like || wishlist?.some((item) => item.title === bookItem.title)) ? (
            <IconButton
              onClick={() => {
                removeFromWishList(bookItem);
                setLike(false);
              }}
            >
              <FavoriteIcon sx={{ color: "primary.main", opacity: 1 }} />
            </IconButton>
          ) : (
            !inWish && (
              <IconButton
                onClick={() => {
                  addWish(bookItem);
                  setLike(true);
                }}
                disabled={!user ? true : false}
              >
                <FavoriteBorderIcon />
              </IconButton>
            )
          )}
          {inWish && (
            <Button
              onClick={() => {
                removeFromWishList(bookItem);
                setLike(false);
              }}
            >
              Retier
            </Button>
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
              {bookItem.price}€
            </Typography>
          </div>
          {getMeanRating() > 0 && (
            <Rating name="size-small" size="small" rating={getMeanRating()} />
          )}
        </div>
      </div>
    </Grid>
  );
};

export default BookItem;
