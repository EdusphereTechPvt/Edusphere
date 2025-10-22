import {
  AccountCircle,
  People,
  Description,
  Class as ClassIcon,
  School,
  Edit,
  Delete,
  SchoolOutlined,
  PeopleAlt,
  AdminPanelSettings,
  FamilyRestroom,
  Book,
  ViewList,
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
      styles: {
        Card: {
          inlineStyle: {
            textWrap: "nowrap",
            border: "1px solid #ddd",
            borderRadius: 2,
          },
          className: "drop-shadow-none",
        },
      },
    },
    {
      type: "chart",
      title: "Users by Role",
      chartType: "bar",
      dataKey: "roles",
      colors: ["#60A5FA", "#14B8A6", "#A855F7", "#6366F1"],
      styles: {
        Box: {
          inlineStyle: {
            border: "1px solid #ddd",
            borderRadius: 2,
            backgroundColor: "#fff",
            px: 2,
            py: 1.5,
          },
        },
      },
    },
    {
      type: "statcards",
      items: [
        {
          icon: SchoolOutlined,
          title: "Manage Teachers",
          onClick: "/list/teachers",
          styles: {
            iconContainerStyle: {
              inlineStyle: {
                backgroundColor: "#E3F2FD",
                mb: 0.2,
              },
            },
            iconStyles: {
              inlineStyle: {
                color: "#1976D2",
                fontSize: { xs: 25, sm: 30, md: 32 },
              },
            },
          },
        },
        {
          icon: PeopleAlt,
          title: "Manage Students",
          onClick: "/list/students",
          styles: {
            iconContainerStyle: {
              inlineStyle: {
                backgroundColor: "#E8F5E9",
                mb: 0.2,
              },
            },
            iconStyles: {
              inlineStyle: {
                color: "#2E7D32",
                fontSize: { xs: 25, sm: 28, md: 30 },
              },
            },
          },
        },
        {
          icon: AdminPanelSettings,
          title: "Manage Admins",
          onClick: "/list/admins",
          styles: {
            iconContainerStyle: {
              inlineStyle: {
                backgroundColor: "#FFF3E0",
                mb: 0.2,
              },
            },
            iconStyles: {
              inlineStyle: {
                color: "#F57C00",
                fontSize: { xs: 25, sm: 28, md: 30 },
              },
            },
          },
        },
        {
          icon: FamilyRestroom,
          title: "Manage Parents",
          onClick: "/list/parents",
          styles: {
            iconContainerStyle: {
              inlineStyle: {
                backgroundColor: "#F3E5F5",
                mb: 0.2,
              },
            },
            iconStyles: {
              inlineStyle: {
                color: "#7B1FA2",
                fontSize: { xs: 25, sm: 28, md: 30 },
              },
            },
          },
        },
        {
          icon: Book,
          title: "Manage Subjects",
          onClick: "/list/subjects",
          styles: {
            iconContainerStyle: {
              inlineStyle: {
                backgroundColor: "#E1F5FE",
                mb: 0.2,
              },
            },
            iconStyles: {
              inlineStyle: {
                color: "#0288D1",
                fontSize: { xs: 25, sm: 28, md: 30 },
              },
            },
          },
        },
        {
          icon: ViewList,
          title: "Manage Sections",
          onClick: "/list/sections",
          styles: {
            iconContainerStyle: {
              inlineStyle: {
                backgroundColor: "#FFFDE7",
                mb: 0.2,
              },
            },
            iconStyles: {
              inlineStyle: {
                color: "#F9A825",
                fontSize: { xs: 25, sm: 28, md: 30 },
              },
            },
          },
        },
        {
          icon: ClassIcon,
          title: "Manage Classes",
          onClick: "/list/classes",
          styles: {
            iconContainerStyle: {
              inlineStyle: {
                backgroundColor: "#E0F7FA",
                mb: 0.2,
              },
            },
            iconStyles: {
              inlineStyle: {
                color: "#00796B",
                fontSize: { xs: 25, sm: 28, md: 30 },
              },
            },
          },
        },
      ],
      styles: {
        cardStyle: {
          inlineStyle: {
            textWrap: "nowrap",
            border: "1px solid #ddd",
            borderRadius: 2,
          },
        },
      },
    },
    {
      type: "table",
      configField: [
        { name: "name", displayName: "Name" },
        { name: "uid", displayName: "ID" },
        { name: "role", displayName: "Role" },
        {
          name: "isActive",
          displayName: "Status",
        },
        { name: "email", displayName: "Email" },
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
    clickableFields: ["id", "name"],
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
    clickableFields: ["id", "name"],
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
    clickableFields: ["id", "name"],
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
};

export const ProfileCardConfig = {
  student: {
    header: {
      title: "Student Profile Overview",
    },

    fields: [
      { key: "attendance", label: "Attendance", type: "progress" },
      { key: "status", label: "Status", type: "chip" },
      { key: "dateOfBirth", label: "Date of Birth", type: "text" },
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
};
