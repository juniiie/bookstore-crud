import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split("/")[2];
  //   const bookId = location.pathname.split("/")[2];
  //   console.log(location.pathname.split("/")[2]);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/books/" + bookId, book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  //   console.log(book);

  return (
    <div className="form">
      <h1>Update the book</h1>
      <input
        type="text"
        placeholder="title"
        name="title"
        onChange={handleChange}
      ></input>
      <input
        type="text"
        placeholder="author"
        name="author"
        onChange={handleChange}
      ></input>
      <input
        type="text"
        placeholder="desc"
        name="desc"
        onChange={handleChange}
      ></input>
      <input
        type="number"
        placeholder="price"
        name="price"
        onChange={handleChange}
      ></input>
      <input
        type="text"
        placeholder="cover"
        name="cover"
        onChange={handleChange}
      ></input>
      <button className="formbutton" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};

export default Update;
