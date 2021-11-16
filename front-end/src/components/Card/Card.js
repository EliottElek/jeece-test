import React from "react";
import { Card, Typography } from "@mui/material";
import mastercard from "../../images/mastercard.jpg";
const styles = {
  front: {
    width: "200px",
    height: "120px",
    borderRadius: "6px",
    transform: "translate(10%, -60%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "column",
    background: "#f0eeeb",
  },
  back: {
    width: "200px",
    height: "120px",
    borderRadius: "6px",
  },
  line: {
    height: "20px",
    width: "100%",
    marginTop: "10%",
    background: "#f0eeeb",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
};
const CreditCardInput = ({ expireDate, cardNumber, crypto, owner }) => {
  return (
    <div style={{ padding: "10px" }}>
      {/* back */}
      <Card elevation={5} style={styles.back}>
        <div style={styles.line}>
          <Typography
            color="primary"
            variant="body1"
            style={{ marginRight: "20px" }}
          >
            {crypto}
          </Typography>
        </div>
      </Card>
      {/* front */}
      <Card elevation={5} style={styles.front}>
        <Typography
          color="primary"
          style={{ marginRight: "20px" }}
          variant="caption"
          bold
        >
          {owner}
        </Typography>
        <Typography
          color="primary"
          style={{ marginRight: "20px" }}
          variant="body1"
          bold
        >
          {cardNumber}
        </Typography>
        <Typography
          color="primary"
          style={{ marginRight: "20px" }}
          variant="caption"
          bold
        >
          {expireDate}
        </Typography>
        <img src={mastercard} alt="mastercard" width="40px" height="auto" />
      </Card>
    </div>
  );
};

export default CreditCardInput;
