const mongoose = require("mongoose");

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
  activity: [activitySchema],
  followers: [
    {
      followerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
      },
    }
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
