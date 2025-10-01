import QRCodeManagement from "@/app/(pages)/qrCode/QRCodeManagement";
import SystemOverview from "@/app/(pages)/qrCode/systemoverview";
import SecurityFeature from "@/app/(pages)/qrCode/securityfeature";
import ConfigurationPanel from "@/app/(pages)/qrCode/configuration";
import ActiveQR from "@/app/(pages)/qrCode/active_qr_codes";
import CheckinHistory from "@/app/(pages)/qrCode/checkinhistory";
import { Box, Typography } from "@mui/material";

export default function Page() {
  // Sample data
  const sessions = [
    { name: "Math 101 - Section A", location: "Auditorium 1", active: true },
    { name: "Physics 202 - Lab", location: "Science Lab 3", active: true },
    { name: "History 301", location: "Room 204", active: false },
    { name: "Chemistry 201", location: "Lab 5", active: false },
  ];

  const logs = [
    { user: "John Doe", type: "in", session: "Math 101", time: "08:02 AM" },
    {
      user: "Jane Smith",
      type: "out",
      session: "Physics 202",
      time: "08:00 AM",
    },
    { user: "Peter Jones", type: "in", session: "Math 101", time: "07:59 AM" },
    {
      user: "Mary Williams",
      type: "in",
      session: "Physics 202",
      time: "07:58 AM",
    },
    {
      user: "Alice Brown",
      type: "in",
      session: "History 301",
      time: "07:50 AM",
    },
    {
      user: "Bob Johnson",
      type: "out",
      session: "Chemistry 201",
      time: "07:45 AM",
    },
  ];

  return (
    <div className="py-8 px-4 lg:px-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" }, // column on small screens, row on large
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", lg: "center" },
          mb: 4,
        }}
      >
        {/* Title and breadcrumb */}
        <Box sx={{ mb: { xs: 1, lg: 0 } }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "text.primary",
              fontSize: { xs: "1.5rem", md: "1.8rem", lg: "2rem" },
            }}
          >
            Admin QR Code Management
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              mt: 1,
              fontSize: { xs: "0.8rem", md: "0.9rem" },
            }}
          >
            Dashboard{" "}
            <Box
              component="span"
              sx={{ color: "text.primary", fontWeight: 500 }}
            >
              / QR Code Management
            </Box>
          </Typography>
        </Box>

        {/* <Typography
          sx={{
            color: "text.secondary",
            fontSize: { xs: "0.875rem", md: "0.9rem" },
            mt: { xs: 2, lg: 0 },
            mr: { lg: 8 },
          }}
        >
          <Box component="span" sx={{ color: "success.main", fontWeight: 600 }}>
            Online
          </Box>{" "}
          &bull; Last Sync: 2 minutes ago
        </Typography> */}
      </Box>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          <SystemOverview />
          <QRCodeManagement />
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          <SecurityFeature />
          {/* <ConfigurationPanel /> */}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActiveQR sessions={sessions} />
        <CheckinHistory logs={logs} />
      </div>
    </div>
  );
}
