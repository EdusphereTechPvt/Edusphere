"use client";
import React from "react";
import { Typography, Box } from "@mui/material";

const StatCard = ({
  label,
  value,
  change,
  text,
  icon: Icon,
  iconStyles,
  styles = {},
}) => (
  <Box
    className={`flex flex-col p-4 bg-white drop-shadow-lg rounded-3xl ${styles.Card?.className}  `}
    sx={styles.Card?.inlineStyle}
  >
    <Box className="flex justify-between items-center">
      <Typography
        color="gray.700"
        className={styles.label?.className}
        sx={{
          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem", lg: "1.1rem" },
          ...styles.label?.inlineStyle,
        }}
      >
        {label}
      </Typography>
      {Icon && (
        <Box
          className="p-3 rounded-full flex items-center justify-center"
          sx={{
            backgroundColor: `color-mix(in srgb, ${
              iconStyles?.color || "var(--color-primary)"
            } 20%, transparent)`,
            borderRadius: iconStyles?.borderRadius || "50%",
          }}
        >
          <Icon style={iconStyles} />
        </Box>
      )}
    </Box>

    <Typography
      variant="h4"
      fontWeight="bold"
      my={2}
      sx={{
        fontSize: { xs: "1.8rem", sm: "1.9rem", md: "2rem", lg: "2.1rem" },
        ...styles.value?.inlineStyle,
      }}
      className={styles.value?.className}
    >
      {value}
    </Typography>

    <Box className={`flex items-center ${styles?.changeContainer?.className}`} sx={styles?.changeContainer?.inlineStyle}>
      {Icon && <Icon className="w-6 h-6 mr-2" />}
      <Typography
        fontWeight="medium"
        color={change?.includes("+") ? "green" : "red"}
        className={styles.change?.className}
        sx={styles.change?.inlineStyle}
      >
        {change}
      </Typography>
      <Typography color="gray" ml={1} sx={styles?.changeText?.inlineStyle} className={styles?.changeText?.className}>
        {text}
      </Typography>
    </Box>
  </Box>
);

export default StatCard;
