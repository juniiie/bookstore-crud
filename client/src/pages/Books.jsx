import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        // console.log(res);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id);

      window.location.reload(); // Refreshes page. Can use redux for future use
    } catch (err) {
      console.log("it is an errr");
      console.log(err);
    }
  };

  return (
    <div>
      <h1>My Book Shelf</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            <div className="bookCover">
              {book.cover && <img src={book.cover} alt="" />}
            </div>

            {/* Book Info */}
            <div className="booksFlexContainer">
              <h2 className="bookTitle">{book.title}</h2>
              <h3 className="bookAuthor">{book.author}</h3>
              <p className="bookDesc">{book.desc}</p>
              <span className="bookPrice">${book.price}</span>
            </div>
            <div className="delUpBtn">
              <button className="delete" onClick={() => handleDelete(book.id)}>
                DELETE
              </button>
              <button className="update">
                <Link to={`/update/${book.id}`} className="updateLink">
                  UPDATE
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link to="/add">
        <button className="button-59">Add new book</button>
      </Link>
    </div>
  );
};

export default Books;
