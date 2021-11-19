import React, { useEffect } from "react";
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
import BookListAdmin from "./components/Admin/BookListAdmin/BookListAdmin";
import ProductAdmin from "./components/Admin/ProductAdmin/ProductAdmin";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import OrdersAdmin from "./components/Admin/OrdersAdmin/OrdersAdmin";
import ClientsAdmin from "./components/Admin/ClientsAdmin/ClientsAdmin";
import Header from "./components/Header/Header";
import { Context } from "./components/Context/Context";
import { useContext } from "react";
import CookieConsent from "react-cookie-consent";
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
  const {
    wishlist,
    setOpenSnack,
    response,
    setResponse,
    setProducts,
    setAllProducts,
    openSnack,
    cookies,
    setUser,
    setWishlist,
    setCart,
  } = useContext(Context);
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: prdcts } = await axios.get(
          `http://localhost:5000/products`
        );
        setProducts(prdcts);
        setAllProducts(prdcts);
        console.log("fetched");
      } catch (e) {
        setResponse(e);
        setOpenSnack(true);
        console.error(e);
      }
    };
    fetchProducts();
  }, [setProducts, setAllProducts, setOpenSnack, setResponse]);

  useEffect(() => {
    const fetchCookies = async () => {
      if (!cookies.user) {
        setUser(null);
      } else {
        setUser(cookies.user);
        setCart(cookies.cart);
        setWishlist(cookies.wishlist);
      }
      console.log(cookies);
    };
    fetchCookies();
  }, [cookies, setWishlist, setUser, setCart]);
  return (
    <div style={styles.root}>
      <ThemeProvider theme={theme}>
        <Router>
          <AppBar />
          <CookieConsent
            location="bottom"
            buttonText="J'accepte"
            declineButtonText="Je refuse"
            cookieName="myAwesomeCookieName"
            style={{ background: "white", color: "#EE2B69", zIndex:55555555, borderTop:"solid 1px #EE2B69"}}
            declineButtonStyle={{
              background: "white",
              borderRadius: "4px",
              color: "#EE2B69",
              fontSize: "13px",
            }}
            buttonStyle={{
              background: "#EE2B69",
              borderRadius: "4px",
              color: "white",
              fontSize: "13px",
            }}
            expires={150}
            enableDeclineButton
          >
            Nous utilisons des cookies pour optimiser notre site et nos
            services.
          </CookieConsent>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/panier">
              <Header />
              <CartList />
              <Footer />
            </Route>
            <Route exact path="/register">
              <Header />
              <SignUp />
              <Footer />
            </Route>
            <Route exact path="/wishlist">
              <Header />
              <Wishlist bookList={wishlist} />
              <Footer />
            </Route>
            <Route path="/404">
              <Header />
              <ErrorPage />
              <Footer />
            </Route>
            <Route exact path="/compte">
              <Header />
              <Profile />
              <Footer />
            </Route>
            <Route exact path="/order">
              <Header />
              <FinishOrder />
              <Footer />
            </Route>
            <Route exact path="/myorders">
              <Header />
              <MyOrders />
              <Footer />
            </Route>
            <Route exact path="/admin/orders">
              <Header />
              <OrdersAdmin />
              <Footer />
            </Route>
            <Route exact path="/admin/clients">
              <Header />
              <ClientsAdmin />
              <Footer />
            </Route>
            <Route exact path="/admin/products">
              <Header />
              <BookListAdmin />
              <Footer />
            </Route>
            <Route
              exact
              path="/produit/:id"
              render={(props) => (
                <>
                  <Header />
                  <Product
                    id={props.match.params.id}
                    key={props.location.key}
                  />
                  <Footer />
                </>
              )}
            />
            <Route
              exact
              path="/produit/:id/admin"
              render={(props) => (
                <>
                  <Header />Ò
                  <ProductAdmin
                    id={props.match.params.id}
                    key={props.location.key}
                  />
                  <Footer />
                </>
              )}
            />
          </Switch>
        </Router>
        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleCloseSnack}
          action={action}
        >
          {response && response?.success ? (
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
