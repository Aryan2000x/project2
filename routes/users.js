var router = require("express").Router();
var usersCtrl = require("../controllers/users");

// GET /students
router.get("/home", usersCtrl.index);

router.get("/:id/profile", usersCtrl.show);

router.get("/:id", function (req, res, next) {
  res.redirect(`${req.params.id}/profile`);
});

router.get("/:id/post", usersCtrl.new);

router.post("/:id/profile", usersCtrl.create);

router.post("/:id/profile/favourite", usersCtrl.add);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
