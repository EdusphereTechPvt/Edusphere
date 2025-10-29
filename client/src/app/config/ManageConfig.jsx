import {
  Class as ClassIcon,
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
    subtitle: "Centralized control panel for Edusphere Admin",
  },
  sections: [
    {
      type: "statcards",
      items: [
        { name: "total", label: "Total Users" },
        { name: "admin", label: "Admins", isRole: true },
        { name: "teacher", label: "Teachers", isRole: true },
        { name: "student", label: "Students", isRole: true },
        { name: "active", label: "Active" },
        { name: "inactive", label: "In-Active" },
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
            height: "100%",
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
          onClick: "/list/teacher",
          styles: {
            iconContainerStyle: {
              inlineStyle: { backgroundColor: "#E3F2FD", mb: 0.2 },
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
          onClick: "/list/student",
          styles: {
            iconContainerStyle: {
              inlineStyle: { backgroundColor: "#E8F5E9", mb: 0.2 },
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
          onClick: "/list/admin",
          styles: {
            iconContainerStyle: {
              inlineStyle: { backgroundColor: "#FFF3E0", mb: 0.2 },
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
          onClick: "/list/parent",
          styles: {
            iconContainerStyle: {
              inlineStyle: { backgroundColor: "#F3E5F5", mb: 0.2 },
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
          onClick: "/list/subject",
          styles: {
            iconContainerStyle: {
              inlineStyle: { backgroundColor: "#E1F5FE", mb: 0.2 },
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
          onClick: "/list/section",
          styles: {
            iconContainerStyle: {
              inlineStyle: { backgroundColor: "#FFFDE7", mb: 0.2 },
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
          onClick: "/list/class",
          styles: {
            iconContainerStyle: {
              inlineStyle: { backgroundColor: "#E0F7FA", mb: 0.2 },
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
            maxWidth: "100% !important",
          },
        },
        textContainerStyle: {
          titleStyle: {
            inlineStyle: { fontSize: { xs: 12, md: 16 }, mt: 0.3 },
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
        { name: "isActive", displayName: "Status" },
        { name: "email", displayName: "Email" },
      ],
    },
  ],
};
