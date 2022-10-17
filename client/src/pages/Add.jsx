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
        placeholder="Title"
        name="title"
        onChange={handleChange}
      ></input>
      <input
        type="text"
        placeholder="Author"
        name="author"
        onChange={handleChange}
      ></input>
      <input
        type="text"
        placeholder="Description"
        name="desc"
        onChange={handleChange}
      ></input>
      <input
        type="number"
        placeholder="$$$"
        name="price"
        onChange={handleChange}
      ></input>
      <input
        type="text"
        placeholder="Image Address Link"
        name="cover"
        onChange={handleChange}
      ></input>
      <button className="formButton button-59" onClick={handleClick}>
        Add Book
      </button>
    </div>
  );
};

export default Add;
