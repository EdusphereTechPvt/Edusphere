const Subject = require("../models/SubjectSchema");


const addOrUpdateSubject = async (req, res) => {
  try {
    const { id, subjectName, subjectCode, department, category } = req.body;

    if (!subjectName || !department) {
      return res.status(400).json({
        message: "Subject Name and Department are required",
        status: false
      });
    }

    let subject;
    if (id) {
      subject = await Subject.findByIdAndUpdate(
        id,
        { subjectName, subjectCode, department, category },
        { new: true }
      );
    } else {
      subject = new Subject({ subjectName, subjectCode, department, category });
      await subject.save();
    }

    res.status(201).json({
      message: id ? "Subject updated successfully" : "Subject added successfully",
      data: subject,
      status: true
    });
  } catch (err) {
    console.error("Subject Add/Update Error:", err);
    res.status(500).json({ message: "Server error", status: false });
  }
};


const getSubjects = async (req, res) => {
  try {
    const { subjectName, department } = req.query;
    const filter = {};

    if (subjectName) filter.subjectName = { $regex: subjectName, $options: "i" };
    if (department) filter.department = department;

    const subjects = await Subject.find(filter);

    res.status(200).json({
      message: "Subjects fetched successfully",
      data: subjects,
      status: true
    });
  } catch (err) {
    console.error("Get Subjects Error:", err);
    res.status(500).json({ message: "Server error", status: false });
  }
};


const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByIdAndDelete(id);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found", status: false });
    }

    res.status(200).json({ message: "Subject deleted successfully", status: true });
  } catch (err) {
    console.error("Delete Subject Error:", err);
    res.status(500).json({ message: "Server error", status: false });
  }
};

module.exports = { addOrUpdateSubject, getSubjects, deleteSubject };
