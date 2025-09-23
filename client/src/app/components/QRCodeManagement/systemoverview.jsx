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
          { title: "Usage Analytics", value: "85%" }
        ]

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
        color="text.primary"
        mb={2}
      >
        System Overview
      </Typography>

      <Grid container spacing={2}>
        {overviewData.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <GenericCard
              title={item.title}
              additionalInfo={[{ value: item.value }]}
              styles={{
                cardStyle: {
                  inlineStyle: {
                    textAlign: "left",
                    alignItems: "flex-start",
                    padding: "16px",
                  },
                },
                textContainerStyle: {
                  titleStyle: {
                    inlineStyle: {
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: "#6b7280", // gray-500
                      marginBottom: "4px",
                    },
                  },
                  additionalInfoStyle: {
                    value: {
                      inlineStyle: {
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "#111827", // gray-900
                      },
                    },
                  },
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SystemOverview;
