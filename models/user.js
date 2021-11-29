const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    avatar: String,
    googleId: String,
    recentPost: [
      {
        type: Schema.Types.ObjectId,
        ref: "Spot",
      },
    ],
    favSpot: [
      {
        type: Schema.Types.ObjectId,
        ref: "Spot",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
