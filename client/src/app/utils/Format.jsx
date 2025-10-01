import { Delete, Edit, Visibility } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';

const iconMap = {
  add: {icon:AddIcon, color:"contained"},
  edit: {icon:Edit, color:"primary"},
  delete: {icon:Delete, color:"warning"},
  view: {icon:Visibility, color:"contained"},
  default: {icon:null, color:"contained"},
};

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

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, key) => {
    return acc && acc[key] !== undefined ? acc[key] : "";
  }, obj);
};

export const formatTable = (data, configFields) => {
  if (!Array.isArray(data) || !Array.isArray(configFields)) {
    throw new Error("Invalid input: data and configFields should be arrays");
  }

  const headers = configFields.map((field) => field.displayName);

  const formattedData = data.map((item) => {
    const formattedRow = {};
    configFields.forEach((field) => {
      const keyPath = field.map || field.name;

      const value = getNestedValue(item, keyPath.replace(/\[(.*?)\]/g, ".$1"));

      formattedRow[field.displayName] = value;
    });
    return formattedRow;
  });

  return {
    headers,
    data: formattedData,
  };
};

export const formatElement = (formatType, elements = []) => {
  if (!Array.isArray(elements)) return [];


  switch(formatType){
    case "table": 
    return elements
      .map((el) => {
        switch(el.type){
          case "button":
          return {
            type: el.type,
            label: el.label,
            id: el.id,
            action: el.action,
            actionValue: el.actionValue,
            variant: "contained",
            actionUse: el.actionUse,
            styles: {
              elementStyles: {
                color: "white",
                fontWeight: "bold"
              },
              iconStyles: {
                fontWeight: "bold",
                color: "white",
              },
              labelStyles:{
                fontSize: "1rem"
              }
            },
          };
        }
      });
    case "profile":
      return elements
      .map((el) => {
        switch(el.type){
          case "iconbutton":
          return {
            type: el.type,
            label: el.label,
            id: el.id,
            icon: iconMap[el.actionUse].icon,
            action: el.action,
            actionValue: el.actionValue,
            variant: "contained",
            color: iconMap[el.actionUse].color,
            actionUse: el.actionUse,
            styles: {
              elementStyles: {
                color: "white",
                fontWeight: "bold"
              },
              iconStyles: {
                fontWeight: "bold",
                color: "white",
              },
              labelStyles:{
                fontSize: "1rem"
              }
            },
          };
        }
      });
  }
  return null;
};