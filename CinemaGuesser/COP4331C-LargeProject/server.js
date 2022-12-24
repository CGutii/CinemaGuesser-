//Node.js require()
/*
including modules that exists in other files
a la Python's import
*/
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
//listen on env var PORT or port 5000
const PORT = process.env.PORT || 5000;

//set up API
const app = express();
app.set("port", process.env.PORT || 5000);
//Cross-Origin Resource Sharing
/*allow scripts running on client URL to request
data from a different URL.
Allows us to fetch data from our API (different URL)
*/
app.use(cors());
//parsing json
app.use(bodyParser.json());

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

//Database connection
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const url = process.env.MONGODB_URI;

const client = new MongoClient(url);
client.connect();

/*
all the code written in ./api.js is wrapped
into a function and is sent to a variable
*/
var api = require("./api.js");
api.setApp(app, client);

//configure cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

//listen on PORT (either custom or 5000)
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
