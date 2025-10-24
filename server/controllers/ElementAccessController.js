const ElementAccessController = require("../models/ElementAccess");
const { verifyAccessToken } = require("../utils/tokenUtils");

const getElement = async (req, res) => {
  try {
    let rolesToCheck = ["default"];

    const token = req.cookies?.accessToken;

    const { page } = req.body
    if (token) {
      try {
        const decoded = verifyAccessToken(token);

        if (decoded?.role) {
          rolesToCheck.push(decoded.role);

        }
      } catch (err) {
        console.warn("Invalid token, using default only");
      }
    }

    // query
    const elements = await ElementAccessController.find({
      page: { $in: page },
      enableFor: { $in: rolesToCheck },
    }).sort({ order: 1 });

    res.json({ success: true, elements });
  } catch (err) {
    console.error("Error fetching elements:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const addElement = async (req, res) => {
  try {
    const {
      page,
      type,
      id,
      label,
      action,
      actionValue,
      actionUse,
      collection,
      enableFor = [],
      order = 0,
      isDistinct= false,
    } = req.body;

    let rolesToCheck = ["default"];
    const token = req.cookies?.accessToken;

    if (token) {
      try {
        const decoded = verifyAccessToken(token);

        if (decoded?.role) {
          rolesToCheck.push(decoded.role);

        }
      } catch (err) {
        console.warn("Invalid token, using default only");
      }
    }

    // Validate required fields
    if (!page || !type || !id) {
      return res.status(400).json({ message: "page, type and id are required" });
    }

    // Check if element already exists for same page + id
    const exists = await ElementAccessController.findOne({ page, id, enableFor: { $in: rolesToCheck } });
    if (exists) {
      return res.status(409).json({ message: "Element already exists" });
    }

    const newElementAccessController = new ElementAccessController({
      page,
      type,
      id,
      label,
      action,
      actionValue,
      actionUse,
      collection,
      enableFor,
      order,
      isDistinct
    });

    await newElementAccessController.save();

    return res.status(201).json({
      message: "Element added successfully",
      data: newElementAccessController,
    });
  } catch (error) {
    console.error("Error adding element:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = { getElement, addElement };