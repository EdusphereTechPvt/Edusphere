import api from "./MiddlewareService";
import { showToast } from "../utils/Toast";

export const scanQRCode = async (qrCode) => {
  try {
    const response = await api.post(
      `/qr/scan`,
      {},
      {
        headers: { "x-page": `/scanner` },
        withCredentials: true,
      }
    );

    if (!response.data.status) {
      showToast(
        response.data.message || "Failed to fetch list details",
        "error"
      );
    }

    showToast(response.data.message || "Data Fetched Successfully", "success");
    return response.data;
  } catch (error) {}
};

export const getLogs = async ({ page = 1, limit = 10, sessionId, userId }) => {
  try {
    const queryParams = new URLSearchParams({ page, limit });
    if (sessionId) queryParams.append("sessionId", sessionId);
    if (userId) queryParams.append("userId", userId);

    const res = await api.post(`qr/getAll?${queryParams.toString()}`);
    if (!res.data.status) {
      showToast(res.data.message || "Failed to fetch Log details", "error");
    }
    showToast(res.data.message || "Data Fetched Successfully", "success");
    return res.data;
  } catch (error) {
    showToast("Failed to fetch Log details", "error");
    console.error("Error fetching Log details:", error);
    throw error;
  }
};

export const deleteLog = async (logId) => {
  try {
    const response = await api.post(
      `qr/delete`,
      { logId },
      {
        headers: { "x-page": `/scanner` },
        withCredentials: true,
      }
    );
    showToast(
      response.data.message,
      response.data.status ? "success" : "error"
    );
    return response.data.status;
  } catch (error) {}
};
