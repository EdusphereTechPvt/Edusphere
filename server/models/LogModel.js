const mongoose = require("mongoose");


const LogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    entryTime: {
        type: Date, default: new Date()
    },
    exitTime: {
        type: Date,
    },
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QrSession",
        required: true,
    },
    status: {
        type: String,
        enum: ["IN", "OUT"],
        default: "IN"
    },
    note: {
        type: String,
    }

}, { timestamps: true })

module.exports = mongoose.model("Log", LogSchema);