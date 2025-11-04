"use client";
import QRCodeManagement from "@/app/(pages)/qrCode/QRCodeManagement";
import SystemOverview from "@/app/(pages)/qrCode/systemoverview";
import SecurityFeature from "@/app/(pages)/qrCode/securityfeature";
import ConfigurationPanel from "@/app/(pages)/qrCode/configuration";
import ActiveQR from "@/app/(pages)/qrCode/active_qr_codes";
import CheckinHistory from "@/app/(pages)/qrCode/checkinhistory";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  addOrUpdate,
  fetchData,
  fetchSessions,
} from "@/app/services/QrService";
import Dropdown from "@/app/components/Dropdown/Dropdown";

export default function Page() {
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
  const [result, setResult] = useState(null);
  const [data, setData] = useState({ session: [], logs: logs });

  const [sessions, setSessions] = useState([]); // all sessions from backend
  const [selectedSession, setSelectedSession] = useState(""); // id of selected session
  const [selectedSessionData, setSelectedSessionData] = useState(null);


  return (
    <div className="py-8 px-4 lg:px-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", lg: "center" },
          mb: 4,
          gap: 2,
        }}
      >
        <Box sx={{ mb: { xs: 1, lg: 0 } }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "text.primary",
              fontSize: { xs: "1.5rem", md: "1.8rem", lg: "2rem" },
              whiteSpace: "nowrap",
            }}
          >
            Admin QR Code Management
          </Typography>
        </Box>

        <Box sx={{ width: { xs: 150, md: 250 } }}>
          <Dropdown
            value=""
            data={{
              placeholder: "Select a Day",
              items: [
                { id: "sun", value: "Sunday" },
                { id: "mon", value: "Monday" },
                { id: "tue", value: "Tuesday" },
                { id: "wed", value: "Wednesday" },
                { id: "thu", value: "Thursday" },
                { id: "fri", value: "Friday" },
                { id: "sat", value: "Saturday" },
              ],
            }}
            onSelect={(value) => {
              const found = sessions.find((s) => s.value === value);
              setSelectedSessionData(found?.fullData || null);
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 4,
          width: "100%",
        }}
      >
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <SystemOverview overviewData = {data?.overviewData}/>
          <QRCodeManagement />
        </Box>

        <Box
          sx={{
            flexBasis: { xs: "100%", lg: "28%" },
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <SecurityFeature />
          <ConfigurationPanel />
        </Box>
      </Box>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data?.session?.length > 0 && <ActiveQR sessions={data?.session} />}
        {data?.logs?.length > 0 && <CheckinHistory logs={data?.logs} />}
      </div>
    </div>
  );
}
