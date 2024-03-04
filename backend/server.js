// Import required modules
const express = require("express");
const { chats } = require("./data/data");

// Create an instance of Express
const app = express();

// Middleware to log request path
app.use((req, res, next) => {
  console.log(`Request received for path: ${req.path}`);
  next(); // Call the next middleware function in the stack
});

// Define a route

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
