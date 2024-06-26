// Import required modules
const express = require("express");
const cors = require("cors"); // Import cors module
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectdb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
// Create an instance of Express
const app = express();
app.use(express.json());

dotenv.config();
connectdb();

// Middleware to log request path
app.use((req, res, next) => {
  console.log(`Request received for path: ${req.path}`);
  next(); // Call the next middleware function in the stack
});

// Enable CORS for all routes
app.use(cors());

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

app.use("/api/user", userRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
