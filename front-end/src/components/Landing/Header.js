import React from "react";
import headerpic from "../../images/header.jpg";
import { Typography, Card, Grid } from "@mui/material";
import logo from "../../images/logo.png";
import SearchBar from "../SearchBar/SearchBar";
const styles = {
  header: {
    width: "100%",
    height: "650px",
    marginTop: "-30px",
    marginBottom: "40px",
    display: "flex",
    alignItems: "center",
    backgroundImage: `url(${headerpic})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    backgroundSize: "cover",
  },
};
const Header = () => {
  return (
    <div style={styles.header}>
      <Grid container style={{ width: "80%", margin: "auto" }}>
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          item
          xs={12}
          md={12}
          lg={6}
          xl={6}
        >
          <img width="80%" style = {{maxWidth:"400px"}} src={logo} alt={logo} />
        </Grid>
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          item
          xs={12}
          md={12}
          lg={6}
          xl={6}
        >
          <Card
            sx={{
              bgcolor: "rgb(255,255,255,0.5)",
              minHeight: "100px",
              padding: "30px",
              paddingRight: "50px",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "baseline",
            }}
          >
            <Typography>
              Trouvez dès maintenant le livre qui vous correspond !
            </Typography>
            <Typography variant="caption">
              Parcourez notre large liste de livres, pour tous les genres !
            </Typography>
            <div style={{ height: "30px" }} />
            <SearchBar placeholder={"Trouvez un livre..."}/>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
