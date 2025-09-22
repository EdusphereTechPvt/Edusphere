const express = require("express");
const {
  addHelpCenter,
  getHelpCenters,
  updateLikes,
  updateDislikes,
  deleteHelpCenter,
  getHelpCentersByType,
} = require("../controllers/HelpCenterController");

const router = express.Router();

router.post("/add", addHelpCenter);
router.get("/all", getHelpCenters);
router.get("/type/:type", getHelpCentersByType);
router.put("/like/:id", updateLikes);
router.put("/dislike/:id", updateDislikes);
router.delete("/delete/:id", deleteHelpCenter);

module.exports = router;