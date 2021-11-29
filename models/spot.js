var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    localName: String,
    country: String,
    stateProvince: String,
    address: String,
    imgUrl: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Spot", userSchema);
