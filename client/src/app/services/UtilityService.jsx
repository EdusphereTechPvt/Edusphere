import api from "./MiddlewareService";

export const fetchDistinctValues = async (field, formData, page) => {
  try {
    const payload = {};

    if (field.dependancy?.length) {
      for (const dep of field.dependancy) {
        if (formData[dep]) {
          payload[dep] = formData[dep];
        }
      }
    }

    const response = await api.post(`/api/distinct-values`, {
      fieldName: field.name,
      ...payload,
    },{
        headers: { "x-page": page },
        withCredentials: true
      });

    return response.data || [];
  } catch (error) {
    console.error(`Error fetching distinct values for ${field.name}`, error);
    return [];
  }
};
