import React from "react";
import BookList from "../BookList/BookList";

const Home = ({ bookList, addWish, user }) => {
  return (
    <div>
      <BookList bookList={bookList} addWish={addWish} user={user} />
    </div>
  );
};

export default Home;
