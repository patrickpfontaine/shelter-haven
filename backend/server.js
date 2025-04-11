const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const config = require('./config')

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: config.dbHost,
    user: config.dbUser, 
    password: config.dbPassword,
    database: config.dbDatabase
});

db.connect((err) => {
    if (err) {
      console.error("Error connecting to DB:", err);
    } else {
      console.log("Connected to DB successfully");
    }
  });


// app.get('/', (re, res) => {
//     console.log("getting")
//     db.query("INSERT INTO SHELTER (shelter_name, shelter_id) VALUES ('Bee Cave Shelter', 1)", (err, result) => {
//         if (err) {
//             console.log("Error", err)
//         } else {
//             console.log("query works", result)
//         }
//     })
// });


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Email and password are required.");
    }

    const query = `SELECT * FROM VOLUNTEER WHERE email = ? AND passwrd = ?`;

    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error("Login query error:", err);
            return res.status(500).send("Server error");
        }

        if (results.length > 0) {
            res.status(200).json({
                message: "Login successful",
                volunteer: results[0]
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    });
});




//listen to port 8081
app.listen (8081,()=> {
    console.log("listening")
});
    
