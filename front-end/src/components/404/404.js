import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../Context/Context";
const ErrorPage = () => {
  const { setHeader } = useContext(Context)
  setHeader("Page introuvable.");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Erreur 404</Typography>
      <Typography variant="h6">
        On dirait que vous vous êtes perdu...{" "}
        <Link to="/">Revenez en lieu sûr.</Link>
      </Typography>
    </div>
  );
};

export default ErrorPage;
