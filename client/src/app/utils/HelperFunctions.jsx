export const getBackgroundColor = (status, colors) => {
  const legend = colors.find((item) => item.label === status);
  return legend ? legend.color : "transparent";
};

export const handleAction = (action, actionValue) => {
  switch (action) {
    case "navigate":
      window.location.href = actionValue;
  }
};
