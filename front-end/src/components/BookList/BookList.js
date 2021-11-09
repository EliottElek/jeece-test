import React from "react";
import { Grid, CircularProgress, Typography, Button } from "@mui/material";
import BookItem from "../BookItem/BookItem";
const BookList = ({
  inWish,
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
        <Typography>la recherche n'a donné aucun résultat.</Typography>
        <Button onClick={removeFilter}>Retirer les filtres</Button>
      </div>
    );
  if (bookList?.length === 0)
    return <Typography>Votre liste d'envies est vide.</Typography>;

  return (
    <>
      {!bookList.length ? (
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
      ) : (
        <Grid
          container
          justifyContent="flex-start"
          spacing={4}
          sx={{ width: "90%", margin: "auto", height: "100%" }}
        >
          {bookList?.map((book) => (
            <BookItem
              inWish={inWish}
              wishlist={wishlist}
              bookItem={book}
              addWish={addWish}
              removeFromWishList={removeFromWishList}
              user={user}
            />
          ))}
        </Grid>
      )}
    </>
  );
};
export default BookList;
