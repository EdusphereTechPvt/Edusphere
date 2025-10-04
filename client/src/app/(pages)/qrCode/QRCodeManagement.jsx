"use client";
import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Download, QrCode, Warning } from "@mui/icons-material";
import Dropdown from "@/app/components/Dropdown/Dropdown";
import DateTimePicker from "@/app/components/DateTimePicker/DateTimePicker";
import { showToast } from "@/app/utils/Toast";

function QRCodeManagement({onGenerate, result, data}) {
  console.log("data",data);
  
  const [formData, setFormData] = useState({
    type: "Event",
  });
  const [doesExist, setDoesexist] = useState("Yes");
  const [qrCodeValue, setQrCodeValue] = useState( "");
  const [isComplete, setIsComplete] = useState(false);
  const qrRef = useRef();

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDownload = (format) => {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL(
      format === "png" ? "image/png" : "image/svg+xml"
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `qr-code.${format}`;
    link.click();
  };

  const handlePrint = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const img = canvas.toDataURL("image/png");
    const win = window.open();
    win.document.write(
      `<img src="${img}" onload="window.print();window.close()" />`
    );
    win.document.close();
  };

  const handleBulkGenerate = async () => {
   const payload = {
      sessionName:
    formData.type.toLowerCase() === "event"
      ? formData[`${formData.type} Selector`]
      : `${formData.type} Session`,
      sessionType: formData.type.toLowerCase(),
      startDate: formData.startDate.toISOString(),
      endDate: formData.endDate.toISOString(),
      duration: formData.duration,
      autoExpire: formData.autoExpire || false,
      expired: false,
      associatedClass:
        formData.type.toLowerCase() === "class"
          ? parseInt(formData[`${formData.type} Selector`].match(/\d+/)?.[0] || 0, 10)
          : "",
    };
    console.log("payload", payload);
    console.log("formData", formData);

    const requiredFields = [
      "sessionName",
      "sessionType",
      "startDate",
      "endDate",
      "duration",
      "autoExpire",
    ];

    if (formData.type.toLowerCase() === "class") {
      requiredFields.push("associatedClass");
    }

    const missingFields = requiredFields.filter(
      (field) =>
        payload[field] === undefined ||
        payload[field] === null ||
        payload[field] === ""
    );

    if (missingFields.length > 3) {
      showToast("Please fill all the required fields", "warning");
    } else if (missingFields.length > 0) {
      showToast(`Please fill ${missingFields.join(", ")}`, "warning");
    }
    onGenerate?.(payload);
    try {
      setQrCodeValue(JSON.stringify(result?.data)); 
    } catch (error) {
      console.error("Error sending QR session", error);
    }
  };

  return (
    <div>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        {/* left form */}
        <form className="col-span-2 bg-white p-6 rounded-lg shadow space-y-6">
          {/* heading */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              QR Code Generation Interface
            </h2>
            <p className="text-gray-600 text-sm">
              Create, distribute, and control the lifecycle of attendance QR
              codes.
            </p>
          </div>
          <Dropdown
            data={{
              label: "Session Type",
              items: [
                { id: "Event", value: "Event" },
                { id: "Class", value: "Class" },
              ],
            }}
            onSelect={(type) => handleChange("type", type)}
            value="Event"
            style={{ inlineStyle: { mt: 0, mb: 0 } }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={doesExist}
                onChange={() => setDoesexist(!doesExist)}
                size="small"
              />
            }
            label={
              <Typography fontSize="0.875rem" color="text.secondary">
                Does {formData.type} exist?
              </Typography>
            }
          />

          {/* Conditional Dropdown or TextField */}
          {doesExist ? (
            <Dropdown
              value={formData[`${formData.type} Selector`] || ""}
              data={{
                label: `Associated ${formData?.type} Selector`,
                placeholder: `Select ${formData?.type}`,
                items: data[formData?.type?.toLowerCase()] || [],
              }}
              onSelect={(v) => handleChange(`${formData.type} Selector`, v)}
            />
          ) : (
            <>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {`Associated ${formData?.type} Name`}
              </label>
              <TextField
                label={`Enter ${formData?.type} Name`}
                placeholder="e.g., Annual Day"
                value={formData[`${formData.type} Selector`] || ""}
                onChange={(e) =>
                  handleChange(`${formData.type} Selector`, e.target.value)
                }
                fullWidth
                size="small"
                variant="outlined"
                sx={{ mb: 3 }}
              />
            </>
          )}

          {/* Session Duration */}
          <div>
            <h3 className="text-base font-semibold text-gray-700 mb-2">
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
                  handleChange("duration", item);
                  handleChange("durationSource", "dropdown");
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
                    handleChange("duration", val ? parseInt(val) : "");
                    handleChange("durationSource", "custom");
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

          {/* Validity Period */}
          <div>
            <h3 className="text-base font-semibold text-gray-700">
              Validity Period Controls
            </h3>
            <div className="flex flex-row max-sm:flex-col gap-4">
              <DateTimePicker
                label="Start Date & Time"
                value={formData.startDate || null}
                onChange={(value) => handleChange("startDate", value)}
                slotProps={{
                  textField: { fullWidth: true },
                }}
              />
              <DateTimePicker
                label="Select End Date & Time"
                value={formData.endDate || null}
                onChange={(value) => handleChange("endDate", value)}
                minDateTime={formData.startDate}
                disabled={!formData.startDate}
                slotProps={{
                  textField: { fullWidth: true },
                }}
              />
            </div>

            {/* Days of Week */}
            <div className="mt-3">
              <Typography variant="subtitle2">Days of Week</Typography>
              <FormGroup row>
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                  <FormControlLabel
                    key={day}
                    control={
                      <Checkbox
                        checked={(formData.days || []).includes(day)}
                        onChange={() => {
                          const selected = formData.days || [];
                          const newDays = selected.includes(day)
                            ? selected.filter((d) => d !== day)
                            : [...selected, day];
                          handleChange("days", newDays);
                        }}
                      />
                    }
                    label={
                      <Typography fontSize="0.88rem" color="text.secondary">
                        {day}
                      </Typography>
                    }
                  />
                ))}
              </FormGroup>
            </div>
          </div>

          {/*  Generate */}
          <Button
            onClick={handleBulkGenerate}
            fullWidth
            variant="contained"
            startIcon={<ContentCopyIcon />}
            sx={{
              justifyContent: "center",
              textTransform: "none",
              fontWeight: 600,
              border: "none",
              borderRadius: 2,
              mb: 1,
              py: 1.2,
            }}
          >
            Generate for {formData.type}
          </Button>
        </form>

        {/* QR Code Preview */}
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center w-full  space-y-4 relative ">
          <h3 className="text-base font-semibold text-gray-700">
            QR Code Preview
          </h3>
          <div
            ref={qrRef}
            className="p-4 border rounded-lg bg-gray-50 w-full lg:h-[33.7rem] h-[15rem] flex justify-center items-center"
          >
            {qrCodeValue ? (
              <QRCodeCanvas value={qrCodeValue} size={180} />
            ) : (
              <p className="text-gray-400 text-sm">No QR Code Generated</p>
            )}
          </div>

          {/* Buttons */}

          <div className="flex w-full mb-2 gap-2">
            {["png", "svg"].map((name, idx) => (
              <Button
                key={idx}
                onClick={() => handleDownload(name)}
                variant="outlined"
                startIcon={<Download />}
                disabled={!isComplete}
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
            startIcon={<Download />}
            disabled={!isComplete}
            fullWidth
            sx={{
              textTransform: "none",
              backgroundColor: "#e2e8f0",
              fontWeight: 600,
              color: "grey.800",
              border: "none",
              borderRadius: 2,
              mb: 1,
              justifyContent: "center",
              "&:hover": { backgroundColor: "#cbd5e1" },
              py: 1.2,
              px: 2,
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
