const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const items = require("./routes/api"); //importing the route file

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017" // mongoDB URI

const port = process.env.PORT || 8081; // port where the server listens

const app = express(); // initializing express
app.use(cors());      // applying cors middeware
app.use(bodyParser.json()); // applying bodyparser middleware 
app.use("/", items); // specifying the routes

app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// connecting to mongo
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Start the server and listen for requests 
app.listen(port, () => console.log(`Server running on port: ${port}`));
