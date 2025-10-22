const mongoose = require("mongoose");
const User = require("../models/AuthSchema");
const TemporaryToken = require("../models/TemporaryToken");
const { sendEmail } = require("../utils/Email");
const { resetPasswordTemplate } = require("../utils/templates/EmailTemplates");
const { signAccessToken } = require("../utils/tokenUtils");

const getDistinctValues = async (req, res) => {
  try {
    const { collectionName, fieldName, filter = {} } = req.body;

    if (!collectionName || !fieldName) {
      return res.status(400).json({
        success: false,
        message: "Please provide collectionName and fieldName",
      });
    }

    const Model = mongoose.model(
      collectionName.charAt(0).toUpperCase() + collectionName.slice(1)
    );

    if (!Model) {
      return res.status(404).json({
        success: false,
        message: `Model '${collectionName}' not found`,
      });
    }

    const schoolId = req.user?.schoolId;
    if (!schoolId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: schoolId missing in user context",
      });
    }

    const finalFilter = { ...filter, schoolId: new mongoose.Types.ObjectId(schoolId) };

    const docs = await Model.find(finalFilter).select(`_id ${fieldName}`).lean();

    const uniqueMap = new Map();
    docs.forEach((doc) => {
      if (doc[fieldName] && !uniqueMap.has(doc[fieldName])) {
        uniqueMap.set(doc[fieldName], { id: doc._id, value: doc[fieldName] });
      }
    });

    return res.status(200).json({
      success: true,
      collection: collectionName,
      field: fieldName,
      distinctValues: Array.from(uniqueMap.values()),
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

const sendEmailController = async (req, res) => {
  const { type, data } = req.body;

  try {
    const user = await User.findById(data.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: false,
      });
    }

    switch (type) {
      case "RESET_PASSWORD": {
        await TemporaryToken.deleteMany({
          userId: user._id,
          tokenType: "RESET_PASSWORD",
        });

        let token = signAccessToken({
          data: { id: user._id, name: user.name },
          time: new Date(),
        });

        await TemporaryToken.create({
          userId: user._id,
          tokenType: "RESET_PASSWORD",
          token,
        });

        token = encodeURIComponent(token);

        await sendEmail(
          user.email,
          "Reset your Edusphere password",
          resetPasswordTemplate(user.name, token)
        );

        return res.status(200).json({
          message: "Reset password email sent successfully.",
          status: true,
        });
      }

      default:
        return res.status(400).json({
          message: "Invalid email type",
          status: false,
        });
    }
  } catch (err) {
    console.error("Error in sendEmailController:", err);
    res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
};

module.exports = { getDistinctValues, sendEmailController };
