const mongoose = require("mongoose");

const temporaryTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tokenType: {
      type: String,
      enum: ["RESET_PASSWORD"],
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    used: {
      type: Boolean,
      default: false,
    },
    expireAt: {
      type: Date,
      default: () => new Date(Date.now() + 10 * 60 * 1000),
      index: { expires: "10m" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TemporaryToken", temporaryTokenSchema);
