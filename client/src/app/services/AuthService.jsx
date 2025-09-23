import { showToast } from "../utils/Toast";

export const authenticateUser = async (mode, role, fields) => {
    console.log("Authenticating", mode, role, fields);
  try {
    const response = await fetch(`http://localhost:5000/auth/${mode}`, {
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
