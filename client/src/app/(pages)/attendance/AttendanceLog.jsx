"use client";

import React from "react";
import { TextField, Chip, Typography, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import { TableComponent as TableComp } from "../../components/Table/TableComponent";

// Attendance data
const rows = [
  {
    Date: "2024-11-15",
    Day: "Friday",
    Status: "Present",
    "Check-In/Out Time": "08:00 AM / 03:00 PM",
    Note: "Regular class",
  },
  {
    Date: "2024-11-16",
    Day: "Saturday",
    Status: "No School",
    "Check-In/Out Time": "-",
    Note: "-",
  },
  {
    Date: "2024-11-18",
    Day: "Monday",
    Status: "Present",
    "Check-In/Out Time": "08:05 AM / 03:10 PM",
    Note: "Regular class",
  },
  {
    Date: "2024-11-19",
    Day: "Tuesday",
    Status: "Late",
    "Check-In/Out Time": "08:15 AM / 03:00 PM",
    Note: "Traffic delay",
  },
  {
    Date: "2024-11-20",
    Day: "Wednesday",
    Status: "Absent",
    "Check-In/Out Time": "-",
    Note: "Doctor's appointment",
  },
];

// Define status chip rendering
const getStatusChip = (status) => {
  switch (status) {
    case "Present":
      return (
        <Chip
          icon={<CheckCircleIcon />}
          label="Present"
          color="success"
          size="small"
        />
      );
    case "Absent":
      return (
        <Chip
          icon={<CancelIcon />}
          label="Absent"
          color="error"
          size="small"
        />
      );
    case "Late":
      return (
        <Chip
          icon={<AccessTimeIcon />}
          label="Late"
          color="warning"
          size="small"
        />
      );
    case "No School":
      return (
        <Chip
          icon={<SchoolIcon />}
          label="No School"
          variant="outlined"
          size="small"
        />
      );
    default:
      return <Chip label={status} size="small" />;
  }
};

// Preprocess rows so Status becomes a Chip
const processedRows = rows.map((row) => ({
  ...row,
  Status: getStatusChip(row.Status),
}));

const AttendanceLog = () => {
  const headers = ["Date", "Day", "Status", "Check-In/Out Time", "Note"];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Detailed Attendance Log
      </Typography>

      <TextField
        placeholder="Search by date, day, or status"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
      />

      <TableComp headers={headers} data={processedRows} pagination />
    </Box>
  );
};

export default AttendanceLog;