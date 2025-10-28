// const { default: mongoose } = require("mongoose");
// const User = require("../models/AuthSchema");
// const Parent = require("../models/Parent");
// const School = require("../models/SchoolSchema");
// const { syncReferences } = require("../utils/Sync");
// const { sendEmail } = require("../utils/Email");
// const { parentSignupTemplate} = require("../utils/templates/EmailTemplates");

// const save = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const {
//       name,
//       email,
//       occupation,
//       emergencyContact,
//       parentDOB,
//       parentEmail,
//       alternativeEmail,
//       alternativeContactNumber,
//       children = [],
//     } = req.body;

//     const { schoolId } = req.user;

//     if (!name || !email || !occupation || !emergencyContact || !schoolId) {
//       await session.abortTransaction();
//       return res.status(400).json({
//         message: "Name, Email, Occupation, Emergency Contact, and School ID are required",
//         status: false,
//       });
//     }


//     let user = await User.findOne({ email }).session(session);
//     if (!user) {
//       const password = `${name.split(" ")[0]}@${Date.now().toString().slice(-4)}`;
//       user = new User({
//         name,
//         email,
//         schoolId,
//         password,
//         role: "parent",
//       });
//       await user.save({ session });
//     }


//     let parent = await Parent.findOne({ userId: user._id, schoolId }).session(session);

//     if (parent) {
//       parent.occupation = occupation;
//       parent.emergencyContact = emergencyContact;
//       parent.children = children;

//       await parent.save({ session });
//       await syncReferences({ action: "save", targetModel: "Parent", targetId: parent._id, session });

//       await session.commitTransaction();

    
//      await sendEmail(
//        parentEmail,
//        `Hey ${parentName}, Welcome to Edusphere! 👪`,
//        parentSignupTemplate(parentName, school.name),
//        false 
//      );
     

//       return res.status(200).json({
//         message: "Parent profile updated successfully",
//         data: parent,
//         status: true,
//       });
//     }


//     const newParent = new Parent({
//       parentId: `PRT-${Date.now()}`,
//       userId: user._id,
//       schoolId,
//       occupation,
//       emergencyContact,
//       children,
//     });

//     await newParent.save({ session });
//     await syncReferences({ action: "save", targetModel: "Parent", targetId: newParent._id, session });

//     await session.commitTransaction();

//     res.status(201).json({
//       message: "Parent profile created successfully",
//       data: newParent,
//       status: true,
//     });
//   } catch (err) {
//     await session.abortTransaction();
//     console.error("Save Parent Error:", err);
//     res.status(500).json({
//       message: "Server error during parent add/update",
//       status: false,
//     });
//   } finally {
//     session.endSession();
//   }
// };


// const getParentDetails = async (req, res) => {
//   const { id, name = "", email = "" } = req.body;

//   if (![id, name, email].some(Boolean)) {
//     return res.status(400).json({
//       message: "At least one search field (id, name, or email) is required",
//       status: false,
//     });
//   }

//   const searchFields = {};
//   if (id && mongoose.Types.ObjectId.isValid(id)) searchFields._id = id;
//   if (name) searchFields.name = { $regex: name, $options: "i" };
//   if (email) searchFields.email = { $regex: email, $options: "i" };

//   try {
//     const response = await Parent.find(searchFields)
//       .populate("userId", "name email role")
//       .populate("children", "name class section rollNumber");

//     if (!response || response.length === 0) {
//       return res.status(404).json({
//         message: "No parent found",
//         data: [],
//         status: false,
//       });
//     }

//     if (response.length === 1) {
//       return res.status(200).json({
//         message: "Parent found successfully",
//         data: response[0],
//         status: true,
//       });
//     }

//     res.status(200).json({
//       message: "Multiple parents found",
//       data: response,
//       status: true,
//     });
//   } catch (err) {
//     console.error("Get Parent Details Error:", err);
//     res.status(500).json({
//       message: "Server error while fetching parent details",
//       status: false,
//     });
//   }
// };


// const getAllParentsList = async (req, res) => {
//   try {
//     const parents = await Parent.find({ schoolId: req.user.schoolId })
//       .populate("userId", "name email role")
//       .populate("children", "name");

//     if (!parents || parents.length === 0) {
//       return res.status(200).json({
//         message: "No parents found",
//         data: [],
//         status: false,
//       });
//     }

//     const formattedParents = parents.map((p) => ({
//       _id: p._id,
//       parentId: p.parentId,
//       avatar: p.photo,
//       name: p.userId?.name,
//       email: p.userId?.email,
//       occupation: p.occupation,
//       emergencyContact: p.emergencyContact,
//       children: p.children.map((child) => child.name),
//     }));

//     res.status(200).json({
//       message: `${parents.length} parent(s) found successfully`,
//       data: formattedParents,
//       status: true,
//     });
//   } catch (err) {
//     console.error("Get All Parents Error:", err);
//     res.status(500).json({
//       message: "Server error while fetching parents list",
//       status: false,
//     });
//   }
// };


// const getProfileCardData = async (req, res) => {
//   try {
//     const { key, value } = req.body.searchBy;

//     const parent = await Parent.findOne({ [key]: value })
//       .populate("userId", "name email role");

//     if (!parent) {
//       return res.status(404).json({
//         message: "Parent not found",
//         status: false,
//       });
//     }

//     const formattedParent = {
//       _id: parent._id,
//       parentId: parent.parentId,
//       name: parent.userId?.name,
//       email: parent.userId?.email,
//       occupation: parent.occupation,
//       emergencyContact: parent.emergencyContact,
//     };

//     res.status(200).json({
//       message: "Parent profile data fetched successfully",
//       data: formattedParent,
//       status: true,
//     });
//   } catch (err) {
//     console.error("Get Parent Profile Error:", err);
//     res.status(500).json({
//       message: "Server error while fetching parent profile data",
//       status: false,
//     });
//   }
// };


// const deleteParent = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const { id } = req.body;

//     const parent = await Parent.findByIdAndDelete(id).session(session);

//     if (!parent) {
//       await session.abortTransaction();
//       return res.status(404).json({
//         message: "Parent not found",
//         status: false,
//       });
//     }

//     await syncReferences({ action: "remove", targetModel: "Parent", targetId: parent._id, session });
//     await User.findByIdAndDelete(parent.userId).session(session);

//     await session.commitTransaction();

//     res.status(200).json({
//       message: "Parent deleted successfully",
//       status: true,
//     });
//   } catch (err) {
//     await session.abortTransaction();
//     console.error("Delete Parent Error:", err);
//     res.status(500).json({
//       message: "Server error while deleting parent",
//       status: false,
//     });
//   } finally {
//     session.endSession();
//   }
// };

// module.exports = {
//   save,
//   getParentDetails,
//   getAllParentsList,
//   getProfileCardData,
//   deleteParent,
// };

const { default: mongoose } = require("mongoose");
const User = require("../models/AuthSchema");
const Parent = require("../models/Parent");
const Student = require("../models/Student");
const { sendEmail } = require("../utils/Email");
const { parentSignupTemplate } = require("../utils/templates/EmailTemplates");
const { syncReferences } = require("../utils/Sync");

const save = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      _id,
      name,
      email,
      alternativeEmail,
      dateOfBirth,
      photo,
      occupation,
      emergencyContact,
      alternativeContactNumber,
      relation,
      children = [],
      isActive,
    } = req.body;

    const { schoolId } = req.user;

    if (!name || !email || !dateOfBirth || !schoolId ) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Full Name, Date of Birth, Email, and School ID are required",
        status: false,
      });
    }

    
    let user = await User.findOne({ email }).session(session);

    if (!user) {
      const dobStr = new Date(dateOfBirth).toISOString().split("T")[0].replace(/-/g, "");
      const password = `${name.split(" ")[0]}@${dobStr}`;

      user = new User({
        name,
        email,
        password,
        dateOfBirth,
        schoolId: schoolFromToken,
        role: "parent",
      });
      await user.save({ session });
    }

    
    let parent = await Parent.findOne({ userId: user._id, schoolId }).session(session);

    if (parent) {
      Object.assign(parent, {
        name,
        email,
        alternativeEmail,
        dateOfBirth,
        photo,
        occupation,
        emergencyContact,
        alternativeContactNumber,
        relation,
        children,
        isActive,
      });

      await parent.save({ session });

      await syncReferences({
        action: "save",
        targetModel: "Parent",
        targetId: parent._id,
        filters: { Student: { _id: children } },
        session,
      });

      await session.commitTransaction();
      return res.status(200).json({
        message: "Parent updated successfully",
        data: parent,
        status: true,
      });
    }

    
    const newParent = new Parent({
      userId: user._id,
      parentId: `PTR-${Date.now()}`,
      schoolId,
      name,
      email,
      alternativeEmail,
      dateOfBirth,
      photo,
      occupation,
      emergencyContact,
      alternativeContactNumber,
      relation,
      children,
      isActive,
    });

    await newParent.save({ session });

    await syncReferences({
      action: "save",
      targetModel: "Parent",
      targetId: newParent._id,
      filters: { Student: { _id: children } },
      session,
    });

    await session.commitTransaction();

         await sendEmail(
       parentEmail,
       `Hey ${parentName}, Welcome to Edusphere! 👪`,
       parentSignupTemplate(parentName, school.name),
       false 
     );
     
    

    res.status(201).json({
      message: "Parent added successfully",
      data: newParent,
      status: true,
    });
  } catch (err) {
    await session.abortTransaction();
    console.error("Parent Save Error:", err);
    res.status(500).json({
      message: "Server error during parent add/update",
      status: false,
    });
  } finally {
    session.endSession();
  }
};


const getParentDetails = async (req, res) => {
  const { id, parentId, name = "", email = "", emergencyContact = "" } = req.body;

  if (![id, parentId, name, email, emergencyContact].some(Boolean)) {
    return res.status(400).json({
      message: "At least one search field is required",
      status: false,
    });
  }

  const searchFields = {};

  if (id && mongoose.Types.ObjectId.isValid(id)) searchFields._id = id;
  if (parentId) searchFields.parentId = parentId;
  if (name) searchFields.name = { $regex: name, $options: "i" };
  if (email) searchFields.email = { $regex: email, $options: "i" };
  if (emergencyContact) searchFields.emergencyContact = { $regex: emergencyContact, $options: "i" };

  try {
    const response = await Parent.find(searchFields)
      // .populate("userId", "name email avatar isActive")
      // .populate("children", "name studentId classes sections _id");

    if (!response.length) {
      return res.status(404).json({ data: [], message: "No parent found", status: false });
    }

    if (response.length === 1) {
      return res.status(200).json({
        data: response[0],
        message: "Parent found successfully",
        status: true,
      });
    }

    return res.status(200).json({
      data: response,
      message: "Multiple parents found successfully",
      status: true,
    });
  } catch (error) {
    console.error("Error fetching parent details:", error);
    return res.status(500).json({
      message: "Server error while fetching parent details",
      status: false,
    });
  }
};


const getAllParentsList = async (req, res) => {
  try {
    const parents = await Parent.find({ schoolId: req.user.schoolId })
      .populate("userId", "name email avatar isActive")
      .populate("children", "name studentId");

    if (!parents || parents.length === 0) {
      return res.status(200).json({
        data: [],
        message: "No parent found",
        status: false,
      });
    }

    const formattedParents = parents.map((parent) => ({
      parentId: parent.parentId,
      name: parent.userId?.name,
      email: parent.userId?.email,
      avatar: parent.photo,
      occupation: parent.occupation,
      relation: parent.relation,
      emergencyContact: parent.emergencyContact,
      childrenCount: parent.children?.length || 0,
      isActive: parent.userId?.isActive,
    }));

    res.status(200).json({
      data: formattedParents,
      message: `${parents.length} parent(s) found successfully`,
      status: true,
    });
  } catch (err) {
    console.error("Get All Parents Error:", err);
    res.status(500).json({
      message: "Server error while fetching parent details",
      status: false,
    });
  }
};


const getProfileCardData = async (req, res) => {
  try {
    const keyName = req.body.searchBy.key;
    const keyValue = req.body.searchBy.value;

    let parentProfileData = await Parent.findOne({ [keyName]: keyValue })
      .populate("userId", "name email avatar isActive")
      .populate("children", "name studentId");

    if (!parentProfileData) {
      return res.status(404).json({ message: "Parent not found", status: false });
    }

    const formattedParent = {
      _id: parentProfileData._id,
      id: parentProfileData.parentId,
      name: parentProfileData.userId?.name,
      avatar: parentProfileData.userId?.avatar,
      occupation: parentProfileData.occupation,
      relation: parentProfileData.relation,
      children: parentProfileData.children?.map((child) => ({
        id: child._id,
        name: child.name,
        studentId: child.studentId,
      })),
    };

    res.status(200).json({ status: true, data: formattedParent });
  } catch (err) {
    console.error("Get Parent Error:", err);
    res.status(500).json({
      message: "Server error while fetching parent profile",
      status: false,
    });
  }
};


const deleteParent = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.body;

    const parent = await Parent.findById(id)
      .populate("children")
      .session(session);

    if (!parent) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "Parent not found",
        status: false,
      });
    }

    
    if (parent.children && parent.children.length > 0) {
      for (const child of parent.children) {
        await syncReferences({
          action: "remove",
          targetModel: "Student",
          targetId: child._id,
          session,
        });

        
        const student = await Student.findByIdAndDelete(child._id).session(session);
        if (student?.userId) {
          await User.findByIdAndDelete(student.userId).session(session);
        }
      }
    }

  
    await syncReferences({
      action: "remove",
      targetModel: "Parent",
      targetId: parent._id,
      session,
    });

    
    await User.findByIdAndDelete(parent.userId).session(session);

    await Parent.findByIdAndDelete(parent._id).session(session);

    await session.commitTransaction();
    res.status(200).json({
      message: "Parent and all associated children deleted successfully",
      status: true,
    });
  } catch (err) {
    await session.abortTransaction();
    console.error("Delete Parent Error:", err);
    res.status(500).json({
      message: "Server error while deleting parent and their children",
      status: false,
    });
  } finally {
    session.endSession();
  }
};


module.exports = {
  save,
  getParentDetails,
  deleteParent,
  getAllParentsList,
  getProfileCardData,
};
