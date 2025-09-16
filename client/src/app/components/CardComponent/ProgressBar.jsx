"use client";
import React from "react";
import { Stack, Box, Typography } from "@mui/material";
// import { getGrade, subjectColors } from "../../utils/subjectData";

const ProgressBar = ({ label, percentage }) => (
  <Stack direction="row" spacing={2} alignItems="center">
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        {label}
      </Typography>
      <Box
        sx={{
          backgroundColor: "#e0e0e0",
          borderRadius: "5px",
          height: "8px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: `${percentage}%`,
            // backgroundColor: subjectColors[label.toLowerCase()] || "#3f51b5",
            backgroundColor: "#3f51b5",
            height: "100%",
            borderRadius: "5px",
            transition: "width 0.3s ease",
          }}
        />
      </Box>
    </Box>
    <Typography variant="body2" sx={{ minWidth: "60px" }}>
      {/* {percentage}% {getGrade(percentage) && `(${getGrade(percentage)})`} */}
        {percentage}%
    </Typography>
  </Stack>
);

export default ProgressBar;
