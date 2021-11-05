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
import ErrorPage from "./components/404/404";
import MyOrders from "./components/MyOrders/MyOrders";
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
  const getTotal = () => {
    let tot = 0;
    cart?.map((item) => {
      tot += item.price;
      return tot;
    });
    return tot;
  };
  const getTotalWishList = () => {
    let tot = 0;
    wishlist?.map((item) => {
      tot += item.price;
      return tot;
    });
    return tot;
  };
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
  const addToWishList = async (item) => {
    try {
      await axios.post(`http://localhost:5000/users/${user.email}/wishlist`, {
        user: user,
        item: item,
      });
      setWishlist([...wishlist, item]);
    } catch (err) {
      console.log(err);
    }
  };
  const removeFromCart = async (item) => {
    try {
      await axios.post(
        `http://localhost:5000/users/${user.email}/cart/remove`,
        {
          email: user.email,
          item: item,
        }
      );
      var newCart = cart.filter(function (e) {
        return e._id !== item._id;
      });
      setCart(newCart);
    } catch (err) {
      console.log(err);
    }
  };
  const removeFromWishList = async (item) => {
    try {
      await axios.post(
        `http://localhost:5000/users/${user.email}/wishlist/remove`,
        {
          email: user.email,
          item: item,
        }
      );
      var newWishList = wishlist.filter(function (e) {
        return e._id !== item._id;
      });
      setWishlist(newWishList);
    } catch (err) {
      console.log(err);
    }
  };
  const emptyCart = async () => {
    setCart([]);
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
        console.error(e);
      }
    };
    fetchProducts();
  }, [products]);

  return (
    <div style={styles.root}>
      <ThemeProvider theme={theme}>
        <Router>
          <AppBar books={products} cart={cart} wishlist={wishlist} />
          <Switch>
            <Route exact path="/">
              <Home
                addWish={addToWishList}
                removeFromWishList={removeFromWishList}
                wishlist = {wishlist}
                user={user}
                bookList={products}
              />
            </Route>
            <Route exact path="/panier">
              <CartList
                user={user}
                cart={cart}
                addOrder={addOrder}
                total={getTotal()}
                removeFromCart={removeFromCart}
              />
            </Route>
            <Route exact path="/register">
              <SignUp user={user} setUser={setUser} />
            </Route>
            <Route exact path="/wishlist">
              <Wishlist
                user={user}
                cart={wishlist}
                getTotalWishList={getTotalWishList()}
                removeFromWishList={removeFromWishList}
              />
            </Route>
            <Route path="/404">
              <ErrorPage />
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
              <FinishOrder
                cart={cart}
                user={user}
                addOrder={addOrder}
                tot={getTotal()}
                emptyCart={emptyCart}
              />
            </Route>
            <Route exact path="/myorders">
              <MyOrders user={user} />
            </Route>
            <Route
              exact
              path="/produit/:id"
              render={(props) => (
                <Product
                  addCart={addCart}
                  addToWishlist={addToWishList}
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
