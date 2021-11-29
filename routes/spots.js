var router = require("express").Router();
const Spot = require("../models/spot");
const User = require("../models/user");

router.get("/spot-info/:id", function (req, res, next) {
  Spot.findById(req.params.id, function (err, spot) {
    User.findById(spot.user, function (err, userId) {
      res.render("spot/show", { spot, userId });
    });
  });
});

module.exports = router;
