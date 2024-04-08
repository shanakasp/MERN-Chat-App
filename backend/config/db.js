const mongoose = require("mongoose");

function connectdb() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to MongoDB Atlas");
        resolve();
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        reject(error);
      });
  });
}

module.exports = connectdb;
