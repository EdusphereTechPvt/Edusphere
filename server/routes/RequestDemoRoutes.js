const express = require("express");
const {getRequestDemoDetails,
    deleteRequestDemo,
    addRequestDemo,} = require("../controllers/RequestDemoController");

const router = express.Router();

router.post("/add", addRequestDemo);
router.post("/search", getRequestDemoDetails);
router.delete("/delete/:id", deleteRequestDemo);

module.exports = router;
