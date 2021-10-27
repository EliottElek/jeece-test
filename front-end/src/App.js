import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import AppBar from "./components/AppBar/AppBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BookList from "./components/BookList/BookList";
const styles = {
  root: {
    padding: 0,
    margin: 0,
  },
};

let theme = createTheme({
  palette: {
    primary: {
      main: "#004155",
    },
    secondary: {
      main: "#edf2ff",
    },
  },
});

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: prdcts } = await axios.get(
          `http://localhost:5000/products`
        );
        setProducts(prdcts);
      } catch (e) {
        alert("Could not connect to server. Please try again later.");
        console.error();
      }
    };
    fetchProducts();
  }, [products]);
  return (
    <div style={styles.root}>
      <ThemeProvider theme={theme}>
        <Router>
          <AppBar />
          <Switch>
            <Route exact path="/">
              <BookList bookList={products} />
            </Route>
            <Route exact path="/wishlist">
              <h1>ma liste d'envies</h1>
            </Route>
            <Route exact path="/compte">
              <h1>mon compte</h1>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
