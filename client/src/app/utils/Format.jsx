export const formatToDropdown = (name, dependancyData, data) => {
  if (!Array.isArray(data)) return { items: [] };
  return {
    placeholder:
      "Select " + name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
    disabled: dependancyData && !dependancyData.length > 0,
    items: data.map((item) =>
      typeof item === "object"
        ? { label: item.label || item.value, value: item.value }
        : { label: item, value: item }
    ),
  };
};

export const formatLabel = (key) => {
  const withSpaces = key.replace(/([A-Z])/g, " $1");
  return withSpaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatTable = (data, requiredFields) => {
  if (!Array.isArray(data) || !Array.isArray(requiredFields)) {
    throw new Error("Invalid input: data and requiredFields should be arrays");
  }

  const headers = requiredFields.map((key) => formatLabel(key));

  const filteredData = data.map((item) => {
    const filteredItem = {};
    requiredFields.forEach((key) => {
      const label = formatLabel(key);
      filteredItem[label] = item[key] ?? "";
    });
    return filteredItem;
  });

  return {
    headers,
    data: filteredData,
  };
};
