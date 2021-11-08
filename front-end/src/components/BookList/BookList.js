import React from "react";
import { Grid, CircularProgress } from "@mui/material";
import BookItem from "../BookItem/BookItem";
const BookList = ({
  inWish,
  bookList,
  addWish,
  removeFromWishList,
  wishlist,
  user,
}) => {
  return (
    <>
      {bookList?.length === 0 ? (
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
          sx={{ width: "90%", margin: "auto", height:"100%" }}
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
