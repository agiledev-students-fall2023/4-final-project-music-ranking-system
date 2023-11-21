const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

userSchema.methods.comparePassword = function (password) {
  return this.password === password;
};

module.exports = mongoose.model("User", userSchema);
