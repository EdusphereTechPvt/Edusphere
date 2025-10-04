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

export default function Page() {
  const [sessions, setSessions] = useState([]);
  const [result, setResult] = useState(null);
  const [data, setData] = useState({});
  const [currentType, setCurrentType] = useState("");

  const handleGenerate = async (payload) => {
    try {
      const res = await addOrUpdate(payload);
      setCurrentType(payload.sessionType || "event");
      setResult(res);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const qrSessions = await fetchData("qr/search", {});
        setData((prev) => ({
          ...prev,
          session: qrSessions,
        }));

        if (currentType) {
          const res = await fetchData(`${currentType.toLowerCase()}/getAll`);
          setData((prev) => ({
            ...prev,
            [currentType.toLowerCase()]: res,
          }));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchResponse();
  }, [result, currentType]);

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
      <div className="flex flex-col lg:flex-row w-full h-full gap-6">
        {/* Left Section */}
        <div className="space-y-6 lg:w-[75%]">
          <SystemOverview />
          <QRCodeManagement
            onGenerate={handleGenerate}
            result={result}
            data={data}
          />
        </div>

        {/* Right Section */}
        <div className="space-y-6 flex flex-col lg:flex-col md:flex-row  justify-center lg:gap-0 gap-4 w-full lg:w-[25%]">
          <div className="w-full">
            <SecurityFeature />
          </div>
          <div className="w-full">
            <ConfigurationPanel />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActiveQR sessions={data?.session} />
        <CheckinHistory logs={logs} />
      </div>
    </div>
  );
}
