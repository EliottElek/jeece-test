import React, { useContext } from "react";
import { Context } from "../Context/Context";
import { Paper, Typography } from "@mui/material";
import BookList from "../BookList/BookList";

const LastItems = () => {
  const { allProducts } = useContext(Context);
  return (
    <div
      style={{
        transform: "translateY(-100px)",
      }}
    >
      <Paper
        style={{
          width: "80%",
          margin: "auto",
          height: "auto",
          padding: "20px",
          borderRadius: "20px",
          backgroundColor: "whitesmoke",
        }}
      >
        <Typography variant="h4" color="primary">Nos nouveautés</Typography>
        <BookList bookList={allProducts.slice(0, 4)} />
      </Paper>
    </div>
  );
};

export default LastItems;
