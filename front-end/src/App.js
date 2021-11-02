import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import AppBar from "./components/AppBar/AppBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Product from "./components/Product/Product";
import Profile from "./components/Profile/Profile";
import SignUp from "./components/SignUp/SignUp";
import CartList from "./components/CartList/CartList";
import Wishlist from "./components/Wishlist/Wishlist";
import Footer from "./components/Footer/Footer";
import FinishOrder from "./components/FinishOrder/FinishOrder";
import { getBottomNavigationUtilityClass } from "@mui/material";
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
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState(null);

  const addOrder = (order) => {
    setOrders([...orders, order]);
  };
  const addCart = (item) => {
    setCart([...cart, item]);
  };
  const addToWishlist = (item) => {
    setWishlist([...wishlist, item]);
  };
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

  const handleAdd = async (tot) => {
    try {
      const total = tot;
      const order = {
        customer: user,
        items: cart,
        total: total,
        creation: new Date(),
      };
      const { data: res } = await axios.post(`http://localhost:5000/orders/`, {
        order: order,
      });
      console.log(res);
      if (res.creation) {
        addOrder(res.order[0]);
      } else {
        console.log("Impossible de finaliser la commande.");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={styles.root}>
      <ThemeProvider theme={theme}>
        <Router>
          <AppBar books={products} cart={cart} wishlist={wishlist} />
          <Switch>
            <Route exact path="/">
              <Home addWish={addToWishlist} user={user} bookList={products} />
            </Route>
            <Route exact path="/panier">
              <CartList user={user} cart={cart} addOrder={addOrder} />
            </Route>
            <Route exact path="/register">
              <SignUp user={user} setUser={setUser} />
            </Route>
            <Route exact path="/wishlist">
              <Wishlist cart={wishlist} />
            </Route>
            <Route exact path="/compte">
              <Profile
                setCart={setCart}
                setUser={setUser}
                setWishlist={setWishlist}
                user={user}
              />
            </Route>
            <Route exact path="/order">
              <FinishOrder cart={cart} user={user} />
            </Route>
            <Route
              exact
              path="/produit/:id"
              render={(props) => (
                <Product
                  addCart={addCart}
                  addWish={addToWishlist}
                  user={user}
                  id={props.match.params.id}
                  key={props.location.key}
                />
              )}
            />
          </Switch>
          <Footer />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
