const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true,
    },
    img: {
        type: String,
    },
    duration: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;