"use client";

import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const stats = [
  {
    title: "Overall Attendance",
    value: "95%",
    subtext: "vs. last term",
    trend: "+2%",
    color: "success.main",
    showTrend: true,
  },
  {
    title: "Total Present",
    value: "150",
    color: "text.primary",
  },
  {
    title: "Total Absences",
    value: "5",
    color: "error.main",
  },
  {
    title: "Times Late",
    value: "2",
    color: "warning.main",
  },
];

export default function AttendanceStats() {
  return (
    <Grid container spacing={2}>
      {stats.map((item, idx) => (
        <Grid item xs={12} sm={6} md={3} key={idx}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 3,
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {item.title}
              </Typography>

              <Box display="flex" alignItems="center" mt={1}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color={item.color}
                >
                  {item.value}
                </Typography>
                {item.showTrend && (
                  <Box
                    display="flex"
                    alignItems="center"
                    ml={1}
                    color="success.main"
                  >
                    <ArrowUpwardIcon fontSize="small" />
                    <Typography variant="body2" fontWeight="medium">
                      {item.trend}
                    </Typography>
                  </Box>
                )}
              </Box>

              {item.subtext && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  mt={0.5}
                >
                  {item.subtext}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}