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
