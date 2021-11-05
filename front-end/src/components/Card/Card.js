import React from "react";
import { Card, TextField, Typography } from "@mui/material";

const styles = {
  front: {
    width: "300px",
    height: "170px",
    borderRadius: "6px",
    background: "lightgray",
    transform: "translate(10%, -60%)",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  back: {
    width: "300px",
    height: "170px",
    borderRadius: "6px",
    background: "gray",
  },
  line: {
    height: "20px",
    width: "100%",
    marginTop: "10%",
    background: "lightgray",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
};
const CreditCardInput = ({
  expireDate,
  setExpireDate,
  cardNumber,
  setCardNumber,
  crypto,
  setCrypto,
}) => {
  return (
    <div style={{ padding: "10px" }}>
      {/* back */}
      <Card elevation={5} style={styles.back}>
        <div style={styles.line}>
          <Typography style={{ marginRight: "20px" }}>
            <input
              style={{ width: "70px", height: "100%", margin: 0 }}
              value={crypto}
              onChange={(e) => setCrypto(e.target.value)}
              placeHolder={"crypto"}
            />
          </Typography>
        </div>
      </Card>
      {/* front */}
      <Card elevation={5} style={styles.front}>
        <Typography style={{ marginLeft: "20px" }} variant="h6" bold>
          <input placeHolder={"Nom du titulaire"} />
        </Typography>
        <Typography style={{ marginLeft: "20px" }} variant="h6" bold>
          <input
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeHolder="Numéro de carte"
          />
        </Typography>
        <Typography style={{ marginLeft: "20px" }} variant="h6" bold>
          <input
            value={expireDate}
            onChange={(e) => setExpireDate(e.target.value)}
            placeHolder="Date d'expiration"
          />
        </Typography>
      </Card>
    </div>
  );
};

export default CreditCardInput;
