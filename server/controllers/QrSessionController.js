const { model } = require("mongoose");
const Class = require("../models/Class");
const QrSession = require("../models/QrSession");

const addOrUpdateQrSession = async (req, res) => {
    console.log("Request body:", req.body);
    try {
        const requiredFields = [
            "sessionName",
            "sessionType",
            "startDate",
            "endDate",
            "duration",
            "autoExpire",
            "expired",
        ];

        const missingFields = requiredFields.filter(
            (field) =>
                req.body[field] === undefined ||
                req.body[field] === null ||
                req.body[field] === ""
        );

        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required field(s): ${missingFields.join(", ")}`,
                status: false,
            });
        }
        const { sessionName, sessionType, startDate, endDate, duration, autoExpire, associatedClass } = req.body;

        if (sessionType.toLowerCase() === "event") {
            let session = await QrSession.findOne({ sessionName, sessionType });
            if (!session) {
                session = new QrSession({
                    sessionName,
                    sessionType,
                    startDate,
                    endDate,
                    duration,
                    autoExpire: req.body.autoExpire ?? false,
                    expired: req.body.expired ?? false,
                }); //add new event in event table too //add Event Crud 
                await session.save();
                return res.status(201).json({ message: "Event session created", status: true, data: session });
            } else {
                Object.assign(session, req.body);
                await session.save();
                return res.status(200).json({ message: "Event session updated", status: true, data: session });
            }
        }


        let classData
        if (sessionType.toLowerCase() === "class") {
            if (!associatedClass) {
                return res.status(400).json({
                    message: "associatedClass is required for class sessions",
                    status: false,
                });
            }

            classData = await Class.findOne({ classId: associatedClass })
                .populate({
                    path: "sections",
                    populate: {
                        path: "students",
                        model: "Student"
                    }
                });
        }
        if (!classData) {
            return res.status(404).json({
                message: "Class not found",
                status: false,
            });
        }

        let students = [];
        classData.sections.forEach(section => {
            if (section.students && section.students.length > 0) {
                students = students.concat(section.students);
            }
        });

        if (!students.length) {
            return res.status(404).json({
                message: "No students found for this class",
                status: false,
            });
        }


        // use populate - class
        const sessions = [];
        for (let student of students) {
            let session = await QrSession.findOne({
                sessionName,
                sessionType,
                userId: student._id
            });

            if (!session) {
                session = new QrSession({
                    sessionName,
                    sessionType,
                    startDate,
                    endDate,
                    duration,
                    autoExpire,
                    associatedClass,
                    userId: student._id,
                    expired: req.body.expired ?? false
                });
            } else {
                Object.assign(session, req.body, { studentId: user._id, associatedClass });
            }

            await session.save();
            sessions.push(session);
        }

        return res.status(201).json({
            message: `Class sessions created/updated for ${students.length} students`,
            status: true,
            data: sessions
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            status: false,
        });
    }
};


const getSessionDetails = async (req, res) => {
    const { id = "", sessionName = "", sessionType = "" } = req.body

    try {
        const query = {};
        if (id) query._id = id;
        if (sessionName) query.sessionName = { $regex: sessionName, $options: "i" };
        if (sessionType) query.sessionType = { $regex: sessionType, $options: "i" };

        const sessions = Object.keys(query).length === 0
            ? await QrSession.find()
            : await QrSession.find(query);

        const now = new Date();
        for (let session of sessions) {
            if (session.autoExpire && !session.expired && session.endDate < now) {
                session.expired = true;
                await session.save();
            }
        }


        if (sessions.length === 0) {
            return res.status(404).json({
                data: [],
                message: "No session found",
                status: false
            });
        }

        res.status(200).json({
            data: sessions,
            message: `${sessions.length} sessions(s) found successfully`,
            status: true
        });
    } catch (err) {
        console.error("Get qrSession Error:", err);
        res.status(500).json({
            message: "Server error while fetching session details",
            status: false
        });
    }
};


const deleteSession = async (req, res) => {
    try {
        const { id } = req.params;

        const session = await QrSession.findById(id);
        if (!session) {
            return res.status(404).json({
                message: "session not found",
                status: false
            });
        }

        await QrSession.findByIdAndDelete(id);

        res.status(200).json({
            message: "session deleted successfully",
            status: true
        });
    } catch (err) {
        console.error("Delete session Error:", err);
        res.status(500).json({
            message: "Server error while deleting session",
            status: false
        });
    }
};

module.exports = {
    addOrUpdateQrSession,
    getSessionDetails,
    deleteSession
}