const express = require("express");
const router = express.Router();
const { addOrUpdateClass, getClasses, deleteClass } = require("../controllers/ClassController");

router.post("/addOrUpdate", addOrUpdateClass);
router.get("/list", getClasses);
router.delete("/delete/:id", deleteClass);

module.exports = router;
