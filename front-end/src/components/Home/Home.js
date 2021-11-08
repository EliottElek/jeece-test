import React, { useState, useEffect } from "react";
import BookList from "../BookList/BookList";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import {
  Divider,
  Grid,
  Button,
  List,
  ListItem,
  ListItemButton,
  Typography,
  Drawer,
  Breadcrumbs,
} from "@mui/material";

const styles = {
  root: {
    padding: 0,
    margin: 0,
  },
};
const catego = [
  "Drame",
  "Amour",
  "Science Fiction",
  "Fantastique",
  "Philosophie",
  "Histoire",
];

const Home = ({ bookList, wishlist, addWish, removeFromWishList, user }) => {
  const [filter, setFilter] = useState({
    parent: "auteurs",
    children: "Sandrel Julien",
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const getAuthors = () => {
    const authors = [];
    for (let i = 0; i < bookList.length; i++) {
      authors.push(bookList[i].author);
    }
    return authors;
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const Nav = () => (
    <List style={{ overflowY: "auto" }}>
      <Divider />
      <ListItem>
        <Typography sx={{ fontWeight: "bold", color: "primary.main" }}>
          Trier par catégorie
        </Typography>
      </ListItem>
      <Divider />
      {catego.map((categorie) => (
        <ListItemButton
          onClick={() =>
            setFilter({ parent: "categorie", children: categorie })
          }
        >
          {categorie}
        </ListItemButton>
      ))}
      <Divider />
      <ListItem>
        <Typography sx={{ fontWeight: "bold", color: "primary.main" }}>
          Trier par auteur
        </Typography>
      </ListItem>
      <Divider />
      {getAuthors()?.map((author) => (
        <ListItemButton
          onClick={() => setFilter({ parent: "auteurs", children: author })}
        >
          {author}
        </ListItemButton>
      ))}
      <Divider />
      <ListItem>
        <Typography sx={{ fontWeight: "bold", color: "primary.main" }}>
          Trier par prix
        </Typography>
      </ListItem>
      <Divider />
      {catego.map((categorie) => (
        <ListItemButton
          onClick={() =>
            setFilter({ parent: "categorie", children: categorie })
          }
        >
          {categorie}
        </ListItemButton>
      ))}
      <Divider />
    </List>
  );
  return (
    <div style={styles.root}>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={2}
          lg={2}
          xl={2}
          sx={{
            maxHeight: "100%",
            display: { xs: "none", sm: "none", md: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          <Nav />
        </Grid>
        <Grid item xs={12} md={10} sm={12} lg={10} xl={10}>
          <Button
            sx={{
              display: { xs: "flex", sm: "flex", md: "none" },
            }}
            onClick={handleDrawerToggle}
          >
            <KeyboardArrowLeftIcon />
            Trier
          </Button>
          <Breadcrumbs aria-label="breadcrumb" sx={{ marginLeft: "50px" }}>
            <Typography underline="hover" color="primary" href="/">
              Boutique
            </Typography>
            <Typography color="inherit" href="/getting-started/installation/">
              {filter.parent}
            </Typography>
            <Typography color="text.primary">{filter.children}</Typography>
          </Breadcrumbs>
          <BookList
            wishlist={wishlist}
            removeFromWishList={removeFromWishList}
            bookList={bookList}
            addWish={addWish}
            user={user}
          />
        </Grid>
      </Grid>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        <Nav />
      </Drawer>
    </div>
  );
};

export default Home;
