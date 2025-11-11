const Log = require("../models/LogModel");
const QrSession = require("../models/QrSession");
const User = require("../models/AuthSchema")

const addorUpdateLog = async (req, res) => {
    try {
        const { userId, sessionId, entryTime, exitTime, note } = req.body;
        const { schoolId } = req.user;

        if (!userId || !sessionId)
            return res.status(400).json({
                status: false,
                message: "userId and sessionId are required",
            });

        const [user, session] = await Promise.all([
            User.findById(userId).select("name role"),
            QrSession.findById(sessionId).select("sessionName sessionType"),
        ]);

        if (!user || !session)
            return res
                .status(404)
                .json({ status: false, message: "User or Session not found" });
        const log = await Log.create({
            userId,
            sessionId,
            schoolId,
            entryTime: entryTime || new Date(),
            exitTime: exitTime || null,
            note: note || "Manual entry by admin",
        });

        res.status(201).json({
            status: true,
            message: "Manual log added successfully",
            data: log,
        });
    } catch (err) {
        console.error("Error adding manual log:", err);
        res
            .status(500)
            .json({ status: false, message: "Internal Server Error", error: err.message });
    }
};

const getAllLogs = async (req, res) => {
    try {
        const { sessionId, userId } = req.params;
        const { schoolId } = req.user;
        const { page = 1, limit = 10 } = req.query;

        const filter = {};

        if (schoolId) filter.schoolId = schoolId;
        if (sessionId) filter.sessionId = sessionId;
        if (userId) filter.userId = userId;

        const skip = (Number(page) - 1) * Number(limit);

        const [logs, total] = await Promise.all([
            Log.find(filter)
                .populate("userId", "name role")
                .populate("sessionId", "sessionName sessionType")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit)),
            Log.countDocuments(filter),
        ]);

        res.json({
            status: true,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / limit),
            },
            data: logs,
        });

    } catch (err) {
        console.error("Error fetching logs:", err);
        res
            .status(500)
            .json({ status: false, message: "Internal Server Error", error: err.message });
    }
}

const deleteLog = async (req, res) => {
    try {
        const { logId } = req.params;

        const deletedLog = await Log.findByIdAndDelete(logId);

        if (!deletedLog) {
            return res.status(404).json({
                status: false,
                message: "Log not found",
            });
        }

        res.json({
            status: true,
            message: "Log deleted successfully",
        });
    } catch (err) {
        console.error("❌ Error deleting log:", err);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message,
        });
    }
};

module.exports = { addorUpdateLog, getAllLogs, deleteLog };