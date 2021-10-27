import React from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";

const styles = {
  item: {
    width: "100%",
    height: "100%",
    margin: "auto",
    borderRadius: "inherit",
    display: "grid",
    gridTemplateRows: "60% 20% 20%",
  },
  itemImage: {
    height: "auto",
    maxHeight: "100%",
    width: "100%",
    objectFit: "contain",
    margin: "auto",
  },
  itemInfos: {
    padding: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
      style = {{ padding:12}}
      key={bookItem.id}
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
    >
      <Paper sx={{ width: "100%", height: "300px" }}>
        <div style={styles.item}>
          <img
            style={styles.itemImage}
            src={bookItem.mediaUrl}
            alt={bookItem.id}
          />
          <div style={styles.itemInfos}>
            <div>
              <Typography variant="h6">{bookItem.title}</Typography>
              <Typography variant="body1">{bookItem.author}</Typography>
            </div>
            <div>
              <Typography variant="h5">{bookItem.price}€</Typography>
            </div>
          </div>
          <div style={styles.itemActions}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              sx={styles.button}
            >
              + ma liste
            </Button>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              sx={styles.button}
            >
              + panier
            </Button>
          </div>
        </div>
      </Paper>
    </Grid>
  );
};

export default BookItem;
