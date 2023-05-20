const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

client.connect((err) => {
  if (err) {
    console.log("ERROR CONNECTING TO POSTGRESQL SERVER");
    console.log(process.env.DB_USER);
  } else {
    console.log("SUCESSFULLY CONNECTED TO POSTGRESQL SERVER");
  }
});

module.exports = client;
