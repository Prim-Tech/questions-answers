const express = require("express");
const app = express();
const PostgreSQL = require("./PostgreSQL.js");
const router = require("./Routes.js");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

//bodyparser

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.use(`/${process.env.LOADER_IO}`, (req, res) => {
  res.send(process.env.LOADER_IO);
});

app.use("/", router);

app.listen(9000, () => {
  console.log("Successfully listening to Questions and Answers API");
});

module.exports = app;
