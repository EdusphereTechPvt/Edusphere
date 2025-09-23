import QRCodeManagement from "@/app/components/QRCodeManagement/QRCodeManagement";
import SystemOverview from "@/app/components/QRCodeManagement/systemoverview";
import SecurityFeature from "@/app/components/QRCodeManagement/securityfeature";
import ConfigurationPanel from "@/app/components/QRCodeManagement/configuration";
import ActiveQR from "@/app/components/QRCodeManagement/active_qr_codes";
import CheckinHistory from "@/app/components/QRCodeManagement/checkinhistory";

export default function Page() {

  // Sample data 
  const sessions = [
    { name: 'Math 101 - Section A', location: 'Auditorium 1', active: true },
    { name: 'Physics 202 - Lab', location: 'Science Lab 3', active: true },
    { name: 'History 301', location: 'Room 204', active: false },
    { name: 'Chemistry 201', location: 'Lab 5', active: false },
  ];

  const logs = [
    { user: 'John Doe', type: 'in', session: 'Math 101', time: '08:02 AM' },
    { user: 'Jane Smith', type: 'out', session: 'Physics 202', time: '08:00 AM' },
    { user: 'Peter Jones', type: 'in', session: 'Math 101', time: '07:59 AM' },
    { user: 'Mary Williams', type: 'in', session: 'Physics 202', time: '07:58 AM' },
    { user: 'Alice Brown', type: 'in', session: 'History 301', time: '07:50 AM' },
    { user: 'Bob Johnson', type: 'out', session: 'Chemistry 201', time: '07:45 AM' },
  ];

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-4xl font-bold text-gray-900">Admin QR Code Management</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Dashboard <span className="text-gray-700 font-medium">/ QR Code Management</span>
          </p>
        </div>
        <p className="text-gray-500 text-sm lg:mr-8">
          <span className="text-green-500 font-semibold">Online</span> &bull; Last Sync: 2 minutes ago
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          <SystemOverview />
          
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">QR Code Management</h2>
            <QRCodeManagement />
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
            <SecurityFeature />
          </div>
          <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
            <ConfigurationPanel />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
          <ActiveQR sessions={sessions} />
        </div>
        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
          <CheckinHistory logs={logs} />
        </div>
      </div>
    </div>
  );
}
