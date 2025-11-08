import { showToast } from "../utils/Toast";
import api from "./MiddlewareService";

export const addOrUpdate = async (payload) => {
  try {
    const response = await api.post("/qr/add", payload, {
      headers: { "x-page": `/qrCode` },
      withCredentials: true,
    });

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

export const downloadQr = async (sessionId) => {
  try {
    const response = await api.post(
      "/qr/getQr",
      { sessionId: sessionId, mode: "download" },
      {
        headers: { "x-page": "/qrCode" },
        responseType: "blob",
        withCredentials: true,
      }
    );

    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    const isZip = response.headers["content-type"].includes("zip");
    link.href = url;
    link.download = isZip ? `qr-codes.zip` : `qr-code.png`;
    link.click();
    window.URL.revokeObjectURL(url);

    showToast("QR Downloaded Successfully", "success");
  } catch (error) {
    console.error("QR download failed:", error);
    showToast("Failed to download QR", "error");
  }
};

export const printQr = async (sessionId) => {
  try {
    const toastId = showToast(
      "Preparing QRs for print...",
      "pending",
      "top-right",
      null,
      true
    );
    const res = await api.post(
      "/qr/getQr",
      { sessionId: sessionId, mode: "print" },
      {
        headers: { "x-page": "/qrCode" },
        // responseType: "blob",
        withCredentials: true,
      }
    );

    let imgs = [];
    if (Array.isArray(res.data?.data)) {
      imgs = res.data.data;
    } else if (res.data?.data) {
      imgs = [res.data.data];
    } else if (
      res.data &&
      typeof res.data === "string" &&
      res.data.startsWith("data:image")
    ) {
      imgs = [res.data];
    }
    console.log(imgs);

    if (!res.data?.status || !imgs.length)
      return showToast(
        "No printable QRs received",
        "error",
        "top-right",
        toastId,
        false
      );

    const printWin = window.open("", "_blank");
    printWin.document.write("<html><body style='text-align:center;'>");
    for (const imgUrl of imgs) {
      printWin.document.write(
        `<div style="page-break-after: always;">
          <img src="${imgUrl}" style="max-width:90%;margin:20px 0;" />
        </div>`
      );
    }
    printWin.document.write("</body></html>");
    printWin.document.close();

    printWin.onload = () => {
      printWin.focus();
      printWin.print();
      printWin.close();
      showToast(
        "QR(s) printed successfully",
        "success",
        "top-right",
        toastId,
        false
      );
    };
  } catch (error) {
    console.error("QR print failed:", error);
    showToast("Failed to print QR(s)", "error");
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
    const response = await api.post(
      "/qr/get",
      {},
      {
        headers: { "x-page": `/qrCode` },
        withCredentials: true,
      }
    );

    if (!response.data.status) {
      showToast("Failed to fetch sessions", "error");
      return [];
    }

    // // STEP 1: Simplify data
    // const allSessions = response.data.data.map((s) => ({
    //   sessionId: s.sessionId,
    //   sessionName: s.sessionName,
    //   sessionType: s.sessionType,
    //   expired: s.expired,
    //   startDate: s.startDate,
    //   endDate: s.endDate,
    //   duration: s.duration,
    // }));

    // STEP 2: Remove duplicates based on sessionId
    const uniqueMap = new Map();
    response.data.data.forEach((s) => {
      if (!uniqueMap.has(s.sessionId)) {
        uniqueMap.set(s.sessionId, s);
      }
    });

    // STEP 3: Return unique list
    const uniqueSessions = Array.from(uniqueMap.values());
    return uniqueSessions;
  } catch (error) {
    console.error("Error fetching sessions:", error);
    showToast("Error fetching sessions", "error");
    return [];
  }
};
