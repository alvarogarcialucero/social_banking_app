const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    Sender: {
    type: String,
    required: true,
  },
  Receiver: {
    type: String,
    required: true
  },
  Amount: {
    type: Number,
    required: true
  },
  Revenue: {
    type: Number,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);