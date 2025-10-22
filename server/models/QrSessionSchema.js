// const mongoose = require("mongoose");

// const QrSessionSchema = new mongoose.Schema({
//     sessionId: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     sessionName: {
//         type: String,
//         required: true
//     },
//     sessionType: {
//         type: String,
//         enum: ["event", "class"],
//         required: true
//     },
//     startDate: {
//         type: Date,
//         required: true,
//     },
//     endDate: {
//         type: Date,
//         required: true
//     },
//     duration: {
//         type: Number,
//         required: true
//     },
//     autoExpire: {
//         type: Boolean,
//         default: false
//     },
//     expired: {
//         type: Boolean,
//         default: false
//     },
//     associatedClass: {
//         type: String,
//     },
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "StudentProfile"
//     }

// }, { timestamps: true }
// )

const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const QrSessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      unique: true,
      default: () => uuidv4(),
    },
    sessionName: {
      type: String,
      required: [true, "Session name is required"],
      trim: true,
    },
    sessionType: {
      type: String,
      enum: ["event", "class"],
      required: [true, "Session type is required"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
      validate: {
        validator: function (value) {
          return value >= this.startDate;
        },
        message: "End date must be after start date",
      },
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 minute"],
    },
    autoExpire: {
      type: Boolean,
      default: false,
    },
    expired: {
      type: Boolean,
      default: false,
    },
    associatedClass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: function () {
        return this.sessionType === "class";
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentProfile",
    },
  },
  { timestamps: true }
);

QrSessionSchema.pre(/^find/, function (next) {
  const now = new Date();
  this.updateMany(
    { autoExpire: true, expired: false, endDate: { $lt: now } },
    { $set: { expired: true } }
  ).exec();
  next();
});

module.exports = mongoose.model("QrSession", QrSessionSchema);
