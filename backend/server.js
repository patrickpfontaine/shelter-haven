const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const config = require('./config')

const app = express();
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


app.get('/', (re, res) => {
    console.log("Hello2")
    db.query("insert into employee (empID) values (1)", (err, result) => {
        console.log("Hello")
        if (err) {
            console.log("Error", err)
        } else {
            console.log("query works", result)
        }
    })
});


app.listen (8081,()=> {
    console.log("listening")
});
    
