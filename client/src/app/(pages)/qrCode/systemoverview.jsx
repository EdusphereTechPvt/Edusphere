"use client";
import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import GenericCard from "@/app/components/CardComponent/GenericCard";
import { formatLabel } from "@/app/utils/Format";

const SystemOverview = ({ data = {} }) => {
  console.log("Data: ", data);
  const { name = "N/A", stats = {} } = data;
  const usage = stats.total > 0 ? `${Math.round((Number(stats.checkIns) / Number(stats.total)) * 100)}%`
      : "0%";

  const overviewData = [
    { title: "Active QR Code Session", value: formatLabel(name) },
    { title: "Today's Check-ins", value: stats.checkIns ?? 0 },
    // { title: "Today's Check-outs", value: "230" },
    { title: "Usage Analytics", value: usage },
  ];

  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
          fontSize: {
            xs: "1.1rem",
            sm: "1.18rem",
            md: "1.2rem",
            lg: "1.35rem",
          },
          mb: 2,
          color: "text.primary",
        }}
      >
        System Overview
      </Typography>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {overviewData.map((item, index) => (
          <div key={index} className="flex-1 flex-wrap">
            <GenericCard
              title={item.title}
              additionalInfo={[{ value: item.value }]}
              styles={{
                cardStyle: {
                  inlineStyle: {
                    textAlign: "left",
                    alignItems: "flex-start",
                    padding: "16px",
                    width: "100%",
                    maxWidth: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  },
                },
                textContainerStyle: {
                  titleStyle: {
                    inlineStyle: {
                      fontSize: { xs: "0.7rem", md: "0.9rem" },
                      fontWeight: 500,
                      color: "#6b7280",
                      marginBottom: "4px",
                      whiteSpace: "nowrap",
                    },
                  },
                  additionalInfoStyle: {
                    value: {
                      inlineStyle: {
                        fontSize: { xs: "0.9rem", md: "1.3rem" },
                        fontWeight: "bold",
                        color: "#111827",
                        whiteSpace: "nowrap",
                      },
                    },
                  },
                },
              }}
            />
          </div>
        ))}
      </div>
    </Box>
  );
};

export default SystemOverview;
