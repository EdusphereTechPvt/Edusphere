"use client";
import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import GenericCard from "@/app/components/CardComponent/GenericCard";

const SystemOverview = () => {
  const [overviewData, setOverviewData] = useState([]);

  // Fetch system overview data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with actual backend API endpoint
        const res = await fetch("/api/system-overview");
        // const data = await res.json();

        // Sample data format from backend
        const data = [
          { title: "Active QR Code Session", value: "Session 1" },
          { title: "Today's Check-ins", value: "250" },
          // { title: "Today's Check-outs", value: "230" },
          { title: "Usage Analytics", value: "85%" },
        ];

        setOverviewData(data);
      } catch (err) {
        console.error("Failed to fetch system overview:", err);
      }
    };

    fetchData();
  }, []);

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
          <div
            key={index}
            style={{
              flex: "1 1 250px", // grow, shrink, and min width
           
            }}
          >
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
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  },
                },
                textContainerStyle: {
                  titleStyle: {
                    inlineStyle: {
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      color: "#6b7280",
                      marginBottom: "4px",
                    },
                  },
                  additionalInfoStyle: {
                    value: {
                      inlineStyle: {
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                        color: "#111827",
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
