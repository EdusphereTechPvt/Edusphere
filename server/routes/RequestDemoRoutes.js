const express = require("express");
const {addOrUpdateRequestDemo,getRequestDemoDetails,
    deleteRequestDemo,} = require("../controllers/RequestDemoController");

const router = express.Router();

router.post("/add", addOrUpdateRequestDemo);
router.post("/search", getRequestDemoDetails);
router.delete("/delete/:id", deleteRequestDemo);

module.exports = router;
