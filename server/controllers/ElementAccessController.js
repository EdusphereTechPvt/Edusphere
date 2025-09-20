const ElementAccessController = require("../models/ElementAccessController");

const getElement = async(req,res) => {
 try {
    const { page, role } = req.query;

    let query = {};

    if (page) query.page = page;
    if (role) query.$or = [{ role }, { role: "default" }]; 

    const elements = await ElementAccessController.find(query).sort({ order: 1 });
    res.status(200).json(elements);
  } catch (error) {
    console.error("Error fetching element", error);
    res.status(500).json({ message: "Failed to fetch element" });
  }
}

const addElement = async(req,res) => {
    try {
    const {
      role = "default",
      page,
      type,
      id,
      label,
      action,
      actionValue,
      collection,
      enableFor = [],
      order = 0,
    } = req.body;

    // Validate required fields
    if (!page || !type || !id) {
      return res.status(400).json({ message: "page, type and id are required" });
    }

    // Check if element already exists for same page + id
    const exists = await ElementAccessController.findOne({ page, id, role });
    if (exists) {
      return res.status(409).json({ message: "Element already exists" });
    }

    const newElementAccessController = new ElementAccessController({
      role,
      page,
      type,
      id,
      label,
      action,
      actionValue,
      collection,
      enableFor,
      order,
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