const express = require("express");
const passport = require("passport");

const protectedContentRoutes = () => {
    const router = express.Router();

    // a route that is protected, only authentificated users can access it
    router.get(
        "/",
        passport.authenticate("jwt", {session: false}),
        (req, res, next) => {
            res.json({
                success: true,
                user: {
                    username: req.user.username,
                },
                message:
                    "valid JWT token",
            });
            next();
        }
    );
    return router;
};

module.exports = protectedContentRoutes;