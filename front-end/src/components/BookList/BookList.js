import React from "react";
import { Grid, CircularProgress, Typography, Button } from "@mui/material";
import BookItem from "../BookItem/BookItem";
import { Link } from "react-router-dom";
const BookList = ({
  inWish,
  account,
  bookList,
  addWish,
  removeFromWishList,
  wishlist,
  removeFilter,
  user,
}) => {
  if (!bookList)
    return (
      <div
        style={{
          width: "90%",
          margin: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography align="center">Rien à afficher.</Typography>
        {!inWish && <Button onClick={removeFilter}>Retirer les filtres</Button>}
      </div>
    );
    if (bookList.length === 0)
    return <Typography align="center">Rien à afficher ici.</Typography>;
  if (!bookList.length)
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

  return (
    <>
      {account && (
        <Typography
          variant="h6"
          sx={{
            width: "95%",
            maxWidth: "1000px",
            margin: "auto",
            marginTop: "20px",
          }}
        >
          Votre liste d'envies ({bookList?.length}){" "}
          <Button component={Link} to="/wishlist">
            Tout voir
          </Button>
        </Typography>
      )}
      <Grid
        container
        justifyContent="flex-start"
        spacing={4}
        sx={{ width: "90%", margin: "auto", height: "100%" }}
      >
        {bookList?.map((book) => (
          <BookItem
            account={account}
            inWish={inWish}
            wishlist={wishlist}
            bookItem={book}
            addWish={addWish}
            removeFromWishList={removeFromWishList}
            user={user}
          />
        ))}
      </Grid>
    </>
  );
};
export default BookList;
