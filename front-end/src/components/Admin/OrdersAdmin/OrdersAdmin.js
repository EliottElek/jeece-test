import React, { useEffect, useState } from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import OrderListAdmin from "../OrderListAdmin/OrderListAdmin";
import axios from "axios";
import { Redirect } from "react-router";
const OrdersAdmin = ({ user }) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: ords } = await axios.get(
          "http://localhost:5000/orders/admin"
        );
        setOrders(ords);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);
  if (!user || !user?.admin)
    return (
      <div>
        <Redirect to="/404" />
      </div>
    );
    if (!orders.length) {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        <CircularProgress style={{ color: "#EE2B69" }} />
        </div>
      );
    }
  if (orders.length === 0)
    return <Typography align="center">Aucune commande passée.</Typography>;
  return (
    <div>
      <OrderListAdmin orders={orders} />
    </div>
  );
};

export default OrdersAdmin;
