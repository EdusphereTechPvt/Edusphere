const { default: mongoose } = require("mongoose");

const addOrUpdateController = (Model) => async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  try {
    let data = req.body;
    data = {...data, schoolId: req.user.schoolId}

    if (!data.schoolId) {
      return res.status(400).json({ message: "schoolId is required", status: false });
    }

    let doc;

    if (data._id) {
      doc = await Model.findOneAndUpdate(
        { _id: data._id, schoolId: data.schoolId },
        data,
        { new: true,session },
      );

      if (!doc) {
        return res.status(404).json({ message: "Document not found for this school", status: false });
      }
    } else {
      doc = await Model.create([data],session);
      doc = doc[0]
    }

    res.status(200).json({
      message: data._id ? "Updated successfully" : "Created successfully",
      data: doc,
      status: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", status: false });
  }
};


module.exports = {addOrUpdateController}