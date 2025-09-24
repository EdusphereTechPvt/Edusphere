import {
  AccountCircle,
  People,
  Description,
  Class as ClassIcon,
  School,
  Edit,
  Delete,
} from "@mui/icons-material";

export const ProfileCardConfig = {
  student: {
    header: {
      title: "Student Profile Overview",
      buttons: [
        {
          name: "edit",
          displayName: "Edit",
          action: "editStudent",
          icon: Edit,
          type: "link",
          link: "/edit-student",
          style: { variant: "contained", color: "white" },
        },
        {
          name: "delete",
          displayName: "Delete",
          action: "deleteStudent",
          icon: Delete,
          type: "link",
          link: "/delete-student",
          style: {
            variant: "contained",
            color: "white",
            backgroundColor: "var(--color-red)",
          },
        },
      ],
      subInfo: [
        {
          key: "id",
          label: "Student ID",
          valueGetter: (data) => `${data.id}`,
        },
      ],
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
      buttons: [
        {
          name: "edit",
          displayName: "Edit",
          action: "editTeacher",
          icon: Edit,
          type: "link",
          link: "/edit-teacher",
          style: { variant: "contained", color: "white" },
        },
        {
          name: "delete",
          displayName: "Delete",
          action: "deleteTeacher",
          icon: Delete,
          type: "link",
          link: "/delete-teacher",
          style: {
            variant: "contained",
            color: "white",
            backgroundColor: "var(--color-red)",
          },
        },
      ],
       subInfo: [
        {
          key: "id",
          label: "Teacher ID",
          valueGetter: (data) => `${data.id}`,
        },
      ],
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

