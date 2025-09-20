export const formatConfig = (config, location) => {
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
