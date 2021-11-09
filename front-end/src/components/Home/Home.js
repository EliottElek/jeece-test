import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import BookList from "../BookList/BookList";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemButton,
  Typography,
  Drawer,
  Breadcrumbs,
  Toolbar,
  Button,
  IconButton,
} from "@mui/material";
const drawerWidth = 240;
const catego = [
  "Pet",
  "Drame",
  "Amour",
  "Science Fiction",
  "Fantastique",
  "Philosophie",
  "Histoire",
];
const Home = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getAuthors = () => {
    const authors = [];
    for (let i = 0; i < props.allProducts.length; i++) {
      authors.push(props.allProducts[i].author);
    }
    return authors;
  };

  const fetchProductsByCateg = async (categ) => {
    try {
      const { data: res } = await axios.get(
        `http://localhost:5000/products/category/${categ}`
      );
      props.setProducts(res.results);
    } catch (e) {
      alert("Impossible de se connecter au serveur.");
      console.error(e);
    }
  };
  const fetchProductsByAuthor = async (auth) => {
    try {
      const { data: res } = await axios.get(
        `http://localhost:5000/products/author/${auth}`
      );
      props.setProducts(res.results);
    } catch (e) {
      alert("Impossible de se connecter au serveur.");
      console.error(e);
    }
  };
  const Nav = () => (
    <List style={{ overflowY: "auto" }}>
      <Toolbar />
      <ListItem>
        <Typography sx={{ fontWeight: "bold", color: "primary.main" }}>
          Trier par catégorie
        </Typography>
      </ListItem>
      <Divider />
      {catego.map((categorie) => (
        <ListItemButton
          onClick={() => {
            props.setFilter({ parent: "categorie", children: categorie });
            fetchProductsByCateg(categorie);
          }}
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
          onClick={() => {
            props.setFilter({ parent: "auteurs", children: author });
            fetchProductsByAuthor(author);
          }}
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
      <Divider />
    </List>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Nav />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <Nav />
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `100%` } }}>
        <Button
          variant="contained"
          onClick={handleDrawerToggle}
          sx={{
            position: "fixed",
            top: 85,
            zIndex: 2,
            left: 16,
            marginBottom: "20px",
            marginTop: "-20px",
            display: { xs: "flex", sm: "none" },
          }}
        >
          <ArrowBackIosIcon /> Filtres
        </Button>
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginLeft: "50px" }}>
          <Typography underline="hover" color="primary" href="/">
            Boutique
          </Typography>
          {props.filter !== null && (
            <Typography color="inherit">{props.filter.parent}</Typography>
          )}
          {props.filter !== null && (
            <Typography color="text.primary">
              {props.filter.children}{" "}
              <IconButton
                onClick={() => {
                  props.removeFilter();
                  props.setFilter(null);
                }}
              >
                <HighlightOffIcon color={"primary"} />
              </IconButton>
            </Typography>
          )}
        </Breadcrumbs>
        <BookList
          removeFilter={props.removeFilter}
          wishlist={props.wishlist}
          removeFromWishList={props.removeFromWishList}
          bookList={props.bookList}
          addWish={props.addWish}
          user={props.user}
        />
      </Box>
    </Box>
  );
};

export default Home;
