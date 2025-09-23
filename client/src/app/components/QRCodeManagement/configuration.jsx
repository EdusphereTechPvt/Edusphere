"use client";

function ConfigurationPanel() {
// function for each button onclick
const handleAttendanceRules = () => {
  console.log("Attendance Rules & Thresholds");
};

const handleAlertSettings = () => {
  console.log("Alert Settings");
};

const handleSyncFrequency = () => {
  console.log("Sync Frequency Settings");
};

const handleDataRetention = () => {
  console.log("Data Retention Policies");
};

  return (
    <div className="max-w-md w-full bg-white shadow rounded-xl p-5 space-y-4">
      <h2 className="text-gray-800 font-semibold text-2xl">Configuration Panel</h2>

      {/* Menu Buttons */}
      <button
        type="button"
        onClick={handleAttendanceRules}
        className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg text-gray-700 text-md font-medium bg-gray-100 hover:bg-gray-200 transition"
      >
        <span>📊</span>
        Attendance Rules & Thresholds
      </button>

      <button
        type="button"
        onClick={handleAlertSettings}
        className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg text-gray-700 text-md font-medium bg-gray-100 hover:bg-gray-200 transition"
      >
        <span>🔔</span>
        Alert Settings
      </button>

      <button
        type="button"
        onClick={handleSyncFrequency}
        className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg text-gray-700 text-md font-medium bg-gray-100 hover:bg-gray-200 transition"
      >
        <span>⏱️</span>
        Sync Frequency Settings
      </button>

      <button
        type="button"
        onClick={handleDataRetention}
        className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg text-gray-700 text-md font-medium bg-gray-100 hover:bg-gray-200 transition"
      >
        <span>🗄️</span>
        Data Retention Policies
      </button>
    </div>
  );
}

export default ConfigurationPanel;
