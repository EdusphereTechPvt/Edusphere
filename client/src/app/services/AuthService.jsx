import { signInWithPopup } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { showToast } from "../utils/Toast";
import api from "./MiddlewareService";
import { setConnectionStatus, setLogout } from "../store/AuthSlice";
import store from "../store";

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
    console.log(data)
    showToast(data.message, "success");
    return true;
  } catch (error) {
    console.error("Authentication error:", error);
    showToast("Something went wrong. Please try again.", "error");
    return false;
  }
};

export const handleOAuthLogin = async (provider) => {
  const result = await signInWithPopup(auth, provider);
  const token = await result.user.getIdToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/oauth`, {
    method: 'POST',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token })
  })

  const data = await res.json();
  console.log(data)

  if (!data.status) {
    showToast(data.message || "Error while logging in", "error");
    return false;
  }


  showToast(data.message, "success")
  return true;
};

export const isUserAvailable = async (params) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/search`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ params }),
    })

    const data = await response.json();

    if (!data.status) {
      showToast(data.message, "error")
      return false;
    }

    const sendEmailRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/sendEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: "RESET_PASSWORD",
        data: {
          id: data.data._id
        }
      })
    })

    if(!sendEmailRes){
      showToast(sendEmailRes.message, "error")
    }

    showToast(sendEmailRes.message, "success");
    return data.status && sendEmailRes.status
  }
  catch (err) {
    showToast("Error Fetching User", "error")
    return false;
  }
}

export const verifyTemporaryToken = async (token) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/verifytoken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();

    if (!data.status) {
      showToast(data.message, "error");
      return null;
    }

    showToast("Token verified successfully", "success");
    return data.userId;
  } catch (err) {
    console.error("Error verifying token:", err);
    showToast("Error verifying token", "error");
    return null;
  }
};

export const updatePassword = async (userId, password, token) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/changepassword`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, password, token }),
    })

    const data = await response.json();

    if (!data.status) {
      showToast(data.message, "error")
      return false;
    }

    showToast("Password updated successfully", "success");
    return data.status
  }
  catch (err) {
    showToast("Error Updating Password", "error")
    return false;
  }
}

export const logout = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json();

    if (!data.status) {
      showToast(data.message, "error")
      return false;
    }

    showToast(data.message, "success");
    store.dispatch(setConnectionStatus("disconnected"));
    store.dispatch(setLogout());
    return data.status
  }
  catch (err) {
    showToast("Error Updating Password", "error")
    return false;
  }
}

export const ping = async (page, isProtected) => {
  try {
    store.dispatch(setConnectionStatus("connecting"));
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/ping`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page }),
    });

    if (!response.status) {
      store.dispatch(setConnectionStatus("disconnected"));
      throw new Error("Unauthorized");
    }

    store.dispatch(setConnectionStatus("connected"));
    return response.status;
  } catch (error) {
    store.dispatch(setConnectionStatus("disconnected"));
    if (isProtected) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          console.error(error)
        }
      }
    }
    if (isProtected || (error.response && error.response.status !== 401)) {
      console.error("Ping Error:", error);
    }
    console.error("Ping failed:", error);
    return false;
  }
};
