import { showToast } from "../utils/Toast";
import api from "./MiddlewareService";

export const handleFormAction = async (data, api, page = "default", options = {}) => {
  const {
    pendingMessage = "Processing...",
    successMessage = "Action completed successfully!",
    errorMessage = "Something went wrong",
    position = "top-right",
  } = options;

  let toastId;

  try {
    toastId = showToast(pendingMessage, "pending", position, null, true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}${api}`,
      {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "x-page": page
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      showToast(result.message || errorMessage, "error", position, toastId, false);
      throw new Error(result.message || "Something went wrong");
    }

    showToast(successMessage, "success", position, toastId, false);
    return result;
  } catch (error) {
    if (toastId) {
      showToast(error.message || errorMessage, "error", position, toastId, false);
    } else {
      showToast(error.message || errorMessage, "error", position);
    }
    console.error("Error in handleFormAction:", error);
    throw error;
  }
};


export const getFormData = async (route, page, id) => {
  const response = await api.post(route, {
    id: id
  }, {
    headers: { "x-page": page },
    withCredentials: true
  });

  return response.data || {};
}