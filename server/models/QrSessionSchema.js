const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const QrSessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
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
    token: {
      type: String,
      unique: true,
      required: [true, "Token is required"],
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
    associatedEvent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: function () {
        return this.sessionType === "event";
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
  },
  { timestamps: true }
);

QrSessionSchema.pre(/^find/, function (next) {
  const now = new Date();
  const QrSession = mongoose.model("QrSession");
  QrSession.updateMany(
    { autoExpire: true, expired: false, endDate: { $lt: now } },
    { $set: { expired: true } }
  )
    .then((res) => {
      if (res.modifiedCount > 0) {
        console.log(`Auto-expired ${res.modifiedCount} old sessions`);
      }
    })
    .catch((err) => console.error("Auto-expire update failed:", err));

  next();
});

QrSessionSchema.methods.compareToken = function (candidateToken) {
  return bcrypt.compare(candidateToken, this.token);
};

module.exports = mongoose.model("QrSession", QrSessionSchema);