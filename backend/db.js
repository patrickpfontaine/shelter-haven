const mysql = require("mysql2");
const config = require("./config");

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

module.exports = db;
