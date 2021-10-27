import React from "react";
import { Grid, Typography } from "@mui/material";
import BookItem from "../BookItem/BookItem";
const BookList = ({ bookList }) => {
  return (
    <>
      {bookList.length === 0 ? (
        <Typography>Aucun livre à afficher.</Typography>
      ) : (
        <Grid container justifyContent="flex-start" spacing={4} sx={{width:'90%', margin:"auto"}}>
          {bookList.map((book) => (
            <BookItem bookItem={book} />
          ))}
        </Grid>
      )}
    </>
  );
};
export default BookList;
