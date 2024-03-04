// Import required modules
const express = require("express");
const bodyParser = require("body-parser");

// Create an instance of Express
const app = express();

// Set up middleware to parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Define additional routes or API endpoints as needed

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
