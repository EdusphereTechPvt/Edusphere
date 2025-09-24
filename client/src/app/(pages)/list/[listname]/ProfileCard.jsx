"use client";
import React from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Button,
  Tooltip,
} from "@mui/material";
import { statusConfig } from "@/app/config/TableConfig";
import { ProfileCardConfig } from "@/app/config/ListConfig";

const ProfileCard = ({ role, data }) => {
  const { header, fields = [], quickLinks = [] } = ProfileCardConfig[role];
  const { name, id, className, section, avatar, Class } = data;

  const getAttendanceColor = (value) => {
    if (value < 40) return "var(--color-red)";
    if (value < 60) return "var(--color-yellow)";
    return "var(--color-green)";
  };

  const renderField = (field) => {
    const value = data[field.key];
    if (value === undefined || value === null) return null;

    switch (field.type) {
      case "progress":
        return (
          <Box key={field.key} mb={2}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                sx={{
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  color: "text.secondary",
                  fontWeight: 500,
                  flexShrink: 0,
                  width: "40%",
                }}
              >
                {field.label}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  fontWeight: 600,
                  color: getAttendanceColor(value),
                  whiteSpace: "nowrap",
                }}
              >
                {value}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={value}
                sx={{
                  flex: 1,
                  borderRadius: 5,
                  height: 8,
                  backgroundColor: "#eee",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: getAttendanceColor(value),
                  },
                }}
              />
            </Box>
          </Box>
        );

      case "chip":
        return (
          <Box
            key={field.key}
            mb={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            <Typography
              sx={{
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                color: "text.secondary",
                fontWeight: 500,
                width: "40%",
              }}
            >
              {field.label}
            </Typography>
            <Chip
              label={`● ${value}`}
              size="small"
              sx={{
                backgroundColor: statusConfig[value]?.chipBg,
                color: statusConfig[value]?.chipColor,
                fontWeight: "bold",
              }}
            />
          </Box>
        );

      default:
        return (
          <Box
            key={field.key}
            mb={2}
            display="flex"
            justifyContent="space-between"
          >
            <Typography
              sx={{
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                color: "text.secondary",
                fontWeight: 500,
              }}
            >
              {field.label}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                fontWeight: 600,
                textAlign: "right",
              }}
            >
              {value}
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 450,
        borderRadius: 3,
        height: "100%",
        boxShadow: "none",
        border: "1px solid #D3D4D9",
      }}
    >
      <CardContent>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Typography
            fontWeight={600}
            sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" } }}
          >
            {header?.title}
          </Typography>

          {/* Buttons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {header?.buttons?.map((btn, idx) => (
              <Tooltip title={btn.displayName} key={idx} arrow>
                <Button
                  variant={btn.style.variant}
                  sx={{
                    ...btn.style,
                    textTransform: "none",
                    minWidth: 0,
                  }}
                  onClick={() => {
                    if (btn.type === "link" && btn.link) {
                      window.location.href = btn.link;
                    } else if (btn.action) {
                      btn.action(data);
                    }
                  }}
                >
                  <btn.icon
                    sx={{
                      fontSize: { sm: "0.9rem", md: "1rem", lg: "1.15rem" },
                    }}
                  />
                </Button>
              </Tooltip>
            ))}
          </Box>
        </Box>

        {/* Avatar & Name */}
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar
            src={avatar || ""}
            alt={name}
            imgProps={{ loading: "lazy" }}
            sx={{
              width: { xs: 75, sm: 80, md: 85, lg: 90 },
              height: { xs: 75, sm: 80, md: 85, lg: 90 },
              mb: 1,
            }}
          />
          <Typography
            fontWeight={600}
            sx={{ fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" } }}
          >
            {name}
          </Typography>

          {header?.subInfo?.map((item) => {
            const value = item.valueGetter
              ? item.valueGetter(data)
              : data[item.key];
            if (!value) return null;
            return (
              <Typography
                key={item.key}
                sx={{
                  fontSize: { xs: "0.7rem", sm: "0.8rem" },
                  color: "text.secondary",
                }}
              >
                {item.label}: {value}
              </Typography>
            );
          })}

          {(className || Class) && section && (
            <Typography
              sx={{
                fontSize: { xs: "0.7rem", sm: "0.8rem" },
                color: "text.secondary",
              }}
            >
              Class: {className || Class}, Section {section}
            </Typography>
          )}
        </Box>

        {/* Dynamic Fields */}
        {fields.map((field) => renderField(field))}

        {/* Quick Links */}
        <Box mt={3}>
          <Typography
            fontWeight={600}
            sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" }, mb: 1 }}
          >
            Quick Links
          </Typography>
          {quickLinks.map((link, idx) => (
            <Button
              key={idx}
              fullWidth
              variant={idx === 0 ? "contained" : "outlined"}
              startIcon={link.icon}
              onClick={link.action}
              sx={{
                mb: 1,
                textTransform: "none",
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                py: 1.3,
                fontWeight: 500,
                borderRadius: 1,
                color: idx !== 0 ? "#334155" : undefined,
                border: idx !== 0 ? "1px solid #9999" : undefined,
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
