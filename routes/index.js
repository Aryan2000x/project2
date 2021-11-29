var router = require("express").Router();
var passport = require("passport");
var User = require("../models/user");
var Spot = require("../models/spot");

// The root route renders our only view
router.get("/", function (req, res) {
  res.redirect("/home");
});

router.get("/profile-view/:id", function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    Spot.find({ user: user._id }, function (err, addedSpots) {
      Spot.find({ _id: user.favSpot }, function (err, favSpots) {
        const userId = user;
        res.render("profile", { addedSpots, userId, favSpots });
      });
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

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
