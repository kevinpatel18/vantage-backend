const express = require("express");
const app = express();

app.use("/course", require("./courseRoute"));
app.use("/contact", require("./contactRoute"));
app.use("/registerUser", require("./registerUserRoute"));
app.use("/testimonials", require("./testimonialsRoute"));
app.use("/useCase", require("./useCaseRoute"));
app.use("/gallery", require("./galleryRoute"));
app.use("/brand", require("./brandRoute"));
app.use("/event", require("./eventRoute"));

module.exports = app;
