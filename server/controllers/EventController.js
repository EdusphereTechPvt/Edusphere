// const Event = require("../models/EventSchema");

// const addEvent = async (req, res) => {
//   const { name, location, start, end, schoolId, img } = req.body;

//   try {
//     if (!name || !location || !start || !end || !schoolId) {
//       return res.status(400).json({
//         message: "name, location, start, end, schoolId are required",
//         status: false,
//       });
//     }
//     const newEvent = await Event.create({ name, location, start, end, schoolId, img });
//     res.status(201).json({
//       message: "Event Added",
//       data: newEvent,
//       status: true,
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Error",
//       status: false,
//     });
//   }
// };

// const getEvents = async (req, res) => {
//   try {
//     const getevents = await Event.find();

//     res.status(200).json({
//       message: "Here are your events",
//       data: getevents,
//       status: true,
//     });

//   } catch (error) {
//     console.error("Fetch Events Error:", error);
//     res.status(500).json({
//       message: "Error", 
//       status: false 
//     });
//   }
// };

// const getEventsByQuery = async (req, res) => {
//   try {
//     const { schoolId, name, location } = req.body;
//     let query = {};
    
//     if (schoolId) query.schoolId = schoolId;
//     if (name) query.name = { $regex: name, $options: 'i' };
//     if (location) query.location = { $regex: location, $options: 'i' };

//     const events = await Event.find(query);

//     res.status(200).json({
//       message: "Events found",
//       data: events,
//       status: true,
//     });

//   } catch (error) {
//     console.error("Events Error:", error);
//     res.status(500).json({
//       message: "Error", 
//       status: false 
//     });
//   }
// };



// const deleteEvent = async (req, res) => {
//   try {
//     const { id } = req.body;
//     const event = await Event.findByIdAndDelete(id);

//     if (!event) {
//       return res.status(404).json({
//         message: "Event not found",
//         status: false,
//       });
//     }

//     res.status(200).json({
//       message: "Event deleted",
//       status: true,
//     });
//   } catch (error) {
//     console.error("Delete Event Error:", error);
//     res.status(500).json({
//       message: "Error",
//       status: false,
//     });
//   }
// };

// module.exports = {
//   addEvent,
//   getEvents,
//   getEventsByQuery,
//   deleteEvent,
// };

const Event = require("../models/EventSchema");

const addEvent = async (req, res) => {
  try {
    const { name, location, start, end, schoolId, img } = req.body;

    if (!name || !location || !start || !end || !schoolId) {
      return res.status(400).json({
        status: false,
        message: "Required fields: name, location, start, end, schoolId",
      });
    }

    
    const existingEvent = await Event.findOne({
      name: name.trim(),
      location: location.trim(),
      start,
      end,
      schoolId,
    });

    if (existingEvent) {
      return res.status(200).json({
        status: true,
        message: "Event already exists",
        data: existingEvent,
      });
    }

    
    const newEvent = await Event.create({ name, location, start, end, schoolId, img });

    return res.status(201).json({
      status: true,
      message: "New event created successfully",
      data: newEvent,
    });

  } catch (error) {
    console.error("Add Event Error:", error);
    return res.status(500).json({
      status: false,
      message: "Server error while adding event",
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const { schoolId } = req.query;
    const filter = schoolId ? { schoolId } : {};

    const events = await Event.find(filter).sort({ start: 1 });

    return res.status(200).json({
      status: true,
      message: "Events fetched successfully",
      data: events,
    });
  } catch (error) {
    console.error("Get Events Error:", error);
    return res.status(500).json({
      status: false,
      message: "Server error while fetching events",
    });
  }
};

// 🔍 Get Events By Dynamic Query
const getEventsByQuery = async (req, res) => {
  try {
    const { schoolId, name, location } = req.query;
    const query = {};

    if (schoolId) query.schoolId = schoolId;
    if (name) query.name = { $regex: name, $options: "i" };
    if (location) query.location = { $regex: location, $options: "i" };

    const events = await Event.find(query).sort({ start: 1 });

    return res.status(200).json({
      status: true,
      message: "Filtered events fetched successfully",
      data: events,
    });
  } catch (error) {
    console.error("Query Events Error:", error);
    return res.status(500).json({
      status: false,
      message: "Server error while fetching filtered events",
    });
  }
};


const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({
        status: false,
        message: "Event not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Delete Event Error:", error);
    return res.status(500).json({
      status: false,
      message: "Server error while deleting event",
    });
  }
};

module.exports = {
  addEvent,
  getEvents,
  getEventsByQuery,
  deleteEvent,
};
