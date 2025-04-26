const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const config = require("./config");

const app = express();
app.use(express.json());
app.use(cors());

//Aiven MySQL credentials
const db = mysql.createConnection({
  host: config.mysqlHost,
  port: config.mysqlPort,
  user: config.mysqlUser,
  password: config.mysqlPass,
  database: config.mysqlDB,
  ssl: {
    rejectUnauthorized: false,
  },
});

//Connect to Aiven-hosted DB
db.connect((err) => {
  if (err) {
    console.error("Error connecting to DB:", err);
  } else {
    console.log("Connected to DB successfully");
  }
});

//Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }

  const query = `SELECT first_name FROM VOLUNTEER WHERE email = ? AND pass = ? UNION SELECT victim_fname FROM VICTIM WHERE victim_email = ? AND victim_password = ?`;

  db.query(query, [email, password, email, password], (err, results) => {
    if (err) {
      console.error("Login query error:", err);
      return res.status(500).send("Server error");
    }

    if (results.length > 0) {
      res.status(200).json({
        message: "Login successful",
        volunteer: results[0],
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  });
});

//listen to port 8081
app.listen(8081, () => {
  console.log("listening");
});
