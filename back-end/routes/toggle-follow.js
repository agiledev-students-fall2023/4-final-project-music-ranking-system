const express = require("express"); // CommonJS import style!
const axios = require("axios"); // middleware for making requests to APIs
const router = express.Router();
const User = require("../models/user");
const mongoose = require('mongoose');
require("dotenv").config();
import { useAuthContext } from "./AuthProvider.js";


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

router.post('/other-user/:userId', async (req, res) => {
    const {userId} = req.params;
    const currentuser = req.user._id;
    const currentusername = useAuthContext().user;

    try {
        const user = await User.findOne({username: userId});
        const current = await User.findOne({username: currentusername});

        if (user.followers.includes(currentuser)) {
            current.following.pull(user);
            user.followers.pull(currentuser);
            await current.save();
            await user.save();
            res.json({ isFollowing: false });
        } else {
            user.followers.push(currentuser);
            current.following.push(user);
            await current.save();
            await user.save();
            res.json({ isFollowing: true });
        }
    } catch (error) {
        console.error("Error toggling follow: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})