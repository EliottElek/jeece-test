import {
  FormControl,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
  Switch,
  Button,
  Card,
  Grid,
  List,
  ListItemAvatar,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Stepper from "../Stepper/Stepper";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link, Redirect } from "react-router-dom";
import CreditCard from "../Card/Card";
import axios from "axios";
import logo from "../../images/logo.png";
import { Context } from "../Context/Context";
const styles = {
  input: {
    marginTop: "10px",
  },
};
const FinishOrder = () => {
  const {
    cart,
    user,
    addOrder,
    getTotal,
    emptyCart,
    setHeader,
    setResponse,
    setOpenSnack,
  } = useContext(Context);
  setHeader("Finalisez votre commande");

  const [finished, setFinished] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [disabled2, setDisabled2] = useState(true);
  const [disabled3, setDisabled3] = useState(true);

  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [address2, setAddress2] = useState("");
  const [postal2, setPostal2] = useState("");
  const [city2, setCity2] = useState("");
  const [country2, setCountry2] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  const [cardNumber, setCardNumber] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [crypto, setCrypto] = useState("");
  const [owner, setOwner] = useState("");

  const [modifyDeliveryAddress, setModifyDeliveryAddress] = useState(false);
  const [modifyFacturationAddress, setModifyFacturationAddress] =
    useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [facturation, setFacturation] = useState(true);

  useEffect(() => {
    const handleChangeDisabled = () => {
      if (address !== "" && postal !== "" && city !== "" && country !== "")
        setDisabled(false);
      else setDisabled(true);
    };
    handleChangeDisabled();
  }, [address, city, country, postal]);
  useEffect(() => {
    const handleChangeDisabled2 = () => {
      if (address2 !== "" && postal2 !== "" && city2 !== "" && country2 !== "")
        setDisabled2(false);
      else setDisabled2(true);
    };
    handleChangeDisabled2();
  }, [address2, city2, country2, postal2]);
  useEffect(() => {
    const handleChangeDisabled3 = () => {
      if (
        cardNumber !== "" &&
        expireDate !== "" &&
        crypto !== "" &&
        owner !== ""
      )
        setDisabled3(false);
      else setDisabled3(true);
    };
    handleChangeDisabled3();
  }, [cardNumber, expireDate, crypto, owner]);
  const handleAdd = async () => {
    try {
      const total = getTotal();
      const payment = {
        cardNumber: cardNumber,
        expireDate: expireDate,
        crypto: crypto,
        owner: owner,
      };
      const deliveryAddress = {
        address: address,
        postal: postal,
        city: city,
        country: country,
      };
      let facturationAddress = {};
      if (facturation) {
        facturationAddress = deliveryAddress;
      } else {
        facturationAddress = {
          address: address2,
          postal: postal2,
          city: city2,
          country: country2,
        };
      }
      const order = {
        email: user.email,
        items: cart,
        total: total,
        creation: new Date(),
        paymentMethod: payment,
        facturationAddress: facturationAddress,
        deliveryAddress: deliveryAddress,
      };
      const { data: res } = await axios.post(`http://localhost:5000/orders/`, {
        order: order,
      });
      if (res.success) {
        addOrder(res.order[0]);
        setFinished(true);
        emptyCart();
        setResponse(res);
        setOpenSnack(true);
      } else {
        setResponse(res);
        setOpenSnack(true);
      }
    } catch (err) {
      setResponse({ message: "rrrrerere" });
      setOpenSnack(true);
    }
  };

  if (cart === null || !user || user?.admin) {
    return (
      <div>
        <Redirect to="/404" />
      </div>
    );
  }
  if (finished)
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
        <img alt="bookstore" src={logo} />
        <Typography variant="h6">Vous remercie.</Typography>
        <Typography>Votre commande a ??t?? pass??e avec succ??s.</Typography>
        <Link to="/">Retour ?? la boutique</Link>
        <Link to="/myorders">Voir l'historique de mes commandes</Link>
      </div>
    );
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
      <Stepper
        disabled={disabled}
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
      />

      {activeStep === 0 && (
        <>
          <Typography>Renseignez votre adresse de livraison</Typography>
          <FormControl style={{ width: "60%", margin: "auto", padding: 10 }}>
            <TextField
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={styles.input}
              label="Adresse"
            />
            <TextField
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
              style={styles.input}
              label="Code postal"
            />
            <TextField
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={styles.input}
              label="Ville"
            />
            <TextField
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={styles.input}
              label="Pays"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "10px",
              }}
            >
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={disabled}
              >
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
            label={
              facturation
                ? "Utiliser l'adresse de livraison, ?? savoir :"
                : "Renseignez l'adresse de facturation :"
            }
          />
          <Paper
            elevation={0}
            sx={{
              border: "solid 1px whitesmoke",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            {facturation && (
              <Typography variant="caption">
                {address}, {postal} {city}, {country}
              </Typography>
            )}
          </Paper>
          {facturation && (
            <Button
              style={{ marginTop: "10px" }}
              variant="contained"
              onClick={handleNext}
            >
              Suivant
            </Button>
          )}
          {!facturation && (
            <>
              <FormControl
                style={{ width: "60%", margin: "auto", padding: 10 }}
              >
                <TextField
                  required
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  style={styles.input}
                  label="Adresse"
                />
                <TextField
                  required
                  value={postal2}
                  onChange={(e) => setPostal2(e.target.value)}
                  style={styles.input}
                  label="Code postal"
                />
                <TextField
                  required
                  value={city2}
                  onChange={(e) => setCity2(e.target.value)}
                  style={styles.input}
                  label="Ville"
                />
                <TextField
                  required
                  value={country2}
                  onChange={(e) => setCountry2(e.target.value)}
                  style={styles.input}
                  label="Pays"
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingTop: "10px",
                  }}
                ></div>
                <Button
                  disabled={disabled2}
                  variant="contained"
                  onClick={handleNext}
                >
                  Suivant
                </Button>
              </FormControl>
            </>
          )}
        </>
      )}
      {activeStep === 2 && (
        <>
          <Typography>Renseignez votre moyen de paiement</Typography>
          <FormControl style={{ width: "60%", margin: "auto", padding: 10 }}>
            <TextField
              required
              type="number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              style={styles.input}
              label="Num??ro de carte"
            />
            <Typography style={{ marginTop: "5px" }} variant="caption">
              Date d'expiration
            </Typography>
            <TextField
              required
              type="date"
              min={new Date()}
              value={expireDate}
              onChange={(e) => setExpireDate(e.target.value)}
              style={{ marginBottom: "0px" }}
            />
            <TextField
              required
              type="number"
              value={crypto}
              onChange={(e) => setCrypto(e.target.value)}
              style={styles.input}
              label="Cryptogramme"
            />
            <TextField
              required
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              style={styles.input}
              label="Titulaire"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "10px",
              }}
            >
              <Button
                disabled={disabled3}
                variant="contained"
                onClick={handleNext}
              >
                Suivant
              </Button>
            </div>
          </FormControl>
        </>
      )}
      {activeStep === 3 && (
        <>
          <Typography>R??capitulatif de la commande : </Typography>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ maxHeight: "400px" }}
          >
            <Grid item xs={12} md={12} lg={6} xl={6}>
              <Card sx={{ width: "90%", margin: "10px" }}>
                <React.Fragment>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Adresse de livraison
                    </Typography>
                    {!modifyDeliveryAddress ? (
                      <>
                        <Typography variant="h6" component="div">
                          {address}, {postal} {city}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {country}
                        </Typography>
                      </>
                    ) : (
                      <FormControl
                        style={{ width: "60%", margin: "auto", padding: 10 }}
                      >
                        <TextField
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          style={styles.input}
                          label="Adresse"
                        />
                        <TextField
                          value={postal}
                          onChange={(e) => setPostal(e.target.value)}
                          style={styles.input}
                          label="Code postal"
                        />
                        <TextField
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          style={styles.input}
                          label="Ville"
                        />
                        <TextField
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          style={styles.input}
                          label="Pays"
                        />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            paddingTop: "10px",
                          }}
                        >
                          <Button
                            variant="contained"
                            onClick={() => setModifyDeliveryAddress(false)}
                          >
                            Sauvegarder
                          </Button>
                        </div>
                      </FormControl>
                    )}
                  </CardContent>
                  {!modifyDeliveryAddress && (
                    <CardActions>
                      <Button
                        onClick={() => setModifyDeliveryAddress(true)}
                        size="small"
                      >
                        Modifier
                      </Button>
                    </CardActions>
                  )}
                </React.Fragment>
              </Card>
              <Card sx={{ width: "90%", margin: "10px" }}>
                <React.Fragment>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Adresse de facturation
                    </Typography>
                    {address2 !== "" ? (
                      <>
                        <Typography variant="h6" component="div">
                          {address2}, {postal2} {city2}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {country2}
                        </Typography>
                      </>
                    ) : !modifyFacturationAddress ? (
                      <>
                        <Typography variant="h6" component="div">
                          {address}, {postal} {city}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {country}
                        </Typography>
                      </>
                    ) : (
                      <FormControl
                        style={{ width: "60%", margin: "auto", padding: 10 }}
                      >
                        <TextField
                          required
                          value={address2}
                          onChange={(e) => setAddress2(e.target.value)}
                          style={styles.input}
                          label="Adresse"
                        />
                        <TextField
                          required
                          value={postal2}
                          onChange={(e) => setPostal2(e.target.value)}
                          style={styles.input}
                          label="Code postal"
                        />
                        <TextField
                          required
                          value={city2}
                          onChange={(e) => setCity2(e.target.value)}
                          style={styles.input}
                          label="Ville"
                        />
                        <TextField
                          required
                          value={country2}
                          onChange={(e) => setCountry2(e.target.value)}
                          style={styles.input}
                          label="Pays"
                        />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            paddingTop: "10px",
                          }}
                        ></div>
                        <Button
                          variant="contained"
                          onClick={() => setModifyFacturationAddress(false)}
                        >
                          Sauvegarder
                        </Button>
                      </FormControl>
                    )}
                  </CardContent>
                  {!modifyFacturationAddress && (
                    <CardActions>
                      <Button
                        onClick={() => setModifyFacturationAddress(true)}
                        size="small"
                      >
                        Modifier
                      </Button>
                    </CardActions>
                  )}
                </React.Fragment>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              lg={6}
              xl={6}
              style={{ height: "100%", overflowX: "auto" }}
            >
              <Typography variant="caption">Moyen de paiement: </Typography>
              <CreditCard
                crypto={crypto}
                expireDate={expireDate}
                cardNumber={cardNumber}
                owner={owner}
              />
              <List
                height={400}
                width={360}
                itemSize={46}
                itemCount={200}
                overscanCount={5}
              >
                {cart.map((item) => (
                  <ListItem
                    key={item?._id}
                    component="div"
                    disablePadding
                    secondaryAction={<Typography>x{item?.quantity}</Typography>}
                  >
                    <ListItemAvatar>
                      <img height="50px" src={item?.mediaUrl} alt={item?._id} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item?.title}
                      secondary={item?.author}
                    />
                  </ListItem>
                ))}
              </List>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "10px",
                }}
              >
                <Button variant="contained" onClick={handleAdd}>
                  Finaliser la commande
                </Button>
              </div>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default FinishOrder;
