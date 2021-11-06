import React from "react";
import BookList from "../BookList/BookList";
const WishList = ({
  addWish,
  user,
  wishlist,
  removeFromWishList,
  getTotalWishList,
}) => {
  if (!wishlist)
    return <h2>Connectez-vous pour accéder à votre liste de souhaits.</h2>;

  return (
      <div>
        <BookList
          wishlist={wishlist}
          removeFromWishList={removeFromWishList}
          bookList={wishlist}
          addWish={addWish}
          user={user}
          inWish = {true}
        />
      </div>
  );
};

export default WishList;
