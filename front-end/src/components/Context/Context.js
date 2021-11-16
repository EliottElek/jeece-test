import React, { useState } from "react";
import axios from 'axios';
export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
  const [header, setHeader] = useState("Boutique");
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState(null);
  const [response, setResponse] = useState(null);
  const [openSnack, setOpenSnack] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [filter, setFilter] = useState(null);

  return (
    <Context.Provider
      value={{
        header: header,
        products: products,
        user: user,
        cart: cart,
        orders: orders,
        wishlist: wishlist,
        response: response,
        openSnack: openSnack,
        allProducts: allProducts,
        filter: filter,
        setHeader: setHeader,
        setProducts: setProducts,
        setUser: setUser,
        setCart: setCart,
        setOrders: setOrders,
        setWishlist: setWishlist,
        setResponse: setResponse,
        setOpenSnack: setOpenSnack,
        setAllProducts: setAllProducts,
        setFilter: setFilter,
        removeFilter: () => {
          setProducts(allProducts);
          setFilter(null);
        },
        getTotal: () => {
          let tot = 0;
          cart?.map((item) => {
            tot += item.price;
            return tot;
          });
          return tot;
        },
        getTotalWishList: () => {
          let tot = 0;
          wishlist?.map((item) => {
            tot += item.price;
            return tot;
          });
          return tot;
        },
        addOrder: (order) => {
          setOrders([...orders, order]);
        },
        addCart: (item) => {
          setCart([...cart, item]);
        },
        addToCart: async (product) => {
          try {
            const { data: res } = await axios.post(
              `http://localhost:5000/users/${user.email}/cart`,
              {
                user: user,
                item: product,
              }
            );
            setCart([...cart, product]);
            setResponse(res);
            setOpenSnack(true);
          } catch (err) {
            console.log(err);
            setResponse({
              add: false,
              message: "Un problème est survenu lors de l'ajout au panier.",
            });
          }
        },
        addToWishList: async (item) => {
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
        },
        removeFromCart: async (item) => {
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
        },
        removeFromWishList: async (item) => {
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
        },
        emptyCart: async () => {
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
        },
        emptyWishlist: async () => {
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
        }
      }}
    >
      {children}
    </Context.Provider>
  );
};
