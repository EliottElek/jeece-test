import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import BookList from "../BookList/BookList";
import {
  List,
  ListItem,
  ListItemButton,
  Typography,
  Drawer,
  Breadcrumbs,
  Toolbar
} from "@mui/material";
const drawerWidth = 240;
const catego = [
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
  const [filter, setFilter] = useState({
    parent: "auteurs",
    children: "Sandrel Julien",
  });
  const getAuthors = () => {
    const authors = [];
    for (let i = 0; i < props.bookList.length; i++) {
      authors.push(props.bookList[i].author);
    }
    return authors;
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
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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
