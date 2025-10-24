const mongoose = require("mongoose");

const ElementAccessControllerSchema = new mongoose.Schema({
  page: { type: String, required: true },
  type: {
    type: String,
    enum: ["button", "field", "link", "menu"],
    required: true,
  },
  id: { type: String, required: true },
  label: { type: String },
  disabled: { type: Boolean, default: false },
  action: { type: String },
  actionValue: { type: String }, 
  actionUse: {type:String},
  collection: { type: String },
  enableFor: [{ type: String }],
  order: { type: Number, default: 0 },
  isDistinct : {type: Boolean, default: false},
}, {timestamps: true});

module.exports = mongoose.model(
  "ElementAccessController",
  ElementAccessControllerSchema
);

/*
For reference only

{
  role: { type: String, default: "default" }, 
  // "default" for public/general pages, or "teacher", "admin", etc.

  page: { type: String, required: true }, 
  // e.g., "navbar", "timetable", "dashboard"

  type: { type: String, enum: ["button", "field", "link", "menu"], required: true }, 
  // what kind of element

  id: { type: String, required: true }, 
  // unique identifier for the element, e.g., "add", "edit", "download", "upload", "profile-link"

  label: { type: String }, 
  // UI label for links/buttons, e.g., "Add Student"

  collection: { type: String }, 
  // optional backend reference, e.g., "User", "Parent"

  enableFor: [{ type: String }], 
  // array of roles allowed to use this element
  // e.g., ["admin", "teacher"] → only these roles see/use this

  order: { type: Number, default: 0 }, 
  // helps sort navbar items or buttons in order
}
*/
