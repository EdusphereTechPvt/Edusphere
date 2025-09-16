"use client";
import React from "react";
import { Typography, Box } from "@mui/material";

const StatCard = ({ label, value, change, text, icon: Icon, iconStyles, className="", styles = {} }) => (
  <Box
    className={`flex flex-col p-4 bg-white drop-shadow-lg rounded-3xl ${className}  `}
    sx={styles}
  >
    <Box className="flex justify-between items-center">
      <Typography fontWeight="bold" color="gray.700">
        {label}
      </Typography>
      {Icon && (
        <Box
          className="p-3 rounded-full flex items-center justify-center"
          sx={{
            backgroundColor: `color-mix(in srgb, ${iconStyles?.color || "var(--color-primary)"} 20%, transparent)`,
            borderRadius: iconStyles?.borderRadius || "50%",
          }}
        >
          <Icon style={iconStyles} />
        </Box>
      )}
    </Box>

    <Typography variant="h4" fontWeight="bold" my={2} sx={styles.value}>
      {value}
    </Typography>

    <Box className="flex items-center">
      {Icon && <Icon className="w-6 h-6 mr-2" />}
      <Typography
        fontWeight="medium"
        color={change.includes("+") ? "green" : "red"}
      >
        {change}
      </Typography>
      <Typography color="gray" ml={1}>
        {text}
      </Typography>
    </Box>
  </Box>
);

export default StatCard;
