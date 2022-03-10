const mongoose = require("mongoose");

const connectionSchema = mongoose.Schema({
  accountA: {
    type: String,
    required: true,
  },
  accountB: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true

  }
});

module.exports = mongoose.model('Connection', connectionSchema);