const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const PORT = 3001;

//DB CONNECTION
const DB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "crud_db",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM  contact_table";
  DB.query(sqlGet, (error, result) => {
    if (error) {
      console.log(error);
    } else res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const { name, email, contact } = req.body;
  const sqlInsert =
    "INSERT INTO contact_table (name, email, contact) VALUE (?, ?, ?)";
  DB.query(sqlInsert, [name, email, contact], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM contact_table WHERE id = ?";
  DB.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;

  const sqlGet = "SELECT * FROM  contact_table WHERE id = ?";
  DB.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    } else res.send(result);
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;
  const sqlUpdate =
    "UPDATE contact_table SET name = ?, email = ?, contact = ? WHERE id = ?";
  DB.query(sqlUpdate, [name, email, contact, id], (error, result) => {
    if (error) {
      console.log(error);
    } else res.send(result);
  });
});

// app.get("/", (req, res) => {
//     const sqldata =
//       "INSERT INTO contact_table (name, email, contact) VALUE ('john', 'john@rk.com', 987654321)";
//     DB.query(sqldata, (error, result) => {
//       if (error) throw error;
//       console.log("data added");
//       res.send("hello server ");
//     });
// });

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else console.log("SERVER START AT PORT %d", PORT);
});
