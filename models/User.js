const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
}); 
const userModel = mongoose.model('User', UserSchema);
module.exports = userModel;