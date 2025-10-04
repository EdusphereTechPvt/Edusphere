const Event = require("../models/EventSchema");

const addEvent = async (req, res) => {
  const { name, location, start, end, schoolId, img } = req.body;

  try {
    if (!name || !location || !start || !end || !schoolId) {
      return res.status(400).json({
        message: "name, location, start, end, schoolId are required",
        status: false,
      });
    }
    const newEvent = await Event.create({ name, location, start, end, schoolId, img });
    res.status(201).json({
      message: "Event Added",
      data: newEvent,
      status: true,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error",
      status: false,
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const getevents = await Event.find();

    res.status(200).json({
      message: "Here are your events",
      data: getevents,
      status: true,
    });

  } catch (error) {
    console.error("Fetch Events Error:", error);
    res.status(500).json({
      message: "Error", 
      status: false 
    });
  }
};

const getEventsByQuery = async (req, res) => {
  try {
    const { schoolId, name, location } = req.body;
    let query = {};
    
    if (schoolId) query.schoolId = schoolId;
    if (name) query.name = { $regex: name, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };

    const events = await Event.find(query);

    res.status(200).json({
      message: "Events found",
      data: events,
      status: true,
    });

  } catch (error) {
    console.error("Events Error:", error);
    res.status(500).json({
      message: "Error", 
      status: false 
    });
  }
};



const deleteEvent = async (req, res) => {
  try {
    const { id } = req.body;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
        status: false,
      });
    }

    res.status(200).json({
      message: "Event deleted",
      status: true,
    });
  } catch (error) {
    console.error("Delete Event Error:", error);
    res.status(500).json({
      message: "Error",
      status: false,
    });
  }
};

module.exports = {
  addEvent,
  getEvents,
  getEventsByQuery,
  deleteEvent,
};
