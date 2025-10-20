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
      trim: true,
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },

    time: {
      type: String,
      required: true,
      trim: true, 
    },

    timetable: {
      Monday: {
        teacher: { type: String, trim: true },
        subject: { type: String, trim: true },
        roomno: {
          type: String,
          validate: {
            validator: (v) => !v || /^\d+$/.test(v),
            message: "Room number must be numeric only",
          },
        },
      },
      Tuesday: {
        teacher: { type: String, trim: true },
        subject: { type: String, trim: true },
        roomno: {
          type: String,
          validate: {
            validator: (v) => !v || /^\d+$/.test(v),
            message: "Room number must be numeric only",
          },
        },
      },
      Wednesday: {
        teacher: { type: String, trim: true },
        subject: { type: String, trim: true },
        roomno: {
          type: String,
          validate: {
            validator: (v) => !v || /^\d+$/.test(v),
            message: "Room number must be numeric only",
          },
        },
      },
      Thursday: {
        teacher: { type: String, trim: true },
        subject: { type: String, trim: true },
        roomno: {
          type: String,
          validate: {
            validator: (v) => !v || /^\d+$/.test(v),
            message: "Room number must be numeric only",
          },
        },
      },
      Friday: {
        teacher: { type: String, trim: true },
        subject: { type: String, trim: true },
        roomno: {
          type: String,
          validate: {
            validator: (v) => !v || /^\d+$/.test(v),
            message: "Room number must be numeric only",
          },
        },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timetable", timetableSchema);
