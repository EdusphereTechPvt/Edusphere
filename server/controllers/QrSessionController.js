// const QrSessionSchema = require("../models/QrSession");
// const Class = require("../models/Class");

// const addOrUpdateQrSession = async (req, res) => {
//   try {
//     const {
//       sessionName,
//       sessionType,
//       startDate,
//       endDate,
//       duration,
//       autoExpire = false,
//       expired = false,
//       associatedClass,
//     } = req.body;

//     // ✅ Required field check
//     const requiredFields = ["sessionName", "sessionType", "startDate", "endDate", "duration"];
//     const missing = requiredFields.filter((f) => !req.body[f]);

//     if (missing.length > 0) {
//       return res.status(400).json({
//         status: false,
//         message: `Missing required field(s): ${missing.join(", ")}`,
//       });
//     }

//     // ✅ CASE 1: If sessionType = "event"
//     if (sessionType.toLowerCase() === "event") {
//       let existingEvent = await findOne({ sessionName, sessionType });

//       if (existingEvent) {
//         Object.assign(existingEvent, { startDate, endDate, duration, autoExpire, expired });
//         await existingEvent.save();
//         return res.status(200).json({
//           status: true,
//           message: "Event session updated successfully",
//           data: existingEvent,
//         });
//       }

//       const newEvent = await create({
//         sessionName,
//         sessionType,
//         startDate,
//         endDate,
//         duration,
//         autoExpire,
//         expired,
//       });

//       return res.status(201).json({
//         status: true,
//         message: "Event session created successfully",
//         data: newEvent,
//       });
//     }

//     // ✅ CASE 2: If sessionType = "class"
//     if (sessionType.toLowerCase() === "class") {
//       if (!associatedClass) {
//         return res.status(400).json({
//           status: false,
//           message: "associatedClass is required for class sessions",
//         });
//       }

//       const classData = await _findOne({ classId: associatedClass })
//         .populate({
//           path: "sections",
//           populate: {
//             path: "students",
//             model: "Student",
//           },
//         });

//       if (!classData) {
//         return res.status(404).json({ status: false, message: "Class not found" });
//       }

//       // Gather all students from class sections
//       const students = classData.sections.flatMap((sec) => sec.students || []);
//       if (!students.length) {
//         return res.status(404).json({ status: false, message: "No students found for this class" });
//       }

//       const sessions = [];
//       for (const student of students) {
//         let existingSession = await findOne({
//           sessionName,
//           sessionType,
//           userId: student._id,
//         });

//         if (existingSession) {
//           Object.assign(existingSession, { startDate, endDate, duration, autoExpire, expired });
//           await existingSession.save();
//           sessions.push(existingSession);
//         } else {
//           const newSession = await create({
//             sessionName,
//             sessionType,
//             startDate,
//             endDate,
//             duration,
//             autoExpire,
//             expired,
//             associatedClass,
//             userId: student._id,
//           });
//           sessions.push(newSession);
//         }
//       }

//       return res.status(201).json({
//         status: true,
//         message: `Class sessions created/updated for ${sessions.length} students`,
//         data: sessions,
//       });
//     }

//     // Invalid session type
//     return res.status(400).json({
//       status: false,
//       message: "Invalid sessionType. Must be 'event' or 'class'.",
//     });
//   } catch (error) {
//     console.error("AddOrUpdate QrSession Error:", error);
//     return res.status(500).json({
//       status: false,
//       message: "Internal Server Error",
//     });
//   }
// };

// //  Get all or filtered sessions
// const getSessionDetails = async (req, res) => {
//   try {
//     const { id, sessionName, sessionType } = req.body;
//     const query = {};

//     if (id) query._id = id;
//     if (sessionName) query.sessionName = { $regex: sessionName, $options: "i" };
//     if (sessionType) query.sessionType = { $regex: sessionType, $options: "i" };

//     const sessions = await find(query);

//     // Auto-expire logic
//     const now = new Date();
//     for (let session of sessions) {
//       if (session.autoExpire && !session.expired && session.endDate < now) {
//         session.expired = true;
//         await session.save();
//       }
//     }

//     if (sessions.length === 0) {
//       return res.status(404).json({
//         status: false,
//         message: "No sessions found",
//         data: [],
//       });
//     }

//     res.status(200).json({
//       status: true,
//       message: `${sessions.length} session(s) found successfully`,
//       data: sessions,
//     });
//   } catch (error) {
//     console.error("GetSession Error:", error);
//     res.status(500).json({
//       status: false,
//       message: "Server error while fetching session details",
//     });
//   }
// };

// //  Delete session
// const deleteSession = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const session = await findById(id);

//     if (!session) {
//       return res.status(404).json({ status: false, message: "Session not found" });
//     }

//     await findByIdAndDelete(id);
//     res.status(200).json({ status: true, message: "Session deleted successfully" });
//   } catch (error) {
//     console.error("DeleteSession Error:", error);
//     res.status(500).json({
//       status: false,
//       message: "Server error while deleting session",
//     });
//   }
// };

// export default {
//   addOrUpdateQrSession,
//   getSessionDetails,
//   deleteSession,
// };

const QrSession = require("../models/QrSessionSchema");
const Class = require("../models/Class");

const addOrUpdateQrSession = async (req, res) => {
  try {
    const {
      sessionName,
      sessionType,
      startDate,
      endDate,
      duration,
      autoExpire = false,
      expired = false,
      associatedClass,
    } = req.body;


    const requiredFields = ["sessionName", "sessionType", "startDate", "endDate", "duration"];
    const missing = requiredFields.filter((f) => !req.body[f]);

    if (missing.length > 0) {
      return res.status(400).json({
        status: false,
        message: `Missing required field(s): ${missing.join(", ")}`,
      });
    }


    if (sessionType.toLowerCase() === "event") {
      let existingEvent = await QrSession.findOne({ sessionName, sessionType });

      if (existingEvent) {
        Object.assign(existingEvent, { startDate, endDate, duration, autoExpire, expired });
        await existingEvent.save();
        return res.status(200).json({
          status: true,
          message: "Event session updated successfully",
          data: existingEvent,
        });
      }

      const newEvent = await QrSession.create({
        sessionName,
        sessionType,
        startDate,
        endDate,
        duration,
        autoExpire,
        expired,
      });

      return res.status(201).json({
        status: true,
        message: "Event session created successfully",
        data: newEvent,
      });
    }

    
    if (sessionType.toLowerCase() === "class") {
      if (!associatedClass) {
        return res.status(400).json({
          status: false,
          message: "associatedClass is required for class sessions",
        });
      }

      const classData = await Class.findOne({ classId: associatedClass }).populate({
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

      const sessions = [];
      for (const student of students) {
        let existingSession = await QrSession.findOne({
          sessionName,
          sessionType,
          userId: student._id,
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
          sessions.push(existingSession);
        } else {
          const newSession = await QrSession.create({
            sessionName,
            sessionType,
            startDate,
            endDate,
            duration,
            autoExpire,
            expired,
            associatedClass,
            userId: student._id,
          });
          sessions.push(newSession);
        }
      }

      return res.status(201).json({
        status: true,
        message: `Class sessions created/updated for ${sessions.length} students`,
        data: sessions,
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
    const query = {};

    if (id) query._id = id;
    if (sessionName) query.sessionName = { $regex: sessionName, $options: "i" };
    if (sessionType) query.sessionType = { $regex: sessionType, $options: "i" };

    const sessions = await QrSession.find(query);

    
    const now = new Date();
    for (let session of sessions) {
      if (session.autoExpire && !session.expired && session.endDate < now) {
        session.expired = true;
        await session.save();
      }
    }

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
};
