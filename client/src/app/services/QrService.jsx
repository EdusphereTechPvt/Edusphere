import { showToast } from "../utils/Toast";
import api from "./MiddlewareService";

export const addOrUpdate = async (payload) => {
  try {
    const response = await api.post("/qr/add", payload, {
      headers: { "x-page": `/qr/add` },
      withCredentials: true
    }); //send x page /qr/get  /qr

    if (!response.data.status) {
      showToast("Failed to save QR session", "error");
      throw new Error(response.data.message);
    }

    showToast("QR session saved successfully", "success");
    return response.data;
  } catch (error) {
    console.error("Error sending QR session:", error);
    showToast("Error saving QR session", "error");
    throw error;
  }
};

export const fetchData = async (path, query = {}) => {
  try {
    const response = await api.post(path, query);

    if (!response.data.status) {
      showToast("Failed to fetch data", "error");
      throw new Error(response.data.message);
    }

    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    showToast("Error fetching data", "error");
    throw error;
  }
};

export const fetchSessions = async () => {
  try {
    const response = await api.post("/qr/get", {});

    if (!response.data.status) {
      showToast("Failed to fetch sessions", "error");
      return [];
    }

    return response.data.data;
  } catch (error) {
    console.error("Error fetching sessions:", error);
    showToast("Error fetching sessions", "error");
    return [];
  }
};
