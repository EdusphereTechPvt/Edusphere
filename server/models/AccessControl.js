const mongoose = require("mongoose");

const accessControlSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["admin", "teacher", "student", "parent"],
    required: true,
  },
  page: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  allowed: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("AccessControl", accessControlSchema);
