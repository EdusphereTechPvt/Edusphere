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
import { formatLabel } from "@/app/utils/Format";

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
  const [data, setData] = useState({ session: [], logs: logs });
  const [activeSessions, setActiveSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState({});
  useEffect(() => {
    const loadSessions = async () => {
      try {
        const uniqueSessions = await fetchSessions();

        setData((prev) => ({
          ...prev,
          session: uniqueSessions,
        }));

        const now = new Date();
        const active = uniqueSessions.filter(
          (s) =>
            !s.expired &&
            new Date(s.startDate) <= now &&
            new Date(s.endDate) >= now
        );
        setActiveSessions(active);

        if (active.length > 0) {
          setSelectedSession(active[0]);
        }
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    loadSessions();
  }, []);

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
          {activeSessions.length > 1 && (
            <Dropdown
              value={activeSessions?.[0]?.sessionName || ""}
              data={{
                placeholder: "Select Active Session",
                items: activeSessions.map((s) => ({
                  id: s.sessionName,
                  value: formatLabel(s.sessionName),
                })),
              }}
              onSelect={(value) => {
                const found = activeSessions.find(
                  (s) => s.sessionName === value
                );
                setSelectedSession(found);
              }}
            />
          )}
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
          <SystemOverview
            data={{
              name: selectedSession?.sessionName,
              stats: { total: "200", checkIns: "150" },
            }}
          />
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
