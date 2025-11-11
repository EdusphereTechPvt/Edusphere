const QrSession = require("../models/QrSessionSchema");
const crypto = require("crypto");
const Class = require("../models/Class");
const Event = require("../models/EventSchema");
const { default: mongoose } = require("mongoose");
const { encrypt } = require("../utils/tokenUtils");
const { default: generateQrWithText } = require("../utils/QrGenrator");
const JSZip = require("jszip");
const { v4: uuidv4 } = require('uuid');

const addOrUpdateQrSession = async (req, res) => {
  try {
    let {
      sessionName,
      sessionType,
      startDate,
      endDate,
      duration,
      autoExpire = false,
      expired = false,
      associatedClass,
      associatedEvent,
    } = req.body;
    expired = new Date() > new Date(endDate);
    sessionType = String(sessionType).toLowerCase();

    const { schoolId } = req.user;
    if (!schoolId) {
      return res.status(400).json({ status: false, message: "schoolId missing in auth token" });
    }
    const requiredFields = ["sessionName", "sessionType", "startDate", "endDate", "duration", `${sessionType?.toLowerCase() === "class" ? "associatedClass" : "associatedEvent"}`];
    const missing = requiredFields.filter((f) => !req.body[f]);

    if (missing.length > 0) {
      return res.status(400).json({
        status: false,
        message: `Missing required field(s): ${missing.join(", ")}`,
      });
    }
    // ---event--------------
    if (sessionType.toLowerCase() === "event") {
      let eventDocs;
      const isValidObjId = mongoose.Types.ObjectId.isValid(associatedEvent);
      if (isValidObjId) {
        eventDocs = await Event.findOne({ _id: associatedEvent, schoolId });
        if (eventDocs) {
          Object.assign(eventDocs, { startDate, endDate, duration, isActive: !expired })
          await eventDocs.save();
        } else {
          return res.status(404).json({
            status: false,
            message: "Event not found with provided ID or Name.",
          });
        }
      } else {
        eventDocs = await Event.create({
          name: associatedEvent,
          startDate,
          endDate,
          duration,
          isActive: !expired,
          schoolId,
        })
      }

      let existingSession = await QrSession.findOne({
        sessionName,
        sessionType,
        associatedEvent: eventDocs._id,
        schoolId,
      });

      if (existingSession) {
        Object.assign(existingSession, {
          startDate,
          endDate,
          duration,
          autoExpire,
          expired,
        });
        await existingSession.save();

        return res.status(200).json({
          status: true,
          message: "Event session updated successfully",
          data: { sessionId: existingSession.sessionId, sessionName: sessionName, qrId: existingSession.token },
        });
      }

      const newEventSession = await QrSession.create({
        sessionName,
        sessionType,
        startDate,
        endDate,
        duration,
        autoExpire,
        expired,
        associatedEvent: eventDocs._id,
        schoolId,
        token: encrypt(crypto.randomBytes(16).toString("hex")),
      });

      return res.status(201).json({
        status: true,
        message: "Event session created successfully",
        data: { sessionId: newEventSession.sessionId, sessionName: sessionName, qrId: newEventSession.token },
      });
    }

    // ------------class-------------

    if (sessionType.toLowerCase() === "class") {
      if (!associatedClass) {
        return res.status(400).json({
          status: false,
          message: "associatedClass is required for class sessions",
        });
      }

      const classData = await Class.findOne({ _id: associatedClass, schoolId }).populate({
        path: "sections",
        populate: {
          path: "students",
          model: "Student",
        },
      });

      if (!classData) {
        return res.status(404).json({ status: false, message: "Class not found" });
      }


      const students = classData.sections.flatMap((sec) => sec.students || []);
      if (!students.length) {
        return res.status(404).json({
          status: false,
          message: "No students found for this class",
        });
      }

      const sharedSessionId = uuidv4();
      const sessions = [];
      for (const student of students) {
        let existingSession = await QrSession.findOne({
          sessionName,
          sessionType,
          userId: student.studentId,
          schoolId
        });

        if (existingSession) {
          Object.assign(existingSession, {
            sessionId: sharedSessionId,
            startDate,
            endDate,
            duration,
            autoExpire,
            expired,
            associatedClass
          });
          await existingSession.save();
          sessions.push(existingSession);
        } else {
          const newSession = await QrSession.create({
            sessionId: sharedSessionId,
            sessionName,
            sessionType,
            startDate,
            endDate,
            duration,
            autoExpire,
            expired,
            associatedClass,
            userId: student.studentId,
            schoolId,
            token: encrypt(crypto.randomBytes(16).toString("hex")),
          });
          sessions.push(newSession);
        }
      }


      return res.status(201).json({
        status: true,
        message: `Class sessions created/updated for ${sessions.length} students`,
        data: sessions.map((session) => ({
          sessionName: session.sessionName,
          sessionId: session.sessionId,
          qrId: session.token,
        })), //data we can add like a message in which session name and no. of sessions cretated instead of this 
      });
    }


    return res.status(400).json({
      status: false,
      message: "Invalid sessionType. Must be 'event' or 'class'.",
    });
  } catch (error) {
    console.error("AddOrUpdate QrSession Error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};


const getSessionDetails = async (req, res) => {
  try {
    const { id, sessionName, sessionType } = req.body;
    const { schoolId } = req.user
    const query = {};

    if (id) query._id = id;
    if (sessionName) query.sessionName = { $regex: sessionName, $options: "i" };
    if (sessionType) query.sessionType = { $regex: sessionType, $options: "i" };
    if (schoolId) query.schoolId = schoolId;

    const sessions = await QrSession.find(query);


    const now = new Date();
    await Promise.all(
      sessions.map(async (session) => {
        if (session.autoExpire && !session.expired && session.endDate < now) {
          session.expired = true;
          await session.save();
        }
      })
    );


    if (!sessions.length) {
      return res.status(404).json({
        status: false,
        message: "No sessions found",
        data: [],
      });
    }

    res.status(200).json({
      status: true,
      message: `${sessions.length} session(s) found successfully`,
      data: sessions,
    });
  } catch (error) {
    console.error("GetSession Error:", error);
    res.status(500).json({
      status: false,
      message: "Server error while fetching session details",
    });
  }
};

const getAllSessions = async (req, res) => {
  try {
    const sessions = await QrSession.find({ schoolId: req.user.schoolId }).sort({ createdAt: -1 });

    if (!sessions || sessions.length === 0) {
      return res.status(200).json({
        data: [],
        message: "No sessions found",
        status: false,
      });
    }

    res.status(200).json({
      data: sessions,
      message: `${sessions.length} session(s) found successfully`,
      status: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error while fetching sessions details",
      status: false,
    });
  }
}

const getQr = async (req, res) => {
  try {
    let { sessionId, mode = "download" } = req.body;

    if (!sessionId)
      return res.status(400).json({ status: false, message: "sessionId required" });

    if (!Array.isArray(sessionId)) sessionId = [sessionId];

    const sessions = await QrSession.find({ sessionId: { $in: sessionId } })
      .populate({
        path: "userId",
        model: "Student",
        select: "studentId name",
      });

    if (!sessions.length)
      return res.status(404).json({ status: false, message: "No sessions found" });
    if (sessions.length === 1) {
      const s = sessions[0];
      const qrBuffer = await generateQrWithText(
        s.token,
        {
          "Session Name": s.sessionName,
          Name: s.userId?.name || null,
          "Student ID": s.userId?.studentId || null,
        }
      );

      if (mode === "print") {
        const base64Img = `data:image/png;base64,${qrBuffer.toString("base64")}`;
        return res.json({ status: true, data: [base64Img] });
      }

      res.set({
        "Content-Type": "image/png",
        "Content-Disposition":
          mode === "download"
            ? `attachment; filename="${s.sessionName}_qr.png"`
            : `inline; filename="${s.sessionName}_qr.png"`,
      });

      return res.send(qrBuffer);
    }
    const zip = new JSZip();
    for (const s of sessions) {
      const qrBuffer = await generateQrWithText(
        s.token,
        {
          "Session Name": s.sessionName,
          Name: s.userId?.name || null,
          "Student ID": s.userId?.studentId || null,
        }
      );
      const fileName = `${s.userId?.name || "unknown"}_${s.sessionName}.png`;
      zip.file(fileName, qrBuffer);
    }

    if (mode === "print") {
      const qrImages = [];
      for (const file of Object.values(zip.files)) {
        const data = await file.async("base64");
        qrImages.push(`data:image/png;base64,${data}`);
      }
      return res.json({ status: true, data: qrImages });
    }
    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });
    res.set({
      "Content-Type": "application/zip",
    });
    return res.send(zipBuffer);
  } catch (error) {
    console.error("DownloadQr Error:", error);
    return res
      .status(500)
      .json({ status: false, message: "Server error while generating QR(s)" });
  }
};

const scanQr = async (req, res) => {
  try {
    const { token } = req.body;
    const { schoolId } = req.user;
    if (!token) return res.status(400).json({ status: false, message: "QR token missing" });
    const sessions = await QrSession.find({ expired: false });

    let matchedSession = null;
    for (const session of sessions) {
      const isMatch = await session.compareToken(token);
      if (isMatch) {
        matchedSession = session;
        break;
      }
    }
    if (!matchedSession) return res.status(400).json({ status: false, message: "Invalid or expired QR token" });

    const now = new Date();
    if (matchedSession.endDate && now > matchedSession.endDate) {
      matchedSession.expired = true;
      await matchedSession.save();
      return res.status(400).json({ status: false, message: "Session has expired" });
    }

    const userId = req.user?._id || matchedSession.userId;
    if (!userId) {
      return res.status(401).json({ status: false, message: "Unauthorized: user not found" });
    }

    const existingLog = await Log.findOne({
      userId,
      sessionId: matchedSession.sessionId,
      schoolId,
      exitTime: { $exists: false },
    });

    let logEntry;
    if (existingLog) {
      existingLog.exitTime = now;
      existingLog.status = "OUT";
      await existingLog.save();
      logEntry = existingLog;
    } else {
      logEntry = await Log.create({
        userId,
        schoolId,
        sessionId: matchedSession.sessionId,
        entryTime: now,
        status: "IN",
      });
    }


    return res.status(200).json({
      status: true,
      message:
        logEntry.status === "IN"
          ? "Entry logged successfully"
          : "Exit logged successfully",
      data: {
        sessionId: matchedSession.sessionId,
        sessionName: matchedSession.sessionName,
        sessionType: matchedSession.sessionType,
        status: logEntry.status,
        time: now,
      },
    });


  } catch (error) {
    console.error("QR Scan Error:", err);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}


const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await QrSession.findById(id);

    if (!session) {
      return res.status(404).json({ status: false, message: "Session not found" });
    }

    await QrSession.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Session deleted successfully",
    });
  } catch (error) {
    console.error("DeleteSession Error:", error);
    res.status(500).json({
      status: false,
      message: "Server error while deleting session",
    });
  }
};



module.exports = {
  addOrUpdateQrSession,
  getSessionDetails,
  deleteSession,
  getAllSessions,
  getQr,
  scanQr
};