const express = require("express");
const {
  addHelpCenter,
  getHelpCenters,
  updateLikes,
  updateDislikes,
  deleteHelpCenter,
  getHelpCentersByType,
  updateViews,
} = require("../controllers/HelpCenterController");

const router = express.Router();

router.post("/add", addHelpCenter);
router.get("/all", getHelpCenters);
router.get("/type/:type", getHelpCentersByType);
router.put("/like/:id", updateLikes);
router.put("/dislike/:id", updateDislikes);
router.put("/view/:id", updateViews)
router.delete("/delete/:id", deleteHelpCenter);

module.exports = router;