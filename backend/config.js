require('dotenv').config();

const config = { 
    mysqlHost: process.env.mysqlHost,
    mysqlPort: process.env.mysqlPort,
    mysqlUser: process.env.mysqlUser,
    mysqlPass: process.env.mysqlPass,
    mysqlDB: process.env.mysqlDB,
  };
  
  module.exports = config;