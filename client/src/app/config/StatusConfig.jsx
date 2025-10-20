const green = {
  chipBg: "#dcfce7",
  chipColor: "#15803d",
  hoverBg: "#f9fafb",
};
const red = {
  chipBg: "#fee2e2",
  chipColor: "#b91c1c",
  bg: "#fef2f2",
  hoverBg: "#fee2e2",
};
const yellow = {
  chipBg: "#fef9c3",
  chipColor: "#92400e",
  bg: "#fffbeb",
  hoverBg: "#fef9c3",
};

export const statusConfig = {
  Paid: green,
  Completed: green,
  Active: green,

  Unpaid: red,
  Overdue: red,
  Inactive: red,
  undefined: red,

  "Partially Paid": yellow,
  "On Hold": yellow,
  Upcoming: yellow,

  default: {
    bg: "#ffffff", // default white
    hoverBg: "#f9fafb", // gray-50 hover
    chipBg: "#9ca3af", // gray-400 chip
    chipColor: "#fff",
  },
};

export const getSubjectColors = (subject) => {
  const key = subject.toLowerCase().trim();
  const colorMap = {
    math: { bg: "#FFE8E8", text: "#D32F2F", hover: "#FFCDD2" },
    science: { bg: "#E8F4FF", text: "#1565C0", hover: "#BBDEFB" },
    english: { bg: "#E8FFE8", text: "#2E7D32", hover: "#C8E6C9" },
    history: { bg: "#FFF9E6", text: "#EF6C00", hover: "#FFE0B2" },
    art: { bg: "#F3E8FF", text: "#7B1FA2", hover: "#E1BEE7" },
    music: { bg: "#E8E8FF", text: "#303F9F", hover: "#C5CAE9" },
    PE: { bg: "#FFE8F3", text: "#C2185B", hover: "#F8BBD0" },
    Free: { bg: "#F5F5F5", text: "#757575", hover: "#E0E0E0" },
  };

  return colorMap[key] || { bg: "#FFFFFF", text: "#000000", hover: "#F0F0F0" };
};
