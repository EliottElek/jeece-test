import {
  FormControl,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
  Switch,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import Stepper from "../Stepper/Stepper";
import { Redirect } from "react-router-dom";

const styles = {
  input: {
    marginTop: "10px",
  },
};
const FinishOrder = (cart, user) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [facturation, setFacturation] = useState(true);
  if (cart.cart === null) {
    return (
      <div>
        <Redirect to="/" />
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "90vw",
        margin: "auto",
        maxWidth: "1000px",
      }}
    >
      <Paper
        elevation={1}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Stepper
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
        />

        {activeStep === 0 && (
          <>
            <Typography>Renseignez votre adresse de livraison</Typography>
            <FormControl style={{ width: "60%", margin: "auto", padding: 10 }}>
              <TextField
                style={styles.input}
                label="Adresse"
                placeHolder={"exemple : 12 rue du Pauvre"}
              />
              <TextField
                style={styles.input}
                label="Code postal"
                placeHolder={"exemple : 76019"}
              />
              <TextField
                style={styles.input}
                label="Ville"
                placeHolder={"exemple : Rouen"}
              />
              <TextField
                style={styles.input}
                label="Pays"
                placeHolder={"exemple : France"}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: "10px",
                }}
              >
                <Button variant="contained" onClick={handleNext}>
                  Suivant
                </Button>
              </div>
            </FormControl>
          </>
        )}
        {activeStep === 1 && (
          <>
            <Typography variant="h6">
              Renseignez votre adresse de facturation
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={facturation}
                  onChange={() => setFacturation(!facturation)}
                />
              }
              label="Utiliser l'adresse de livraison"
            />
            {!facturation && (
              <>
                <Typography>Renseignez votre adresse de facturation</Typography>
                <FormControl
                  style={{ width: "60%", margin: "auto", padding: 10 }}
                >
                  <TextField
                    style={styles.input}
                    label="Adresse"
                    placeHolder={"exemple : 12 rue du Pauvre"}
                  />
                  <TextField
                    style={styles.input}
                    label="Code postal"
                    placeHolder={"exemple : 76019"}
                  />
                  <TextField
                    style={styles.input}
                    label="Ville"
                    placeHolder={"exemple : Rouen"}
                  />
                  <TextField
                    style={styles.input}
                    label="Pays"
                    placeHolder={"exemple : France"}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      paddingTop: "10px",
                    }}
                  >
                    <Button variant="contained" onClick={handleNext}>
                      Suivant
                    </Button>
                  </div>
                </FormControl>
              </>
            )}
          </>
        )}
        {activeStep === 2 && (
          <Typography>Renseignez votre moyen de paiement</Typography>
        )}
        {activeStep === 3 && <Typography>Finalisez la commande</Typography>}
      </Paper>
    </div>
  );
};

export default FinishOrder;
