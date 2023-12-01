const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  review: {
    type: String,
  },
  rating: {
    type: Number,
  },
  songName: {
    type: String,
  },
  artistName: {
    type: String,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  activity: [activitySchema],
  followers: [
    {
      followerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      followerUsername: String,
    },
  ],
  following: [
    {
      followingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      followingUsername: String,
    },
  ],
});

userSchema.methods.comparePassword = function (password) {
  return this.password === password;
};

module.exports = mongoose.model("User", userSchema);
