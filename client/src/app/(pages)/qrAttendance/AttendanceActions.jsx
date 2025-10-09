import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

const actions = [
  {
    label: "Generate New QR Code",
    icon: <QrCode2Icon sx={{ mr: 1, fontSize: 22 }} />,
  },
  {
    label: "Extend Session",
    icon: <AccessTimeFilledIcon sx={{ mr: 1, fontSize: 22 }} />,
  },
  {
    label: "Mark Individual Exceptions",
    icon: <PlaylistAddCheckIcon sx={{ mr: 1, fontSize: 22 }} />,
  },
];

const AttendanceActions = () => (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 1,
        flex: 1,
        mb: { xs: 2, md: 0 },
        border: "1px solid #e5e7eb",
        height: "100%"
      }}
    >
      <Typography variant="h6" fontWeight={700} gutterBottom>
        Attendance Actions
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {actions.map((action) => (
          <Button
            key={action.label}
            fullWidth
            variant="outlined"
            sx={{
              background: "#fff",
              borderRadius: 2,
              py: 1.5,
              px: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,

              borderColor: "#E7EAF0",
              color: "#23282D",
              fontSize:{xs: "0.7", md:"0.8rem"},
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                background: "#f4f6fa",
                borderColor: "#C9CFDC",
              },
            }}
            startIcon={action.icon}
          >
            {action.label}
          </Button>
        ))}
      </Box>
    </Paper>
);

export default AttendanceActions;
