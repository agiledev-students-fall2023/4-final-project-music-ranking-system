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
  topSongs: [songSchema],
  activity: [activitySchema],
});

// hash the password before the user is saved
// mongoose provides hooks that allow us to run code beforeor after specific events
userSchema.pre("save", function (next) {
  const user = this
  if (!user.isModified("password")) return next()
  bcrypt.hash(user.password, 10, (err, hash) =>{
    if (err) return next(err)
    user.password = hash
    next()
  })
})

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
};

// return a JWT token for the user
userSchema.methods.generateJWT = function () {
  const today = new Date()
  const exp = new Date(today)
  exp.setDate(today.getDate() + process.env.JWT_EXP_DAYS) //assume an env variable with num days in it

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000),
    },
    process.env.JWT_SECRET
  )
}

userSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    token: this.generateJWT(),
  }
}

module.exports = mongoose.model("User", userSchema);
