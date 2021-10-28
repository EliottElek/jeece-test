import React from "react";
import { Grid, Typography } from "@mui/material";
import "./style.css";
import { Link } from "react-router-dom";

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
    gridTemplateRows: "80% 20%",
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
};
const BookItem = ({ bookItem }) => {
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
        <Link to={`/produit/${bookItem._id}`} key={bookItem.id}>
          <img
            style={styles.itemImage}
            src={bookItem.mediaUrl}
            alt={bookItem.id}
          />
        </Link>
        <div style={styles.itemInfos}>
          <div>
            <Typography align="center" variant="h6">
              {bookItem.title}
            </Typography>
            <Typography align="center" variant="body1">
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
