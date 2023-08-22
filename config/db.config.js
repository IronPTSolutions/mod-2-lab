const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/mini-Twitter")
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.error("error connecting to database", err);
  });