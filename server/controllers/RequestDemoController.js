const RequestDemo = require("../models/RequestDemoSchema");

const addOrUpdateRequestDemo = async (req, res) => {
  try {
    const { fullName, schoolName, email, phone, schoolSize, preferredDate, features, heardFrom, message } = req.body;

    if (!email || !schoolName) {
      return res.status(400).json({ 
        message: "Email and School Name are required", 
        status: false 
      });
    }

    let demo = await RequestDemo.findOne({ email, schoolName });

    if (demo) {
      demo.fullName = fullName || demo.fullName;
      demo.phone = phone || demo.phone;
      demo.schoolSize = schoolSize || demo.schoolSize;
      demo.preferredDate = preferredDate || demo.preferredDate;
      demo.features = features?.length ? features : demo.features;
      demo.heardFrom = heardFrom || demo.heardFrom;
      demo.message = message || demo.message;

      await demo.save();
      return res.status(200).json({ 
        message: "Demo request updated successfully", 
        data: demo, 
        status: true 
      });
    }

    const newDemo = new RequestDemo({ 
      fullName, 
      schoolName, 
      email, 
      phone, 
      schoolSize, 
      preferredDate, 
      features, 
      heardFrom, 
      message 
    });

    await newDemo.save();
    res.status(201).json({ 
      message: "Demo request added successfully", 
      data: newDemo, 
      status: true 
    });

  } catch (err) {
    console.error("RequestDemo Add/Update Error:", err);
    res.status(500).json({ 
      message: "Server error during demo add/update", 
      status: false 
    });
  }
};


const getRequestDemoDetails = async (req, res) => {
  const { fullName = "", schoolName = "", email = "", phone = "" } = req.body;

  if (![fullName, schoolName, email, phone].some(Boolean)) {
    return res.status(400).json({ 
      message: "At least one search field is required", 
      status: false 
    });
  }

  const searchFields = {};
  if (fullName) searchFields.fullName = { $regex: fullName, $options: "i" };
  if (schoolName) searchFields.schoolName = { $regex: schoolName, $options: "i" };
  if (email) searchFields.email = { $regex: email, $options: "i" };
  if (phone) searchFields.phone = { $regex: phone, $options: "i" };

  try {
    const response = await RequestDemo.find(searchFields);

    if (response.length === 0) {
      return res.status(404).json({
        data: [], 
        message: "No demo request found", 
        status: false 
      });
    } else if (response.length === 1) {
      return res.status(200).json({
        data: response[0], 
        message: "Demo request found successfully", 
        status: true 
      });
    }

    return res.status(200).json({
      data: response, 
      message: "Multiple demo requests found successfully", 
      status: true 
    });

  } catch (error) {
    console.error("Error fetching demo details:", error);
    return res.status(500).json({ 
      message: "Server error while fetching demo details", 
      status: false 
    });
  }
};


const deleteRequestDemo = async (req, res) => {
  try {
    const { id } = req.params;
    const demo = await RequestDemo.findByIdAndDelete(id);

    if (!demo) {
      return res.status(404).json({ 
        message: "Demo request not found", 
        status: false 
      });
    }

    res.status(200).json({ 
      message: "Demo request deleted successfully", 
      status: true 
    });

  } catch (err) {
    console.error("Delete demo request error:", err);
    res.status(500).json({ 
      message: "Server error while deleting demo request", 
      status: false 
    });
  }
};

module.exports = { 
  addOrUpdateRequestDemo, 
  getRequestDemoDetails, 
  deleteRequestDemo 
};
