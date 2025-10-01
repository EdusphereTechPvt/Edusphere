const mongoose = require("mongoose");

const RequestDemoSchema = new mongoose.Schema({
  name: {
     type: String, 
     required: true },

  schoolName: {
     type: String, 
     required: true },

  email: { 
    type: String, 
    required: true },

  phone: { 
    type: String, 
    required: true },

  schoolSize: {
     type: String,
      required: true },

  preferredDate: {
     type: Date, 
     required: true },

  features: { 
    type: [String], 
    default: [] }, 
    
  reference: { 
    type: String },

  message: { 
    type: String },

}, { timestamps: true });

module.exports = mongoose.model("RequestDemo", RequestDemoSchema);
