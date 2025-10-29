import api from "./MiddlewareService";

export const fetchDistinctValues = async (field, formData, page, mode) => {
  try {
    const baseFilter = field.filter?.[mode] || {};
    const filter = { isActive: true };

    for (const [key, value] of Object.entries(baseFilter)) {
      if (typeof value === "string" && value.startsWith("$")) {
        const formKey = value.slice(1);
        filter[key] = formData?.[formKey] ?? null;
      } else {
        filter[key] = value;
      }
    }

    if (field.dependancy?.length) {
      for (const dep of field.dependancy) {
        if (formData[dep] !== undefined && formData[dep] !== null) {
          filter[dep] = formData[dep];
        }
      }
    }
    
    const response = await api.post(
      `/api/distinct-values`,
      {
        fieldName: field.fieldName,
        collectionName: field.collectionName,
        filter,
      },
      {
        headers: { "x-page": page },
        withCredentials: true,
      }
    );

    return response.data || [];
  } catch (error) {
    console.error(`Error fetching distinct values for ${field.name}`, error);
    return [];
  }
};

