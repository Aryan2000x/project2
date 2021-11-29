var router = require("express").Router();
var usersCtrl = require("../controllers/users");
var passport = require("passport");

router.get("/home", usersCtrl.index);

router.get("/:id/profile", isLoggedIn, usersCtrl.show);

// router.get("/:id", isLoggedIn, function (req, res, next) {
//   res.redirect(`${req.params.id}/profile`);
// });

router.get("/:id/post", isLoggedIn, usersCtrl.new);

router.post("/:id/profile", isLoggedIn, usersCtrl.create);

router.post("/:id/profile/favourite", isLoggedIn, usersCtrl.add);

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
