import { showToast } from "../utils/Toast";
import api from "./MiddlewareService";

export const getListDetails = async (listname) => {
  try {
    const response = await api.post(`/${listname}/getAll`, {}, {
      headers: { "x-page": `/list/${listname}` },
      withCredentials: true
    })

    if (!response.data.status) {
      showToast(response.data.message || "Failed to fetch list details", "error")
    }

    showToast(response.data.message || "Data Fetched Successfully", "success")
    return response.data;
  } catch (error) {
    showToast("Failed to fetch list details", "error")
    console.error("Error fetching list details:", error);
    throw error;
  }
};

export const getProfileCardData = async (listname, searchBy) => {
  try {
    const response = await api.post(`/${listname}/getProfileCardData`, { searchBy })
    if (!response.data.status) {
      showToast("Failed to fetch profile details", "error")
      throw new Error("Failed to fetch list details");
    }

    return response.data.data;
  }
  catch (err) {
    console.error("Error fetch profile data", err)
    throw err;
  }
}

export const handleDeleteData = async (actionValue, id) => {
  const response = await api.post(actionValue, {
    id
  }, {
    headers: { "x-page": actionValue },
    withCredentials: true
  })

  showToast(response.data.message, response.data.status ? "success" : "error")

  return response.data.status
}