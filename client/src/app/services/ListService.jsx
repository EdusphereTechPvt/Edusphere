import { showToast } from "../utils/Toast";
import api from "./MiddlewareService";

export const getListDetails = async (listname) => {
  try {
    const response = await api.get(`/${listname}/getAll`)

    if (!response.data.status) {
      showToast("Failed to fetch list details", "error")
      throw new Error("Failed to fetch list details");
    }

    showToast("Data Fetched Successfully", "success")
    return response.data;
  } catch (error) {
    showToast("Failed to fetch list details", "error")
    console.error("Error fetching list details:", error);
    throw error;
  }
};

export const getProfileCardData = async(listname, searchBy) => {
  try{
  const response = await api.post(`/${listname}/getProfileCardData`,{searchBy})
  if (!response.data.status) {
      showToast("Failed to fetch profile details", "error")
      throw new Error("Failed to fetch list details");
    }

  return response.data.data;
  }
  catch(err){
    console.error("Error fetch profile data", err)
    throw err;
  }
}