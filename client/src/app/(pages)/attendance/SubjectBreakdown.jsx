"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
} from "@mui/material";

export default function SubjectBreakdown({ subjects }) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Subject-wise Breakdown
        </Typography>

        {subjects.map((subj, idx) => (
          <Box key={idx} mb={2}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="text.primary">
                {subj.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {subj.percentage}%
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={subj.percentage}
              sx={{
                height: 8,
                borderRadius: 5,
                mt: 0.5,
                backgroundColor: "#e0e0e0",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#29b6f6",
                },
              }}
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}
