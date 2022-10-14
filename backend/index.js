import express from "express";
// import mysql from "mysql2";
import mysql from "mysql";

const app = express();
// const mysql = require("mysql2");
// GET
app.get("/", (req, res) => {
  res.json("HEllo this is the backend");
});

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

// Retrieve the books in our db
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  pool.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Connect SQL
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "user",
//   password: "Patrickstar31!",
//   database: "test",
// });

app.listen(8800, () => {
  console.log("Connected to backend!!");
});
