import express from "express";
// import mysql from "mysql2";
import mysql from "mysql";

const app = express();

app.use(express.json());

// const mysql = require("mysql2");

const q = "SELECT * FROM books";

// Pooling start
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

// GET
app.get("/", (req, res) => {
  res.json("HEllo this is the backend");
});

// CRUD operations below
app.post("/books", (req, res) => {
  const q = "INSERT INTO BOOKS (`title`, `desc`, `cover`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.cover];

  pool.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created successfuly");
  });
});

// Retrieve the books in our db
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  pool.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!!");
});
