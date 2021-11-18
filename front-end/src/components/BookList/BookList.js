import React from "react";
import { Grid, CircularProgress, Typography, Button } from "@mui/material";
import BookItem from "../BookItem/BookItem";
import { Link } from "react-router-dom";
import { Context } from "../Context/Context";
import { useContext } from "react";
const BookList = ({ bookList }) => {
  const {
    inWish,
    account,
    removeFilter,
  } = useContext(Context)
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
      >{!inWish && <>
        <Typography align="center">Rien à afficher.</Typography>
        <Button onClick={removeFilter}>Retirer les filtres</Button></>}
        {inWish &&
          <Typography align="center">Votre liste de souhaits s'affichera ici.</Typography>}
      </div>
    );
  if (bookList.length === 0 && inWish)
    return <Typography align="center">Votre liste de souhaits s'affichera ici.</Typography>
  if (bookList.length === 0 && !inWish)
    return <Typography align="center">Rien à afficher ici.</Typography>

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
          <BookItem bookItem={book}
          />
        ))}
      </Grid>
    </>
  );
};
export default BookList;
