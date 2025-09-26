import {
  AccountCircle,
  People,
  Description,
  Class as ClassIcon,
  School,
  Edit,
  Delete,
} from "@mui/icons-material";

export const listConfig = {
  //Just for information if there is a object inside the array then you can use like object[fieldName]
  student: {
    tableHeader: [
        { map: "studentId", displayName: "ID" },
        { name: "name", displayName: "Name" },
        { name: "grade", displayName: "Class" },
        { name: "section", displayName: "Section" },
        { name: "gender", displayName: "Gender" },
        { name: "status", displayName: "Status" }
      ],
      clickableFields:["id", "name"]
  },
  teacher: {
    tableHeader: [
        { map: "teacherId", displayName: "ID" },
        { name: "name", displayName: "Name" },
        { name: "email", displayName: "Email" },
        { name: "phone", displayName: "Phone" },
        { name: "gender", displayName: "Gender" },
        { name: "status", displayName: "Status" }
      ],
      clickableFields:["id", "name"]
  }
}

export const ProfileCardConfig = {
  student: {
    header: {
      title: "Student Profile Overview",
    },

    fields: [
      { key: "attendance", label: "Attendance", type: "progress" },
      { key: "status", label: "Status", type: "chip" },
      { key: "dob", label: "Date of Birth", type: "text" },
      { key: "phone", label: "Phone Number", type: "text" },
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
};
