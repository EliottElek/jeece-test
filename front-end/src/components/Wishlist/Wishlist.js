import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BookList from "../BookList/BookList";
import { Link } from "react-router-dom";
const WishList = ({
  addWish,
  user,
  wishlist,
  removeFromWishList,
  getTotalWishList,
}) => {
  if (!wishlist)
    return <h2>Connectez-vous pour accéder à votre liste de souhaits.</h2>;

  return (
      <div>
        <BookList
          wishlist={wishlist}
          removeFromWishList={removeFromWishList}
          bookList={wishlist}
          addWish={addWish}
          user={user}
          inWish = {true}
        />
      </div>
  );
};

export default WishList;
