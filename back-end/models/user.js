const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  songName: {
    type: String,
    required: true,
  },
  artistName: {
    type: String,
    required: true,
  },
  albumCover: {
    type: String,
  },
});

const activitySchema = new mongoose.Schema({
  review: {
    type: String,
  },
  rating: {
    type: Number,
  },
  song: songSchema,
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
  topSongs: [songSchema],
  activity: [activitySchema],
  followers: [
    {
      followerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
      },
    },
  ],
  following: [
    {
      followingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
      },
    },
  ],
});

userSchema.index({ "followers.followerId": 1 }, { unique: true });
userSchema.index({ "following.followingId": 1 }, { unique: true });

userSchema.methods.comparePassword = function (password) {
  return this.password === password;
};

module.exports = mongoose.model("User", userSchema);
