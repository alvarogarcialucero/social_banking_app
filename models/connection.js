const mongoose = require("mongoose");

const connectionSchema = mongoose.Schema({
  requestAccount: {
    type: String,
    required: true,
  },
  connectAccount: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Connection', connectionSchema);