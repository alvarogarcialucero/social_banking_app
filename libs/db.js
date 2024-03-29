const mongoose = require("mongoose");

const userSchema = require("../models/user");
const connectionSchema = require("../models/connection");
const transactionSchema = require("../models/transaction");

mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((error) => console.error(error));


module.exports = {
  userSchema,
  connectionSchema,
  transactionSchema
};
