const mongoose = require("mongoose");
const Teacher = require("../models/Teacher");
const Subject = require("../models/Subject");
const Class = require("../models/Class");
const Section = require("../models/Section")
const Student = require("../models/Student")

const models = {
  teacher: Teacher,
  subject: Subject,
  class: Class,
  section: Section,
  student: Student
};

const getDistinctValues = async (req, res) => {
  try {
    const pageHeader = req.headers["x-page"];
    const { fieldName, filter = {} } = req.body;
    const { schoolId } = req.user || {};

    if (!pageHeader || !fieldName) {
      return res.status(400).json({
        success: false,
        message: "Please provide 'x-page' header and 'fieldName'.",
      });
    }

    const segments = pageHeader.split("/").filter(Boolean);
    const resource = segments[1]?.toLowerCase();
    const Model = models[resource];

    if (!Model) {
      return res.status(404).json({
        success: false,
        message: `No model found for resource '${resource}'`,
      });
    }

    if (schoolId && Model.schema.paths["schoolId"]) {
      filter.schoolId = schoolId;
    }

    const schemaPath = Model.schema.paths[fieldName];
    let refModelName;

    // Detect if it's a reference field (single or array)
    if (schemaPath?.options?.ref) {
      refModelName = schemaPath.options.ref.toLowerCase();
    } else if (schemaPath?.caster?.options?.ref) {
      refModelName = schemaPath.caster.options.ref.toLowerCase();
    }

    if (refModelName) {
      const RefModel = models[refModelName];
      if (!RefModel) {
        return res.status(404).json({
          success: false,
          message: `Referenced model '${refModelName}' not found`,
        });
      }

      const refValues = await RefModel.find({ schoolId }).select("_id name").lean();
      const values = refValues.map((item) => ({
        id: item._id,
        value: item.name,
      }));

      return res.status(200).json({
        success: true,
        resource,
        field: fieldName,
        distinctValues: values,
      });
    }

    // Normal field
    let values;
    if (Model.schema.paths["name"]) {
      values = await Model.find(filter).select("_id name").lean();
      values = values.map((item) => ({ id: item._id, value: item.name }));
    } else {
      const distinctValues = await Model.distinct(fieldName, filter);
      values = distinctValues.map((val) => ({ id: val, value: val }));
    }

    return res.status(200).json({
      success: true,
      resource,
      field: fieldName,
      distinctValues: values,
    });
  } catch (error) {
    console.error("Error in getDistinctValues:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { getDistinctValues };
