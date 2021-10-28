import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import InputBase from "@mui/material/InputBase";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    maxWidth: "50%!important",
    borderRadius: 50,
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 12px",
    marginLeft: "30px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const filter = createFilterOptions();

export default function SearchBar({ books }) {
  const [value, setValue] = React.useState(null);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some(
          (option) => inputValue === option.title
        );
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            disabled: true,
            title: `Aucune option`,
          });
        }

        return filtered;
      }}
      options={books}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(props, option) => (
        <>
          {option.title === "Aucune option" ? (
            <li>Aucune option.</li>
          ) : (
            <Link to={`/produit/${option._id}`} key={option.id}>
              <li style={{ display: "flex", height: "70px" }} {...props}>
                <img
                  style={{ height: "100%", width: "auto" }}
                  src={option.mediaUrl}
                  alt={option._id}
                />
                <Typography variant="body1">
                  <span style={{ fontWeight: "bold" }}>{option.title}</span>,{" "}
                  {option.author}
                </Typography>
              </li>
            </Link>
          )}
        </>
      )}
      freeSolo
      renderInput={(params) => <BootstrapInput {...params} />}
    />
  );
}
