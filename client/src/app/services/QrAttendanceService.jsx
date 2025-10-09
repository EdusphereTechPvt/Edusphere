import api from "./MiddlewareService";

export const getSessions = async () => {
  try {
    const response = await api.post("/qr/search", {});
    if (!response.data.status) {
      showToast(response.data.message || "Failed to fetch Sessions", "error");
    }

    showToast(
      response.data.message || "Sessions Fetched Successfully",
      "success"
    );
    return response.data;
  } catch (error) {
    showToast("Failed to fetch Sessions", "error");
    console.error("Error fetching Sessions:", error);
    throw error;
  }
};
