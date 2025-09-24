import api from "./MiddlewareService";

export const getListDetails = async (listname) => {
  try {
    const response = api.get(`/${listname}/getAll`)
    console.log(response)
    if (!response.ok) {
      throw new Error("Failed to fetch list details");
    }
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching list details:", error);
    throw error;
  }
};