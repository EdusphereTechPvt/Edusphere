const mongoose = require("mongoose");

const QrSessionSchema = new mongoose.Schema({
    sessionName: {
        type: String,
        required: true
    },
    sessionType: {
        type: String,
        enum: ["event", "class"],
        required: true
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    autoExpire: {
        type: Boolean,
        default: false
    },
    expired: {
        type: Boolean,
        default: false
    },
    associatedClass: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudentProfile"
    }

}, { timestamps: true }
)

module.exports = mongoose.model("QrSession", QrSessionSchema);