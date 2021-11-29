var router = require("express").Router();
var passport = require("passport");
var User = require("../models/user");
var Spot = require("../models/spot");

// The root route renders our only view
router.get("/", function (req, res) {
  res.redirect("/parkour-spot-finder.herokuapp.com/home");
});

router.get("/profile-view/:id", function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    Spot.find({ user: user._id }, function (err, addedSpots) {
      res.render("profile", { addedSpots, user });
    });
  });
});

// User wants to log in
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/home",
  })
);

// Logging out
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/home");
});

module.exports = router;
