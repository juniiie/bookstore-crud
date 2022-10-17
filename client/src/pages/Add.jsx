import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  //   console.log(book);

  return (
    <div className="form">
      <h1>Add new Book</h1>
      <input
        type="text"
        placeholder="title"
        name="title"
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
      <button className="formButton" onClick={handleClick}>
        Add Book
      </button>
    </div>
  );
};

export default Add;
