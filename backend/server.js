// Import required modules
const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");

// Create an instance of Express
const app = express();
dotenv.config();

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

app.get("/api/chat/:id", (req, res) => {
  console.log(req.params.id);
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
