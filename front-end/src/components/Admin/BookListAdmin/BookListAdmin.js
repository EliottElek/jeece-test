import React from "react";
import { Grid, CircularProgress } from "@mui/material";
import BookItem from "../BookItemAdmin/BookItemAdmin";
import { Redirect } from "react-router";
const BookList = ({ products, user }) => {
  if (!user?.admin || !user) {
    return (
      <div>
        <Redirect to="/404" />
      </div>
    );
  }
  return (
    <>
      {products?.length === 0 ? (
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
          {products?.map((book) => (
            <BookItem bookItem={book} user={user} />
          ))}
        </Grid>
      )}
    </>
  );
};
export default BookList;
