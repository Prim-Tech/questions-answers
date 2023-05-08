const { Client } = require("pg");

const client = new Client({
  user: "stanleychu",
  host: "localhost",
  database: "sdcqa",
  password: "",
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.log("ERROR CONNECTING TO POSTGRESQL SERVER");
  } else {
    console.log("SUCESSFULLY CONNECTED TO POSTGRESQL SERVER");
  }
});

module.exports = client;
