import {
  AccountCircle,
  People,
  Description,
  Class as ClassIcon,
  School,
  Edit,
  Delete,
} from "@mui/icons-material";

export const manageConfig = {
  header: {
    title: "Manage",
    subtitle: "Centralized control panel for Edusphere Admins",
  },
  sections: [
    {
      type: "statcards",
      items: [
        {
          name: "total",
          label: "Total Users",
        },
        {
          name: "admin",
          label: "Admins",
          isRole: true,
        },
        {
          name: "teacher",
          label: "Teachers",
          isRole: true,
        },
        {
          name: "student",
          label: "Students",
          isRole: true,
        },
        {
          name: "active",
          label: "Active",
        },
        {
          name: "inactive",
          label: "In-Active",
        },
      ],
    },
  ],
};

export const listConfig = {
  //Just for information if there is a object inside the array then you can use like object[fieldName]
  student: {
    tableHeader: [
      { map: "studentId", displayName: "ID" },
      { name: "name", displayName: "Name" },
      { name: "grade", displayName: "Class" },
      { name: "section", displayName: "Section" },
      { name: "gender", displayName: "Gender" },
      { name: "status", displayName: "Status" },
    ],
    clickableFields: ["id"],
  },
  teacher: {
    tableHeader: [
      { map: "teacherId", displayName: "ID" },
      { name: "name", displayName: "Name" },
      { name: "email", displayName: "Email" },
      { name: "phone", displayName: "Phone" },
      { name: "gender", displayName: "Gender" },
      { name: "status", displayName: "Status" },
    ],
    clickableFields: ["id"],
  },
  subject: {
    tableHeader: [
      { map: "subjectId", displayName: "ID" },
      { name: "name", displayName: "Name" },
      { name: "code", displayName: "Code" },
      { name: "credits", displayName: "Credits" },
      { name: "status", displayName: "Status" },
    ],
    // clickableFields:["id", "name"]
  },
  class: {
    tableHeader: [
      { map: "classId", displayName: "ID" },
      { name: "name", displayName: "Name" },
      { name: "academicYear", displayName: "Year" },
      { name: "status", displayName: "Status" },
    ],
    clickableFields: ["id"],
  },
  section: {
    tableHeader: [
      { map: "sectionId", displayName: "ID" },
      { name: "class[name]", displayName: "Class" },
      { name: "name", displayName: "Section" },
      { name: "classTeacher[name]", displayName: "Class Teacher" },
      { name: "isActive", displayName: "Status" },
    ],
    // clickableFields:["id", "name"]
  },
  parent: {
    tableHeader: [
      { map: "parentId", displayName: "ID" },
      { name: "name", displayName: "Name" },
      { name: "email", displayName: "Email" },
      { name: "emergencyContact", displayName: "Phone" },
      { name: "occupation", displayName: "Occupation" },
    ],
    clickableFields: ["id"],
  },
  admin: {
    tableHeader: [
      { map: "adminId", displayName: "ID" },
      { name: "name", displayName: "Name" },
      { name: "email", displayName: "Email" },
      { name: "designation", displayName: "Designation" },
      { name: "isActive", displayName: "Status" },
    ],
    clickableFields: ["id"],
  },
};

export const ProfileCardConfig = {
  student: {
    header: {
      title: "Student Profile Overview",
    },

    fields: [
      { key: "attendance", label: "Attendance", type: "progress" },
      { key: "isActive", label: "Status", type: "chip" },
      { key: "parentName", label: "Parent/Guardian Name", type: "text" },
      { key: "studentContactNumber", label: "Phone Number", type: "text" },
    ],

    quickLinks: [
      { label: "Full Profile", icon: <AccountCircle />, action: () => {} },
      { label: "Parent/Guardian Info", icon: <People />, action: () => {} },
      { label: "Academic Records", icon: <Description />, action: () => {} },
    ],
  },

  teacher: {
    header: {
      title: "Teacher Profile Overview",
    },

    fields: [
      { key: "attendance", label: "Attendance", type: "progress" },
      { key: "status", label: "Employment Status", type: "chip" },
      { key: "subject", label: "Subject", type: "text" },
      { key: "experience", label: "Experience", type: "text" },
    ],

    quickLinks: [
      { label: "Full Profile", icon: <AccountCircle />, action: () => {} },
      { label: "Class Management", icon: <ClassIcon />, action: () => {} },
      { label: "Student Reports", icon: <School />, action: () => {} },
    ],
  },
  class: {
    header: {
      title: "Class Overview",
    },

    fields: [
      { key: "attendance", label: "Attendance", type: "progress" },
      { key: "status", label: "Employment Status", type: "chip" },
      { key: "subject", label: "Subject", type: "text" },
      { key: "experience", label: "Experience", type: "text" },
    ],

    quickLinks: [
      { label: "Full Profile", icon: <AccountCircle />, action: () => {} },
      { label: "Class Management", icon: <ClassIcon />, action: () => {} },
      { label: "Student Reports", icon: <School />, action: () => {} },
    ],
  },
  parent: {
    header: {
      title: "Parent/Guardian Overview",
    },
    fields: [
      { key: "email", label: "Email", type: "Text" },
      { key: "occupation", label: "Occupation", type: "Text" },
      { key: "emergencyContact", label: "Phone No.", type: "Text" },
    ],
    quickLinks: [
      { label: "Full Profile", icon: <AccountCircle />, action: () => {} },
      { label: "Class Management", icon: <ClassIcon />, action: () => {} },
      { label: "Student Reports", icon: <School />, action: () => {} },
    ],
  },
  admin: {
    header: {
      title: "Admin Overview",
    },
    fields: [
      { key: "email", label: "Email", type: "Text" },
      { key: "designation", label: "Designation", type: "Text" },
      { key: "isActive", label: "Status", type: "chip" },
    ],
    quickLinks: [
      { label: "Full Profile", icon: <AccountCircle />, action: () => {} },
      { label: "Class Management", icon: <ClassIcon />, action: () => {} },
      { label: "Student Reports", icon: <School />, action: () => {} },
    ],
  },
};
