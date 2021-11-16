import React, { useContext } from "react";
import BookList from "../BookList/BookList";
import { Redirect } from "react-router";
import { Context } from "../Context/Context";
const WishList = () => {
  const {
    user,
    wishlist
  } = useContext(Context)
  if (!user || user?.admin)
    return (
      <div>
        <Redirect to="/404" />
      </div>
    );

  return (
    <div>
      <BookList bookList={wishlist}
      />
    </div>
  );
};

export default WishList;
