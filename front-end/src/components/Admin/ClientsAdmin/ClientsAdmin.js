import React, { useEffect, useState } from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import ClientListAdmin from "../ClientListAdmin/ClientListAdmin";
import axios from "axios";
import { Redirect } from "react-router";
const ClientAdmin = ({ user }) => {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: ords } = await axios.get(
          "http://localhost:5000/users"
        );
        setClients(ords);
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
  if (!clients?.length)
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
        <CircularProgress color="primary" />
      </div>
    );

  if (clients.length === 0)
    return <Typography>Aucun client enregistré.</Typography>;
  return (
    <div>
      <ClientListAdmin clients={clients} />
    </div>
  );
};

export default ClientAdmin;
