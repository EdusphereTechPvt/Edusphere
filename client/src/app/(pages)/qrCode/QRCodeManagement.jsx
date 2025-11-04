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
import { addOrUpdate } from "@/app/services/QrService";

function QRCodeManagement({ onGenerate, result, data = {} }) {
  const qrRef = useRef();
  const [formData, setFormData] = useState({});
  const [doesExist, setDoesExist] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [isDownloadReady, setIsDownloadReady] = useState(false);
  const [options, setOptions] = useState([]);

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
    if (result?.data) {
      setQrCodeValue(JSON.stringify(result.data));
      setIsDownloadReady(true);
    }
  }, [result]);

  const handleChange = useCallback((name, value) => {
    if (typeof value === "string") value = value.trim();
    // if (name === "type") {
    //   if (!value) {
    //     showToast("Type is required (Resetting to Class)", "warning");
    //     return setFormData((prev) => ({ ...prev, type: "Class" }));
    //   }
    //   return setFormData((prev) => ({ ...prev, type: value }));
    // }
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleDownload = useCallback((format) => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return showToast("QR code not available", "warning");

    const link = document.createElement("a");
    link.href = canvas.toDataURL(
      format === "png" ? "image/png" : "image/svg+xml"
    );
    link.download = `qr-code.${format}`;
    link.click();
  }, []);

  const handlePrint = useCallback(() => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return showToast("QR code not available", "warning");

    const img = canvas.toDataURL("image/png");
    const win = window.open("", "_blank");
    win.document.write(
      `<img src="${img}" onload="window.print();window.close();" />`
    );
  }, []);

  const handleBulkGenerate = async () => {
    try {
      const payload = {
        sessionType: formData.type.toLowerCase(),
        sessionName: formData.sessionName?.trim().toLowerCase(),
        startDate: formData.startDate?.toISOString(),
        endDate: formData.endDate?.toISOString(),
        duration: formData.duration,
        autoExpire: formData.autoExpire || false,
        expired: false,
        ...(formData.type === "Class"
          ? { associatedClass: formData.associated }
          : { associatedEvent: formData.associated }),
      };
      const required = [
        "sessionName",
        "sessionType",
        "startDate",
        "endDate",
        "duration",
       formData.type === "Class" ? "associatedClass" : "associatedEvent",
      ];
      const missing = required.filter((f) => !payload[f]);
      if (missing.length > 0) {
        return showToast(`Please fill ${missing.join(", ")}`, "warning");
      }
      // showToast("...Processing", "pending")
      const res = await addOrUpdate(payload); //
      if (res?.data) {
        showToast("QR generated successfully!", "success");
        setQrCodeValue(JSON.stringify(res.data));
        setIsDownloadReady(true);
      } else {
        setIsDownloadReady(false);
        showToast("Failed to generate QR", "error");
      }
    } catch (error) {
      console.error("QR generation error:", error);
      showToast("Error while generating QR", "error");
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
            <Typography variant="p" sx={{fontSize: {xs: "0.75em", lg:"1rem"}}} className="text-gray-600 ">
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
                    items: data?.event || options || [],
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
                    value={formData["Event Selector"] || ""}
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
                items: data?.class || options || [],
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
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center xs:w-full lg:w-1/3 space-y-4">
          <h3 className="text-base font-semibold text-gray-700">
            QR Code Preview
          </h3>
          <div
            ref={qrRef}
            className="p-4 border rounded-lg bg-gray-50 w-full flex justify-center items-center min-h-[16rem] lg:min-h-[23.9rem]"
          >
            {qrCodeValue ? (
              <QRCodeCanvas value={qrCodeValue} size={250} />
            ) : (
              <p className="text-gray-400 text-sm">No QR Code Generated</p>
            )}
          </div>

          <div className="flex w-full gap-2">
            {["png", "svg"].map((name, idx) => (
              <Button
                key={idx}
                onClick={() => handleDownload(name)}
                variant="outlined"
                startIcon={<Download />}
                disabled={!isDownloadReady}
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
                  width: "50%",
                }}
              >
                {name.toUpperCase()}
              </Button>
            ))}
          </div>

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
  );
}

export default QRCodeManagement;
