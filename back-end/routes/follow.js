// import and instantiate express
const express = require("express"); // CommonJS import style!
const router1 = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
require("dotenv").config();

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

router1.get("/", async (req, res) => {
  const userToFind = req.query.userId;
  const currentUsername = req.query.currentuser;
  const userToFindMon = await User.findOne({ username: "test1" });
  const currentUserMon = await User.findOne({ username: currentUsername });
  const isFollowing = currentUserMon.following.some(
    (followingObj) =>
      followingObj._id && followingObj._id.equals(userToFindMon._id)
  );
  console.log(isFollowing);
  if (isFollowing) {
    return res.json({ status: true });
  } else {
    return res.json({ status: false });
  }
});

// router1.get("/", async (req, res) => {
//     const userToFind = req.query.userId;
//     const currentUsername = req.query.currentuser;

//     try {
//       const userToFindMon = await User.findOne({ username: userToFind });
//       const currentUserMon = await User.findOne({ username: currentUsername });

//       // Check if currentUserMon is following userToFindMon
//       const isFollowing = currentUserMon.following.some(
//         (followingObj) => followingObj.followingId.equals(userToFindMon._id)
//       );

//       return res.json({ status: isFollowing });
//     } catch (error) {
//       console.error("Error:", error);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//   });

router1.post("/", async (req, res) => {
  const userToFind = req.body.userId;
  const currentUsername = req.body.currentuser;
  const status = req.body.status;
  const userToFindMon = await User.findOne({ username: userToFind });
  const currentUserMon = await User.findOne({ username: currentUsername });

  if (status == false) {
    userToFindMon.followers.push(currentUserMon._id);
    currentUserMon.following.push(userToFindMon._id);
    await userToFindMon.save();
    await currentUserMon.save();
    return res.json({ status: true });
  } else {
    currentUserMon.following = currentUserMon.following.filter(
      (followingObj) => !followingObj._id.equals(userToFindMon._id)
    );

    userToFindMon.followers = userToFindMon.followers.filter(
      (followerObj) => !followerObj._id.equals(currentUserMon._id)
    );
    await userToFindMon.save();
    await currentUserMon.save();
    return res.json({ status: false });
  }
});

module.exports = router1;
