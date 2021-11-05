import React from "react";
import BookList from "../BookList/BookList";

const Home = ({ bookList,wishlist, addWish, removeFromWishList, user }) => {
  return (
    <div>
      <BookList wishlist={wishlist} removeFromWishList={removeFromWishList} bookList={bookList} addWish={addWish} user={user} />
    </div>
  );
};

export default Home;
