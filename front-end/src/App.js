import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import AppBar from "./components/AppBar/AppBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { IconButton } from "@mui/material";
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
import Card from "./components/Card/Card";
import BookListAdmin from "./components/Admin/BookListAdmin/BookListAdmin";
import ProductAdmin from "./components/Admin/ProductAdmin/ProductAdmin";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import OrdersAdmin from "./components/Admin/OrdersAdmin/OrdersAdmin";
import ClientsAdmin from "./components/Admin/ClientsAdmin/ClientsAdmin";
const styles = {
  root: {
    padding: 0,
    margin: 0,
  },
};

let theme = createTheme({
  palette: {
    primary: {
      main: "#EE2B69",
    },
    secondary: {
      main: "#EE2B69",
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
  const [response, setResponse] = useState(null);
  const [openSnack, setOpenSnack] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const [filter, setFilter] = useState(null);

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const addOrder = (order) => {
    setOrders([...orders, order]);
  };
  const addCart = (item) => {
    setCart([...cart, item]);
  };
  const addToCart = async (product) => {
    try {
      const { data: res } = await axios.post(
        `http://localhost:5000/users/${user.email}/cart`,
        {
          user: user,
          item: product,
        }
      );
      addCart(product);
      setResponse(res);
      setOpenSnack(true);
    } catch (err) {
      console.log(err);
      setResponse({
        add: false,
        message: "Un problème est survenu lors de l'ajout au panier.",
      });
    }
  };
  const addToWishList = async (item) => {
    try {
      const { data: res } = await axios.post(
        `http://localhost:5000/users/${user.email}/wishlist`,
        {
          user: user,
          item: item,
        }
      );
      setWishlist([...wishlist, item]);
      setResponse(res);
      setOpenSnack(true);
    } catch (err) {
      console.log(err);
      setResponse({
        add: false,
        message: "Un problème est survenu lors de l'ajout à la liste d'envies.",
      });
    }
  };
  const removeFromCart = async (item) => {
    try {
      const { data: res } = await axios.post(
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
      setResponse(res);
      setOpenSnack(true);
    } catch (err) {
      setResponse({
        add: false,
        message: "Un problème est survenu lors de la suppression du panier.",
      });
      console.log(err);
    }
  };
  const removeFromWishList = async (item) => {
    try {
      const { data: res } = await axios.post(
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
      setResponse(res);
      setOpenSnack(true);
    } catch (err) {
      setResponse({
        add: false,
        message:
          "Un problème est survenu lors de la suppression de la liste de souhaits.",
      });
      console.log(err);
    }
  };
  const emptyCart = async () => {
    try {
      const { data: res } = await axios.post(
        `http://localhost:5000/users/${user.email}/cart/empty`,
        {
          email: user.email,
        }
      );
      setCart([]);
      setResponse(res);
      setOpenSnack(true);
    } catch (err) {
      console.log(err);
      setResponse({
        add: false,
        message: "Un problème est survenu lors de la suppression du panier.",
      });
    }
  };
  const emptyWishlist = async () => {
    try {
      const { data: res } = await axios.post(
        `http://localhost:5000/users/${user.email}/wishlist/empty`,
        {
          email: user.email,
        }
      );
      setWishlist([]);
      setResponse(res);
      setOpenSnack(true);
    } catch (err) {
      console.log(err);
      setResponse({
        add: false,
        message:
          "Un problème est survenu lors de la suppression de la liste de souhaits.",
      });
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: prdcts } = await axios.get(
          `http://localhost:5000/products`
        );
        setProducts(prdcts);
        setAllProducts(prdcts);
      } catch (e) {
        alert("Could not connect to server. Please try again later.");
        console.error(e);
      }
    };
    fetchProducts();
  }, []);
  const removeFilter = () => {
    setProducts(allProducts);
    setFilter(null);
  };
  return (
    <div style={styles.root}>
      <ThemeProvider theme={theme}>
        <Router>
          <AppBar
            removeFilter={removeFilter}
            user={user}
            books={products}
            cart={cart}
            wishlist={wishlist}
          />
          <Switch>
            <Route exact path="/">
              <Home
                filter={filter}
                setFilter={setFilter}
                removeFilter={removeFilter}
                allProducts={allProducts}
                setProducts={setProducts}
                addWish={addToWishList}
                removeFromWishList={removeFromWishList}
                wishlist={wishlist}
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
                emptyCart={emptyCart}
              />
            </Route>
            <Route exact path="/register">
              <SignUp
                user={user}
                setUser={setUser}
                setCart={setCart}
                setWishList={setWishlist}
              />
            </Route>
            <Route exact path="/wishlist">
              <Wishlist
                emptyWishlist={emptyWishlist}
                addWish={addToWishList}
                user={user}
                wishlist={wishlist}
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
                wishlist={wishlist}
                removeFromWishList={removeFromWishList}
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
            <Route exact path="/admin/orders">
              <OrdersAdmin user={user} />
            </Route>
            <Route exact path="/admin/clients">
              <ClientsAdmin user={user} />
            </Route>
            <Route exact path="/admin/products">
              <BookListAdmin user={user} products={allProducts} />
            </Route>
            <Route exact path="/card">
              <Card />
            </Route>
            {/* <Route path="*">
              <ErrorPage />
            </Route> */}
            <Route
              exact
              path="/produit/:id"
              render={(props) => (
                <Product
                  addToCart={addToCart}
                  addToWishlist={addToWishList}
                  user={user}
                  id={props.match.params.id}
                  key={props.location.key}
                />
              )}
            />
            <Route
              exact
              path="/produit/:id/admin"
              render={(props) => (
                <ProductAdmin
                  addToCart={addToCart}
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
        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleCloseSnack}
          action={action}
        >
          {response && response?.add ? (
            <Alert onClose={handleCloseSnack} severity="success">
              {response.message}
            </Alert>
          ) : (
            response && (
              <Alert onClose={handleCloseSnack} severity="error">
                {response.message}
              </Alert>
            )
          )}
        </Snackbar>
      </ThemeProvider>
    </div>
  );
}

export default App;
