const User = require("../models/user");
const Spot = require("../models/spot");

module.exports = {
  index,
  new: newPost,
  show,
  create,
  add,
};

function index(req, res, next) {
  console.log("index");
  Spot.find({}, function (err, spots) {
    res.render("users/index", { spots });
  });
}

function newPost(req, res, next) {
  console.log(`/${req.params.id}/newpost`);
  res.render("users/new");
}

function show(req, res, next) {
  console.log(`/${req.params.id}/profile/`);
  User.findById(req.params.id, function (err, user) {
    Spot.find({ user: user._id }, function (err, addedSpots) {
      Spot.find({ _id: user.favSpot }, function (err, favSpots) {
        res.render("users/profile", { addedSpots, user, favSpots });
      });
    });
  });
}

function create(req, res, next) {
  req.body.user = req.params.id;
  console.log(req.body);
  let newSpot = new Spot(req.body);
  newSpot.save(function (err) {
    User.findById(req.params.id, function (err, user) {
      user.recentPost.push(newSpot._id);
      user.save(function (err) {
        res.redirect(`/${req.params.id}/profile`);
      });
    });
  });
}

function add(req, res, next) {
  User.findById(req.params.id, function (err, user) {
    user.favSpot.push(req.body.spotId);
    user.save(function (err) {
      res.redirect(`/${user._id}/profile`);
    });
  });
}
