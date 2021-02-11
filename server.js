const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const items = require("./routes/api"); //importing the route file

const mongoURI =
  process.env.MONGODB_URI ||
  "";

const port = process.env.PORT || 5000;

const app = express(); // initializing express
app.use(cors());
app.use(bodyParser.json()); // applying middleware bodyparser
app.use("/", items); // specifying the routes

// connecting to mongo
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));



app.listen(port, () => console.log(`Server running on port: ${port}`));
