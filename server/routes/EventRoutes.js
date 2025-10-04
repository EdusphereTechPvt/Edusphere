const express = require("express");
const { addEvent, getEvents, getEventsByQuery, deleteEvent } = require("../controllers/EventController");

const router = express.Router();


router.post("/add", addEvent);
router.get("/all", getEvents);
router.post("/search", getEventsByQuery);
router.delete("/delete", deleteEvent);

module.exports = router;