import React from "react";
import BookList from "../BookList/BookList";
import { Redirect } from "react-router";
const WishList = ({
  addWish,
  emptyWishlist,
  user,
  wishlist,
  removeFromWishList,
}) => {
  if (!user || user?.admin)
    return (
      <div>
        <Redirect to="/404" />
      </div>
    );

  return (
    <div>
      <BookList
        emptyWishlist={emptyWishlist}
        wishlist={wishlist}
        removeFromWishList={removeFromWishList}
        bookList={wishlist}
        addWish={addWish}
        user={user}
        inWish={true}
      />
    </div>
  );
};

export default WishList;
