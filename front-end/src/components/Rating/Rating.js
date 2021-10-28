import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function BasicRating({ rating }) {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating name="read-only" value={rating} readOnly />
    </Box>
  );
}
