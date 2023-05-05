const express = require("express");
const app = express();
const PostgreSQL = require("./PostgreSQL.js");
const router = require("./Routes.js");
const cors = require("cors");
//bodyparser

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(9000, () => {
  console.log("Successfully listening to Questions and Answers API");
});

module.exports = app;
