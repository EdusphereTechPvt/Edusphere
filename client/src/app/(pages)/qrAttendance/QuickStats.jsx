"use client";

import React from "react";
import { Card, Box, Typography, Divider } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import GenericCard from "../../components/CardComponent/GenericCard";

const QuickStats = ({
  present = 25,
  absent = 5,
  late = 2,
  previousAttendancePercent = 75,
}) => {
  const total = present + absent + late;
  const attendanceRate = total > 0 ? (present / total) * 100 : 0;
  const attendanceRateRounded = Math.round(attendanceRate);

  const prev =
    typeof previousAttendancePercent === "number"
      ? Math.round(previousAttendancePercent)
      : null;

  const diff = prev !== null ? attendanceRateRounded - prev : null;
  const isIncrease = diff !== null ? diff >= 0 : null;

  const stats = [
    { label: "Present", value: present, color: "#16a34a" },
    { label: "Absent", value: absent, color: "#dc2626" },
    { label: "Late", value: late, color: "#f97316" },
  ];

  return (
    <Card
      sx={{
        borderRadius: 1,
        boxShadow: 0,
        border: "1px solid #e5e7eb",
        p: 3,
        bgcolor: "#fff",
        width: "100%"
      }}
    >
      {/* Header */}
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, mb: 2, color: "#1f2937" }}
      >
        Quick Statistics
      </Typography>

      {/* Stats Row */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
          flexWrap: "Nowrap",
          width: "100%"
        }}
      >
        {stats.map((stat) => (
          <GenericCard
            key={stat.label}
            title={
              <Typography
                variant="body2"
                sx={{ color: "#374151", fontWeight: 600 }}
              >
                {stat.label}
              </Typography>
            }
            additionalInfo={[
              {
                value: (
                  <Typography
                    variant="h5"
                    sx={{
                      color: stat.color,
                      fontWeight: 700,
                      mt: 0.5,
                    }}
                  >
                    {stat.value}
                  </Typography>
                ),
              },
            ]}
            styles={{
              cardStyle: {
                inlineStyle: {
                  flex: 1,
                  minWidth: 120,
                  textAlign: "center",
                  padding: "12px 8px",
                  border: "1px solid #f3f4f6",
                  backgroundColor: "#fafafa",
                  boxShadow: "none",
                  borderRadius: "0.75rem",
                },
              },
            }}
          />
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Attendance Rate */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: "#374151", mb: 0.5 }}
          >
            Class Attendance
          </Typography>
          {diff !== null ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {isIncrease ? (
                <ArrowUpwardIcon sx={{ fontSize: 16, color: "#16a34a" }} />
              ) : (
                <ArrowDownwardIcon sx={{ fontSize: 16, color: "#dc2626" }} />
              )}
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: isIncrease ? "#16a34a" : "#dc2626",
                }}
              >
                {Math.abs(diff)}% {isIncrease ? "increase" : "decrease"} from
                previous session
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No previous data
            </Typography>
          )}
        </Box>

        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: "#111827", alignSelf: "center" }}
        >
          {attendanceRateRounded}%
        </Typography>
      </Box>
    </Card>
  );
};

export default QuickStats;
