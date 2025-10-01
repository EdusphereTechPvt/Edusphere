const express = require("express");
const router = express.Router();
const RoleGuard = require("../middleware/RoleGuard");
const AuthGuard = require("../middleware/AuthGuard");
const { save, getSectionDetails, getAllSectionsList, deleteSection } = require("../controllers/SectionController");

router.post("/save",AuthGuard, RoleGuard(), save);
router.post("/search",AuthGuard, RoleGuard(), getSectionDetails);
router.post("/getAll/",AuthGuard, RoleGuard(), getAllSectionsList);
router.post("/delete",AuthGuard, RoleGuard(), deleteSection);

module.exports = router;
