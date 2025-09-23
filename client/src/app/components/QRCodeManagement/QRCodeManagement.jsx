"use client";

import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

function QRCodeManagement({ qrData }) {
  const [formData, setFormData] = useState({});
  const [qrCodeValue, setQrCodeValue] = useState(qrData || "");
  const qrRef = useRef();

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Generate QR and send to backend
  const handleGenerate = async () => {
    const payload = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    // Set QR Code value (frontend preview)
    setQrCodeValue(JSON.stringify(payload));

    // Send to backend
    try {
      const response = await fetch("/api/qrcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to send data to backend");

      const result = await response.json();
      console.log("✅ Data saved successfully:", result);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  // 🔹 Download QR Code
  const handleDownload = (format) => {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL(format === "png" ? "image/png" : "image/svg+xml");
    const link = document.createElement("a");
    link.href = url;
    link.download = `qr-code.${format}`;
    link.click();
  };

  // 🔹 Print QR Code
  const handlePrint = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const img = canvas.toDataURL("image/png");
    const win = window.open();
    win.document.write(`<img src="${img}" onload="window.print();window.close()" />`);
    win.document.close();
  };

  // 🔹 Bulk Generate
  const handleBulkGenerate = () => {
    const payload = {
      ...formData,
      bulk: true,
      generatedAt: new Date().toISOString(),
    };
    console.log("Bulk Generate Payload:", payload);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Panel: Form */}
      <div className="col-span-2 bg-white p-6 rounded-lg shadow space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">QR Code Generation Interface</h2>
          <p className="text-gray-600 text-sm">
            Create, distribute, and control the lifecycle of attendance QR codes.
          </p>
        </div>

        {/* Class Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Associated Class/Event Selector
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            value={formData.classSelector || ""}
            onChange={(e) => handleChange("classSelector", e.target.value)}
            required
          >
            <option value="">Select Class or Event</option>
            <option value="Math Grade 8A Period 3">Math Grade 8A Period 3</option>
            <option value="Science Grade 9B">Science Grade 9B</option>
            <option value="History Grade 10A">History Grade 10A</option>
          </select>
        </div>

        {/* Session Duration */}
        <div>
          <h3 className="text-base font-semibold text-gray-700 mb-2">Session Duration Settings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Standard Duration
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                value={formData.standardDuration || ""}
                onChange={(e) => handleChange("standardDuration", e.target.value)}
              >
                <option value="">Select</option>
                <option value="15 minutes">15 minutes</option>
                <option value="30 minutes">30 minutes</option>
                <option value="45 minutes">45 minutes</option>
                <option value="60 minutes">60 minutes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custom Duration (minutes)
              </label>
              <input
                type="number"
                placeholder="e.g., 45"
                value={formData.customDuration || ""}
                onChange={(e) => handleChange("customDuration", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 mt-3 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={formData.autoExpire || false}
              onChange={(e) => handleChange("autoExpire", e.target.checked)}
              className="h-4 w-4 text-blue-500"
            />
            Auto-Expire After First Scan
          </label>
        </div>

        {/* Validity Period */}
        <div>
          <h3 className="text-base font-semibold text-gray-700 mb-2">Validity Period Controls</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date/Time
              </label>
              <input
                type="datetime-local"
                value={formData.startDate || ""}
                onChange={(e) => handleChange("startDate", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date/Time
              </label>
              <input
                type="datetime-local"
                value={formData.endDate || ""}
                onChange={(e) => handleChange("endDate", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                required
              />
            </div>
          </div>

          {/* Days of Week */}
          <div className="flex gap-3 mt-3">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
              <label key={day} className="flex items-center gap-1 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={(formData.days || []).includes(day)}
                  onChange={(e) => {
                    const selected = new Set(formData.days || []);
                    e.target.checked ? selected.add(day) : selected.delete(day);
                    handleChange("days", Array.from(selected));
                  }}
                />
                {day}
              </label>
            ))}
          </div>
        </div>

        {/* Bulk Generate */}
        <button
          type="button"
          className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600"
          onClick={handleBulkGenerate}
        >
          Bulk Generate for Classes/Events
        </button>
      </div>

      {/* Right Panel: QR Code Preview */}
      <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center space-y-4">
        <h3 className="text-base font-semibold text-gray-700">QR Code Preview</h3>
        <div ref={qrRef} className="p-4 border rounded-lg bg-gray-50">
          {qrCodeValue ? (
            <QRCodeCanvas value={qrCodeValue} size={160} />
          ) : (
            <p className="text-gray-400 text-sm">No QR Code Generated</p>
          )}
        </div>

        {/* Buttons */}
        <button
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600"
          onClick={handleGenerate}
        >
          Generate QR Code
        </button>
        <div className="flex w-full gap-2">
          <button
            className="w-1/2 border px-4 py-2 rounded-lg text-sm font-medium"
            onClick={() => handleDownload("png")}
          >
            PNG
          </button>
          <button
            className="w-1/2 border px-4 py-2 rounded-lg text-sm font-medium"
            onClick={() => handleDownload("svg")}
          >
            SVG
          </button>
        </div>
        <button
          className="w-full border px-4 py-2 rounded-lg text-sm font-medium"
          onClick={handlePrint}
        >
          Print QR Code
        </button>
      </div>
    </div>
  );
}

export default QRCodeManagement;
