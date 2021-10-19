const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const booksRoutes = require("./routes/books");

const app = express();

mongoose
  .connect(
    "mongodb+srv://dbUser:rNiEqpXLX4ZdYfKC@cluster0.lmxrv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Estamos conectados");
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/api/books", booksRoutes);

module.exports = app;
