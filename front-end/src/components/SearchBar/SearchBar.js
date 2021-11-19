import React, { useContext, useState } from "react";
import "./SearchBar.css";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Context } from "../Context/Context";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
function SearchBar({ placeholder }) {
  const { allProducts } = useContext(Context);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = allProducts.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon sx={{ color: "primary.main" }} />
          ) : (
            <CloseIcon
              id="clearBtn"
              sx={{ color: "primary.main" }}
              onClick={clearInput}
            />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, index) => {
            return (
              <Link
                onClick={clearInput}
                to={`/produit/${value._id}`}
                key={value.id}
              >
                <ListItem alignItems="flex-start">
                  <img height="70px" src={value.mediaUrl} alt={index} />
                  <ListItemText
                    primary={value.title}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {value.author}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
