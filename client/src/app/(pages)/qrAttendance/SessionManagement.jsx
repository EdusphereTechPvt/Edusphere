import { border, borderColor, Box, color } from "@mui/system";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { Button, Paper, Typography } from "@mui/material";
import { act } from "react";

const SessionManagement = () => {
  const actions = [
    {
      label: "End Session",
      icon: <StopCircleIcon sx={{ mr: 1, fontSize: 22, color: "white" }} />,
      background: "red",
      color: "white",
      hoverbg: "#ff4d4d",
    },
    {
      label: "Pause Session",
      icon: (
        <PauseCircleOutlineIcon sx={{ mr: 1, fontSize: 22, color: "black" }} />
      ),
      background: "lightgray",
      color: "black",
      hoverbg: "#f4f6fa",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 2, sm: 2, md: 3 },
        px: { xs: 0, sm: 1, md: 3 },
        pt: 3,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          minWidth: { xs: "100%", md: 320 },
          maxWidth: { md: 400 },
          p: { xs: 2, md: 3 },
          borderRadius: 1,
          flex: 1,
          mb: { xs: 2, md: 0 },
        }}
      >
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Session Management
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {actions.map((action) => (
            <Button
              key={action.label}
              fullWidth
              variant="contained"
              color="error"
              sx={{
                background: action.background,
                color: action.color,
                borderRadius: 2,
                py: 1.5,
                px: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                fontSize: { xs: "rem" },
                borderColor: "#E7EAF0",
                "&:hover": {
                  background: action.hoverbg,
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
    </Box>
  );
};

export default SessionManagement;
