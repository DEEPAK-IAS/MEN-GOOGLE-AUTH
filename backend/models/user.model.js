const mongoose = require("mongoose");

const userShcema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  }
});


const User = mongoose.model("user",userShcema);

module.exports = User;

