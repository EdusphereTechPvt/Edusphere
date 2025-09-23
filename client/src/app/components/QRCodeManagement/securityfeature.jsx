"use client";

import { useState } from "react";

function SecurityFeature() {
  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-md w-full bg-white shadow rounded-xl p-5 space-y-6">
      <h2 className="text-gray-800 font-semibold text-2xl">Security Features</h2>

      {/* QR Code Expiration */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          QR Code Expiration (minutes)
        </label>
        <input
          type="text"
          name="QRCodeExpiration"
          placeholder="e.g., 5"
          value={formData.QRCodeExpiration || ""}
          onChange={(e) => handleChange("QRCodeExpiration", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 text-sm bg-white shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none hover:border-gray-400 transition"
        />
      </div>

      {/* Unique Session Code */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Unique Session Code
        </label>
        <input
          type="text"
          name="UniqueSessionCode"
          placeholder="Auto-generated or manual"
          value={formData.UniqueSessionCode || ""}
          onChange={(e) => handleChange("UniqueSessionCode", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none hover:border-gray-400 transition"
        />
      </div>

      {/* Encryption Status */}
      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-green-50">
        <span>🛡️</span>
        <div>
          <p className="text-sm text-gray-700 font-medium">Encryption Status</p>
          <p className="text-green-600 font-semibold">Enabled (AES-256)</p>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={() => console.log("View Access Logs")}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-400 text-gray-800 text-md font-medium hover:bg-gray-200 transition"
      >
        View Access Logs
      </button>
    </div>
  );
}

export default SecurityFeature;
