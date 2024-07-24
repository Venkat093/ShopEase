const mongoose = require("mongoose");

const url = "mongodb+srv://venkatasairamsingothu4:123456789qwe@cluster0.h1bv7d2.mongodb.net/shopEse";
//?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = async () => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((e) => {
      console.log("Error connecting to database",e);
      console.log("Connection failed!");
    });
};

module.exports = connectDB;
