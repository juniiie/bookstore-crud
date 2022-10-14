import express from "express";
import mysql from "mysql";

const app = express();

// Connect SQL
const db = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "Patrickstar31!",
  database: "test",
});

// GET
app.get("/", (req, res) => {
  res.json("HEllo this is the backend");
});

// Retrieve the books in our db
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!!");
});
