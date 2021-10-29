import React from "react";
import { Grid, Typography } from "@mui/material";
import BookItem from "../BookItem/BookItem";
const BookList = ({ bookList, addWish, user }) => {
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
            <BookItem bookItem={book} addWish={addWish} user={user} />
          ))}
        </Grid>
      )}
    </>
  );
};
export default BookList;
