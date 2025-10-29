export const dynamicUpdateConfig = (config, options) => {
  const { fieldName, matchKey, matchValue, newData } = options;

  const traverse = (node) => {
    if (!node) return;

    if (Array.isArray(node)) {
      node.forEach(traverse);
    } else if (typeof node === "object") {
      const matches = !matchKey || node[matchKey] === matchValue;

      if (matches && node[fieldName] !== undefined) {
        node[fieldName] = newData;
      }

      Object.values(node).forEach(traverse);
    }
  };

  traverse(config);
  return config;
};


export const staticUpdateConfig = (config, location) => {
  if (!config || !location || !Array.isArray(location)) return config;

  const traverse = (obj, locIndex) => {
    if (locIndex >= location.length) return;

    const step = location[locIndex];

    if (step.key && obj[step.key] !== undefined) {
      if (step.childType === "object") {
        traverse(obj[step.key], locIndex + 1);
      } else if (step.childType === "array" && Array.isArray(obj[step.key])) {
        traverse(obj[step.key], locIndex + 1);
      }
    }

    else if (step.matchKey && step.matchValue && Array.isArray(obj)) {
      const targetIndex = obj.findIndex(item => item[step.matchKey] === step.matchValue);
      if (targetIndex !== -1) {
        traverse(obj[targetIndex], locIndex + 1);
      }
    }

    else if (step.dataKey && step.data !== undefined) {
      if (Array.isArray(obj)) {
        obj.forEach(o => {
          o[step.dataKey] = step.data;
        });
      } else {
        obj[step.dataKey] = step.data;
      }
    }
  };

  traverse(config, 0);
  return config;
};
