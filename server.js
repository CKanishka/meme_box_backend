const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const items = require("./routes/api"); //importing the route file

const mongoURI =
  process.env.MONGODB_URI ||
  ""; // mongoDB URL

const port = process.env.PORT || 5000; // port where the server listens

const app = express(); // initializing express
app.use(cors());      // applying cors middeware
app.use(bodyParser.json()); // applying bodyparser middleware 
app.use("/", items); // specifying the routes

// connecting to mongo
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Start the server and listen for requests 
app.listen(port, () => console.log(`Server running on port: ${port}`));
