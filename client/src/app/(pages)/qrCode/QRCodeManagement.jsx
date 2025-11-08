"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Download, Print } from "@mui/icons-material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Dropdown from "@/app/components/Dropdown/Dropdown";
import DateTimePicker from "@/app/components/DateTimePicker/DateTimePicker";
import { showToast } from "@/app/utils/Toast";
import { fetchDistinctValues } from "@/app/services/UtilityService";
import { addOrUpdate, downloadQr, printQr } from "@/app/services/QrService";
function QRCodeManagement() {
  const qrRef = useRef();
  const [formData, setFormData] = useState({});
  const [doesExist, setDoesExist] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [isDownloadReady, setIsDownloadReady] = useState(false);
  const [options, setOptions] = useState([]);
  const [response, setResponse] = useState();

  useEffect(() => {
    const fetchDistinct = async () => {
      if (!formData.type || (formData.type === "Event" && doesExist === false))
        return;
      try {
        const res = await fetchDistinctValues(
          {
            fieldName: "name",
            collectionName: formData.type.toLowerCase(),
            filter: { view: { isAvailable: true } },
          },
          formData,
          "/qr/get"
        );
        if (res.distinctValues.length <= 0)
          showToast(`There is no existing ${formData.type}s`, "warning");
        setOptions(res.distinctValues || []);
      } catch (err) {
        console.error("Error fetching distinct values:", err);
      }
    };

    fetchDistinct();
  }, [formData.type, doesExist]);

  useEffect(() => {
    if (response) {
      setQrCodeValue(JSON.stringify(response));
      setIsDownloadReady(true);
    }
  }, [response]);

  const handleChange = useCallback((name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleDownload = useCallback(async () => {
    if (!response || response.length === 0)
      return showToast("No QR data to download", "warning");

    const qrArray = Array.isArray(response) ? response : [response];
    const sessionIds = qrArray.map((r) => r.sessionId).filter(Boolean);
    if (!sessionIds.length) return showToast("Session IDs missing", "warning");

    await downloadQr(sessionIds);
  }, [response]);

  const handlePrint = useCallback(async () => {
    if (!response || response.length === 0)
      return showToast("No QR data available", "warning");

    const qrArray = Array.isArray(response) ? response : [response];
    const sessionIds = qrArray.map((r) => r.sessionId).filter(Boolean);
    if (!sessionIds.length) return showToast("Session IDs missing", "warning");

    await printQr(sessionIds);
  }, [response]);

  const handleBulkGenerate = async () => {
    let toastId;
    try {
      const sessionType = formData.type?.toLowerCase();
      const payload = {
        sessionType,
        sessionName: formData.sessionName?.trim(),
        startDate: formData.startDate?.toISOString(),
        endDate: formData.endDate?.toISOString(),
        duration: formData.duration,
        autoExpire: formData.autoExpire || false,
        expired: false,
        ...(sessionType === "class"
          ? { associatedClass: formData.associated }
          : { associatedEvent: formData.associated }),
      };

      const required = [
        "sessionName",
        "sessionType",
        "startDate",
        "endDate",
        "duration",
        sessionType === "class" ? "associatedClass" : "associatedEvent",
      ];
      const missing = required.filter((f) => !payload[f]);
      if (missing.length > 0) {
        return showToast(`Please fill ${missing.join(", ")}`, "warning");
      }

      toastId = showToast(
        "Generating QR codes...",
        "pending",
        "top-right",
        null,
        true
      );

      const res = await addOrUpdate(payload);

      if (res?.data) {
        const qrDataArray = Array.isArray(res.data) ? res.data : [res.data];

        setResponse(qrDataArray);
        setIsDownloadReady(true);
        setFormData({})

        showToast(
          "QRs generated successfully!",
          "success",
          "top-right",
          toastId,
          false
        );
      } else {
        setIsDownloadReady(false);
        showToast(
          "Failed to generate QR",
          "error",
          "top-right",
          toastId,
          false
        );
      }
    } catch (error) {
      console.error("QR generation error:", error);
      showToast(
        "Error while generating QR",
        "error",
        "top-right",
        toastId,
        false
      );
      setIsDownloadReady(false);
    }
  };

  return (
    <div className="pb-6">
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
          fontSize: {
            xs: "1.1rem",
            sm: "1.18rem",
            md: "1.2rem",
            lg: "1.35rem",
          },
          mb: 2,
          color: "text.primary",
        }}
      >
        QR Code Management
      </Typography>

      <div className="flex flex-col lg:flex-row gap-6 w-ful">
        <form className="flex-1 bg-white p-6 rounded-lg shadow space-y-6">
          <div>
            <h2 className="xs:text-lg md:text-xl font-semibold text-gray-800 mb-1">
              QR Code Generation Interface
            </h2>
            <Typography
              variant="p"
              sx={{ fontSize: { xs: "0.75em", lg: "1rem" } }}
              className="text-gray-600 "
            >
              Create, distribute, and control the lifecycle of attendance QR
              codes.
            </Typography>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <div className="w-1/2">
              <Dropdown
                data={{
                  label: "Session Type",
                  items: [
                    { id: "Event", value: "Event" },
                    { id: "Class", value: "Class" },
                  ],
                  placeholder: "Select Session Type",
                }}
                onSelect={(type) => handleChange("type", type)}
                value={formData.type}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Session Name
              </label>
              <TextField
                label="Enter Session Name"
                placeholder="e.g., Annual Day"
                value={formData["sessionName"] || ""}
                onChange={(e) => handleChange("sessionName", e.target.value)}
                size="small"
                variant="outlined"
                fullWidth
              />
            </div>
          </div>
          {formData.type === "Event" ? (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={doesExist}
                    onChange={() => setDoesExist((prev) => !prev)}
                    size="small"
                  />
                }
                label={
                  <Typography fontSize="0.875rem" color="text.secondary">
                    Does Event Exist?
                  </Typography>
                }
                sx={{ mt: -2, mb: -0.2 }}
              />

              {doesExist ? (
                <Dropdown
                  value={formData["Event Selector"] || ""}
                  data={{
                    label: "Associated Event Selector",
                    placeholder: "Select Event",
                    items: options || [],
                  }}
                  onSelect={(v) => handleChange("associated", v)}
                />
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Associated Event Name
                  </label>
                  <TextField
                    label="Enter Event Name"
                    placeholder="e.g., Annual Day"
                    value={formData["associated"] || ""}
                    onChange={(e) => handleChange("associated", e.target.value)}
                    fullWidth
                    size="small"
                    variant="outlined"
                  />
                </div>
              )}
            </>
          ) : (
            <Dropdown
              value={formData["associated"] || ""}
              data={{
                label: "Associated Class Selector",
                placeholder: "Select Class",
                items: options || [],
              }}
              onSelect={(v) => handleChange("associated", v)}
            />
          )}

          {/* Duration Section */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-gray-700">
              Session Duration Settings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Dropdown
                data={{
                  label: "Standard Duration",
                  placeholder: "Select Duration",
                  items: [
                    { id: 15, value: "15 minutes" },
                    { id: 20, value: "20 minutes" },
                    { id: 25, value: "25 minutes" },
                    { id: 30, value: "30 minutes" },
                  ],
                }}
                value={
                  formData.durationSource === "dropdown"
                    ? formData.duration
                    : ""
                }
                onSelect={(item) => {
                  if (!item) {
                    handleChange("duration", "");
                    handleChange("durationSource", "");
                  } else {
                    handleChange("duration", item);
                    handleChange("durationSource", "dropdown");
                  }
                }}
                disabled={formData.durationSource === "custom"}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Duration (minutes)
                </label>
                <TextField
                  label="Enter Custom Duration"
                  type="number"
                  placeholder="e.g., 45"
                  value={
                    formData.durationSource === "custom"
                      ? formData.duration || ""
                      : ""
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!val) {
                      handleChange("duration", "");
                      handleChange("durationSource", "");
                    } else {
                      handleChange("duration", parseInt(val));
                      handleChange("durationSource", "custom");
                    }
                  }}
                  fullWidth
                  size="small"
                  InputProps={{ inputProps: { min: 0 } }}
                  variant="outlined"
                  disabled={formData.durationSource === "dropdown"}
                />
              </div>
            </div>

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.autoExpire || false}
                  onChange={(e) => handleChange("autoExpire", e.target.checked)}
                  size="small"
                />
              }
              label={
                <Typography fontSize="0.875rem" color="text.secondary">
                  Auto-Expire After First Scan
                </Typography>
              }
            />
          </div>

          {/* Date Pickers */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-gray-700">
              Validity Period Controls
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <DateTimePicker
                label="Start Date & Time"
                value={formData.startDate || null}
                onChange={(value) => handleChange("startDate", value)}
                disablePast
              />
              <DateTimePicker
                label="Select End Date & Time"
                value={formData.endDate || null}
                onChange={(value) => handleChange("endDate", value)}
                minDateTime={formData.startDate}
                disabled={!formData.startDate}
              />
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleBulkGenerate}
            fullWidth
            variant="contained"
            startIcon={<ContentCopyIcon />}
            sx={{
              justifyContent: "center",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              py: 1.2,
            }}
          >
            Generate for {formData.type}
          </Button>
        </form>

        {/* Right QR Preview Section */}
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center xs:w-full lg:w-[30%] space-y-4">
          <h3 className="text-base font-semibold text-gray-700">
            QR Code Preview
          </h3>
          <div
            ref={qrRef}
            className="p-4 border rounded-lg bg-gray-50 w-full flex justify-center items-center min-h-[16rem] lg:min-h-[25.7rem]"
          >
            {qrCodeValue ? (
              <QRCodeCanvas
                value={response[0]}
                size={200}
              />
            ) : (
              <p className="text-gray-400 text-sm">No QR Code Generated</p>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Button
              onClick={() => handleDownload()}
              variant="outlined"
              startIcon={<Download />}
              disabled={!isDownloadReady}
              fullWidth
              sx={{
                textTransform: "none",
                backgroundColor: "#e2e8f0",
                fontWeight: 600,
                color: "grey.800",
                border: "none",
                borderRadius: 2,
                justifyContent: "center",
                "&:hover": { backgroundColor: "#cbd5e1" },
                py: 1.1,
                px: 2,
              }}
            >
              {/* {name.toUpperCase()} */} Download
            </Button>

            <Button
              onClick={handlePrint}
              variant="outlined"
              startIcon={<Print />}
              disabled={!isDownloadReady}
              fullWidth
              sx={{
                textTransform: "none",
                backgroundColor: "#e2e8f0",
                fontWeight: 600,
                color: "grey.800",
                border: "none",
                borderRadius: 2,
                justifyContent: "center",
                "&:hover": { backgroundColor: "#cbd5e1" },
                py: 1.2,
              }}
            >
              Print QR Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRCodeManagement;
