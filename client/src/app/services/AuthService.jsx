import { showToast } from "../utils/Toast";

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