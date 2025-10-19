const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    className: {
      type: String,
      required: true,
    },
    timetable: {
      Monday: [
        {
          subject: { type: String, required: true },
          teacher: { type: String, required: true },
          roomNo: { type: String, required: true },
        },
      ],
      Tuesday: [
        {
          subject: { type: String, required: true },
          teacher: { type: String, required: true },
          roomNo: { type: String, required: true },
        },
      ],
      Wednesday: [
        {
          subject: { type: String, required: true },
          teacher: { type: String, required: true },
          roomNo: { type: String, required: true },
        },
      ],
      Thursday: [
        {
          subject: { type: String, required: true },
          teacher: { type: String, required: true },
          roomNo: { type: String, required: true },
        },
      ],
      Friday: [
        {
          subject: { type: String, required: true },
          teacher: { type: String, required: true },
          roomNo: { type: String, required: true },
        },
      ],
      Saturday: [
        {
          subject: { type: String, required: true },
          teacher: { type: String, required: true },
          roomNo: { type: String, required: true },
        },
      ],
    },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timetable", timetableSchema);

