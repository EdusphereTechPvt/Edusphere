import { showToast } from "../utils/Toast";
import api from "./MiddlewareService";

export const authenticateUser = async (mode, role, fields) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/${mode}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role, ...fields }),
    });

    const data = await response.json();

    if (!response.ok || !data.status) {
      showToast(data.message || "Authentication failed", "error");
      return false;
    }

    showToast(data.message, "success");
    return true;
  } catch (error) {
    console.error("Authentication error:", error);
    showToast("Something went wrong. Please try again.", "error");
    return false;
  }
};


export const isUserAvailable = async (params) => {
  try{
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/search`,{
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ params }),
    })

    const data = await response.json();

    if(!data.status){
      showToast(data.message, "error")
      return false;
    }

    showToast("User verified successfully", "success");
    return data.status
  }
  catch(err){
    showToast("Error Fetching User", "error")
    return false;
  }
}

export const updatePassword = async(email, password) => {
  try{
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/changepassword`,{
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json();

    if(!data.status){
      showToast(data.message, "error")
      return false;
    }

    showToast("Password updated successfully", "success");
    return data.status
  }
  catch(err){
    showToast("Error Updating Password", "error")
    return false;
  }
}

export const ping = async (page) => {
  try {
    const response = await api.post(
      `/ping`,
      {},
      {
        headers: { "x-page": page },
        withCredentials: true
      }
    );
    
    if (!response.data.status) {
      showToast("Unauthorized, please login", "error");
      throw new Error("Unauthorized");
    }

    showToast("Connected & authorized", "success");
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        showToast("Unauthorized, please login", "error");
      } else {
        showToast(`Server error (${error.response.status})`, "warning");
      }
    } else if (error.request) {
      showToast("You are offline", "warning");
    } else {
      showToast("Unexpected error", "warning");
    }

    console.error("Ping Error:", error);
    return null;
  }
};
