const express = require("express");
const app = express();

app.use("/course", require("./courseRoute"));

module.exports = app;
