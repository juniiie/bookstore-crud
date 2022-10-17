import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

/*
// const q = "SELECT * FROM books";

// Pooling start - Used pooling instead of const db
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "Patrickstar31!",
  database: "test",
  debug: false,
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  app.get("/myTable", (req, res) => {
    connection.query(q, (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json({
          data: results,
        });
      }
    });
    console.log(connection);
  });
});
// Pooling ends
*/

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Patrickstar31!",
  database: "test",
});

// GET
app.get("/", (req, res) => {
  res.json("HEllo this is the backend");
});

// CRUD operations below
app.post("/books", (req, res) => {
  const q = "INSERT INTO BOOKS (`title`, `desc`,`price`, `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created successfuly");
  });
});

// Retrieve the books in our db
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Delete book
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json("Book has been deleted");
    }
  });
});

// Update book
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json("Book has been Updated");
    }
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!!");
});
