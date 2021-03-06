import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import { CircularProgress, Grid, Typography, Button, IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import BasicRating from "../Rating/Rating";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Redirect } from "react-router";
import { Context } from "../Context/Context";
const styles = {
  image: {
    height: "auto",
    width: "90%",
    margin: "auto",
    border: "solid 0.15px #ececec",
  },
  grid: {
    width: "90%",
    margin: "auto",
  },
  grid2: {
    width: "85%",
    margin: "auto",
  },
  grid3: {
    display: "flex",
    alignItems: "flex-end",
  },
  addCartButton: {
    width: "300px!important",
    borderRadius: "30px",
    padding: "10px",
    margin: 10,
  },
  addWishButton: {
    width: "350px!important",
    borderRadius: "30px",
    padding: "10px",
    margin: 10,
  },
  sendRating: {
    borderRadius: "30px",
    padding: "5px",
    margin: 15,
  },
  textarea: {
    maxWidth: 500,
    minHeight: "40px",
    width: "90%",
    borderRadius: "12px",
    padding: "5px",
    border: "solid 1px gray",
  },
  titleInput: {
    maxWidth: 500,
    width: "90%",
    marginBottom: "8px",
    height: "30px",
    borderRadius: "7px",
    border: "solid 1px gray",
  },
  actions: {
    marginTop: 0,
    display: "flex",
    alignItems: 'center'
  },
  icon: { marginLeft: "7px" },
};

const Product = ({ id }) => {
  const { user, addToCart, addToWishList, setHeader, removeFromWishList, wishlist } = useContext(Context);
  const [product, setProduct] = useState();
  const [rating, setRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [ratingValues, setRatingValues] = useState([]);
  const [newRater, setNewRater] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [titleComment, setTitleComment] = useState("");
  const [commentSent, setCommentSent] = useState(false);
  const getMeanRating = () => {
    if (ratingValues.length > 0) {
      var sum = 0;
      for (let i = 0; i < ratingValues.length; i++) {
        sum += parseInt(ratingValues[i].value);
      }
      const avg = sum / ratingValues.length;
      return avg.toFixed(1);
    } else return 0;
  };
  const handleAddToCart = () => {
    const productWithQuantity = { ...product, quantity: quantity };
    addToCart(productWithQuantity);
    console.log(productWithQuantity);
  }
  const addRating = async () => {
    try {
      const rate = {
        value: rating,
        email: user.email,
      };
      await axios.post(`http://localhost:5000/products/${id}/rating`, {
        rate: rate,
      });
      setRatingValues([...ratingValues, rate]);
      setNewRater(false);
    } catch (err) {
      console.log(err);
    }
  };
  const addComment = async () => {
    try {
      const newComment = {
        email: user.email,
        avatar: user.avatarUrl,
        firstname: user.firstname,
        lastname: user.lastname,
        title: titleComment,
        content: comment,
      };
      await axios.post(`http://localhost:5000/products/${id}/comment`, {
        comment: newComment,
      });
      setComments([...comments, newComment]);
      setCommentSent(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(data.data);
        setHeader(data.data.title);
        setRatingValues(data.data.rating);
        setComments(data.data.comments);
        const emails = [];
        data.data.rating.map((rate) => emails.push(rate.email));
        if (emails.indexOf(user?.email) > -1) {
          setNewRater(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [id, user?.email, setHeader]);
  if (!product) {
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
        <CircularProgress color={"primary"} />
      </div>
    );
  }
  if (user?.admin) {
    return (
      <div>
        <Redirect to={`/produit/${id}/admin`} />
      </div>
    );
  }
  return (
    <div>
      <Grid sx={styles.grid} container direction="row" justifyContent="center">
        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          lg={4}
          sx={{
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={styles.image}
            src={product?.mediaUrl}
            alt={product?._id}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={8}
          lg={8}
          sx={{
            padding: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <div>
            <Typography variant="h4">{product?.title}</Typography>
            <Typography variant="h6">{product?.author}</Typography>
            <Typography variant="body1">{product?.nbPages}</Typography>
            {product?.publishingDate && (
              <Typography variant="caption">
                Publi?? le {product?.publishingDate}
              </Typography>
            )}
            <div style={{ display: "flex", alignItems: "center" }}>
              <BasicRating rating={getMeanRating()} />
              {ratingValues.length <= 1 ? (
                <Typography variant="caption">
                  {ratingValues.length} avis donn?? ({getMeanRating()}{" "}
                  {getMeanRating() <= 1 ? "??toile" : "??toiles"})
                </Typography>
              ) : (
                <Typography variant="caption">
                  {ratingValues.length} avis donn??s ({getMeanRating()}{" "}
                  {getMeanRating() <= 1 ? "??toile" : "??toiles"})
                </Typography>
              )}
            </div>
          </div>
          <Typography variant="body1">{product?.description}</Typography>
          <Typography variant="caption">Cat??gorie : <Typography variant="caption" color="primary">{product?.category}</Typography></Typography>
          <div style={{ display: "flex", alignItems: 'center' }}>
            <Typography variant="h6">Tarif r??gulier :</Typography>
            <Typography variant="h6" sx={{ color: "primary.main" }}>
              {" "}
              {product?.price}???
            </Typography>
          </div>
          <Typography>Quantit?? : <IconButton disabled={user ? false : true}
            onClick={() => setQuantity(quantity + 1)}><AddIcon /></IconButton>{quantity}<IconButton disabled={user ? false : true}
              onClick={() => { if (quantity > 1) setQuantity(quantity - 1) }}><RemoveIcon /></IconButton></Typography>
          <div container style={styles.actions}>
            <Button
              disabled={user ? false : true}
              onClick={handleAddToCart}
              style={styles.addCartButton}
              variant="contained"
              color={"primary"}
            >
              Ajouter au panier
              <ShoppingBasketIcon sx={styles.icon} />
            </Button>
            {wishlist?.some((item) => item.title === product.title) ? (<Button
              style={styles.addWishButton}
              disabled={user ? false : true}
              onClick={() => removeFromWishList(product)}
              color={"secondary"}
              variant="contained"
            >
              Retirer de la liste d'envies
              <ClearIcon sx={styles.icon} />
            </Button>
            )
              : (
                <Button
                  style={styles.addWishButton}
                  disabled={user ? false : true}
                  onClick={() => addToWishList(product)}
                  color={"secondary"}
                  variant="contained"
                >
                  Ajouter ?? ma liste d'envies
                  <FavoriteBorderIcon sx={styles.icon} />
                </Button>
              )}
          </div>
        </Grid>
      </Grid>
      <div style={{ height: "60px" }}></div>
      <div style={styles.grid2}>
        {user && newRater ? (
          <Typography variant="h6">
            Vous avez lu ce livre ? Donnez une note !
          </Typography>
        ) : (
          newRater && (
            <Typography variant="h6">
              Connnectez-vous pour laisser une note ou un avis.
            </Typography>
          )
        )}
        {!newRater && (
          <>
            <Typography>
              Vous avez d??j?? laiss?? une note sur ce livre.
            </Typography>
          </>
        )}
        {newRater && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Stack spacing={1}>
              <Rating
                size="large"
                disabled={user ? false : true}
                name="half-rating"
                defaultValue={0}
                precision={0.5}
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </Stack>
            <Typography style={{ marginLeft: "12px" }} variant="body1">
              {rating} {rating > 1 && rating ? "??toiles" : rating && "??toile"}
            </Typography>
            <Button
              style={styles.sendRating}
              disabled={user && rating ? false : true}
              onClick={addRating}
              variant="contained"
              color="secondary"
              size="small"
            >
              envoyer
              <SendIcon sx={styles.icon} />
            </Button>
          </div>
        )}
        {!commentSent ? (
          <>
            <Typography variant="h6">Ou laissez un avis !</Typography>
            <Typography variant="caption">Titre</Typography>
            <br></br>
            <input
              maxLength="199"
              style={styles.titleInput}
              value={titleComment}
              onChange={(e) => setTitleComment(e.target.value)}
              placeholder="(max 200 caract??res)"
              disabled={user ? false : true}
            />
            <br></br>
            <Typography variant="caption">Contenu</Typography>
            <div style={styles.grid3}>
              <TextareaAutosize
                style={styles.textarea}
                disabled={user ? false : true}
                aria-label="empty textarea"
                placeholder={
                  user
                    ? "Laissez un commentaire sur ce livre !"
                    : "Connectez-vous pour laisser un commentaire sur ce livre."
                }
                value={comment}
                minRows={3}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <Button
              style={styles.sendRating}
              disabled={user && comment && titleComment ? false : true}
              onClick={addComment}
              variant="contained"
              color="secondary"
              size="small"
            >
              envoyer
              <SendIcon sx={styles.icon} />
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6">Merci pour votre commentaire !</Typography>
            <Typography variant="caption">
              Vous pourrez laisser un nouveau commentaire sur ce livre un peu
              plus tard.
            </Typography>
          </>
        )}
        <div style={{ marginTop: "20px" }}>
          {comments.length === 0 ? (
            <Typography>Aucun autre commentaire.</Typography>
          ) : (
            <div>
              <Typography>Autres commentaires ({comments.length})</Typography>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 460,
                  bgcolor: "background.paper",
                }}
              >
                {comments
                  .map((comment) => (
                    <>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            alt={comment?.firstname + " " + comment.lastname}
                            src={comment?.avatar}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <>
                              {comment?.title}{" "}
                              {ratingValues?.find(
                                (item) => item?.email === comment?.email
                              )?.value && (
                                  <BasicRating
                                    rating={
                                      ratingValues?.find(
                                        (item) => item?.email === comment?.email
                                      )?.value
                                    }
                                  />
                                )}
                            </>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {comment.firstname} {comment.lastname}
                              </Typography>
                              {" ??? "}
                              {comment.content}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </>
                  ))
                  .reverse()}
              </List>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
