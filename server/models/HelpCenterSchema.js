const mongoose = require("mongoose");

const HelpCenterSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Account Management", "Feature & Functionality", "Billing & Pricing", "Technical Support",
      "Privacy & Security",
      "School Administration"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HelpCenter", HelpCenterSchema);