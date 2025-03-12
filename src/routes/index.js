const express = require("express");
const app = express();

app.use("/course", require("./courseRoute"));
app.use("/contact", require("./contactRoute"));
app.use("/registerUser", require("./registerUserRoute"));
app.use("/testimonials", require("./testimonialsRoute"));
app.use("/useCase", require("./useCaseRoute"));
app.use("/gallery", require("./galleryRoute"));

module.exports = app;
