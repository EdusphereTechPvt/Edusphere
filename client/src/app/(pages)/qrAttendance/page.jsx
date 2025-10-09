"use client";

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import AttendanceActions from "./AttendanceActions";
import ClassOverview from "./classOverview";
import QuickStats from "./QuickStats";
import QrCodeDisplay from "./qrCodeDisplay";
import { useParams } from "next/navigation";
import Dropdown from "@/app/components/Dropdown/Dropdown";

const Page = () => {
  // const params = useParams();
  // fetch current class details from attendance and update header
  const subjectName = "Math 101";
  const cureentPeriod = "3rd Period (10:00 AM - 10:50 AM)";
  const [selectedSession, setSelectedSession] = useState({});
  return (
    <Box
      sx={{
        bgcolor: "#f8fafc",
        minHeight: "100vh",
        width: "100%",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {xs:"column", md:"row"},
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{mb:{xs:"0", md:3}}}>
          <Typography
            sx={{
              fontSize: {
                xs: "1.5rem",
                sm: "1.6rem",
                md: "1.7rem",
                lg: "1.8rem",
              },
              fontWeight: "bold",
            }}
          >
            QR Attendance - {subjectName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Current Period: {cureentPeriod}
          </Typography>
        </Box>
        <Box sx={{ minWidth: 200 }}>
          <Dropdown
            data={{
              lable: "",
              placeholder: "Select a Event/Class",
              items: [{}],
            }}
            onSelect={(value) => setSelectedSession(value)}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          width: "100%",
        }}
      >
        <Box
          sx={{
            minWidth: { xs: "100%", md: 300 },
          }}
        >
          <QrCodeDisplay />
        </Box>
        <Box sx={{ minWidth: { xs: "100%", md: "70%" }, flex: 1 }}>
          <ClassOverview />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          width: "100%",
        }}
      >
        <Box
          sx={{
            minWidth: { xs: "100%", md: 300 },
          }}
        >
          <AttendanceActions />
        </Box>

        <Box sx={{ minWidth: { xs: "100%", md: "70%" }, flex: 1, display: {xs:"none", md:"block"} }}>
          <QuickStats />
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
