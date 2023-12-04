const express = require("express"); // CommonJS import style!
const passport = require("passport");
const router = express.Router();

// a route that is protected... only authenticated users can access it.
router.get("/", passport.authenticate("jwt", { session: false }), (req, res, next) => {
    // our jwt passport config will send error responses to unauthenticated users will
    // so we only need to worry about sending data to properly authenticated users!
    res.json({
    success: true,
    user: {
        id: req.user.id,
        username: req.user.username,
    },
    message:
        "Congratulations: you have accessed this route because you have a valid JWT token!",
    });
    next();
}
);

// export the function that contains code to handle cookie-related routes
module.exports = router;
