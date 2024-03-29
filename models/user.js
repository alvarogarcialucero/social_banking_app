const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true

  },
  password: {
    type: String,
    required: true

  },
  balance: {
    type: Number,
    required: true

  },
  account: {
    type: String,
    required: true

  }
});

module.exports = mongoose.model('User', userSchema);