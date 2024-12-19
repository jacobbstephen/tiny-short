const mongoose = require("mongoose");

const UrlSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "User is required"],
  },
  shortId: {
    type: String,
    unique: true,
    required: true,
  },
  redirectURL: {
    type: String,
    required: true,
  },
  clickCount: {
    type: Number,
    default: 0,
  },
  qrCode: {
    type: Buffer,
  },

  //   Array of Date objects
  clickTimeStamps: [
    {
      timestamp: { type: Date, default: Date.now },
      device: { type: String },
      location: {
        city: { type: String },
        region: { type: String },
        country: { type: String },
      },
    },
  ],
});
const URL = mongoose.model("URL", UrlSchema);
module.exports = URL;
