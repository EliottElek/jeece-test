import React from "react";
import { Grid, Typography } from "@mui/material";
import BookItem from "../BookItem/BookItem";
const BookList = ({ bookList, addWish, removeFromWishList,wishlist, user }) => {
  return (
    <>
      {bookList.length === 0 ? (
        <Typography>Aucun livre à afficher.</Typography>
      ) : (
        <Grid
          container
          justifyContent="flex-start"
          spacing={4}
          sx={{ width: "90%", margin: "auto" }}
        >
          {bookList.map((book) => (
            <BookItem wishlist={wishlist} bookItem={book} addWish={addWish} removeFromWishList={removeFromWishList} user={user} />
          ))}
        </Grid>
      )}
    </>
  );
};
export default BookList;
