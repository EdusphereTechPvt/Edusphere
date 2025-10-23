import { showToast } from "../utils/Toast";
import api from "./MiddlewareService";

export const getUsers = async () => {
    try {
        const response = await api.post(`/user/getAll`, {}, {
            headers: { "x-page": `/manage` },
            withCredentials: true
        })

        if (!response.data.status) {
            showToast(response.data.message || "Failed to fetch list details", "error")
        }

        showToast(response.data.message || "Data Fetched Successfully", "success")
        return response.data.data;
    }
    catch (error) {
        showToast("Failed to fetch user details", "error")
        console.error("Error fetching user details:", error);
        throw error;
    }
}