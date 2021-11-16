import React, { useContext, useEffect, useState } from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import ClientListAdmin from "../ClientListAdmin/ClientListAdmin";
import axios from "axios";
import { Redirect } from "react-router";
import { Context } from "../../Context/Context";
const ClientAdmin = () => {
  const { user } = useContext(Context)
  const [clients, setClients] = useState([]);
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data: cli } = await axios.get("http://localhost:5000/users");
        setClients(cli);
      } catch (err) {
        console.error(err);
      }
    };
    fetchClients();
  }, []);
  if (!user || !user?.admin)
    return (
      <div>
        <Redirect to="/404" />
      </div>
    );
  if (!clients.length) {
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
  if (clients.length === 0)
    return <Typography align="center">Aucune commande passée.</Typography>;

  return (
    <div>
      <ClientListAdmin clients={clients} />
    </div>
  );
};

export default ClientAdmin;
