var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
// session middleware
var session = require("express-session");
// var AerospikeStore = require("aerospike-session-store")(session);
var passport = require("passport");

// load the env vars
require("dotenv").config();

// create the Express app
var app = express();

// connect to the MongoDB with mongoose
require("./config/database");
// configure Passport
require("./config/passport");

// require our routes
var indexRoutes = require("./routes/index");
var usersRoutes = require("./routes/users");
var spotsRoutes = require("./routes/spots");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// mount the session middleware
app.use(
  session({
    secret: "project2",
    // store: new AerospikeStore({
    //   namespace: "express",
    //   set: "session",
    //   ttl: 86400, // 1 day
    //   hosts: "localhost:3000, parkour-spot-finder.herokuapp.com",
    // }),
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Custom middleware that passes req.user to all templates
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

// mount all routes with appropriate base paths
app.use("/", indexRoutes);
app.use("/", usersRoutes);
app.use("/", spotsRoutes);

// invalid request, send 404 page
app.use(function (req, res) {
  res.status(404).send("Cant find that!");
});

module.exports = app;
