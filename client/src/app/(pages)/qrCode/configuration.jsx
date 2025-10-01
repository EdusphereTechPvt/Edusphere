"use client";
import { Typography, Button } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune"; 
import NotificationsIcon from "@mui/icons-material/Notifications"; 
import SyncIcon from "@mui/icons-material/Sync";
import SecurityIcon from "@mui/icons-material/Security";

function ConfigurationPanel() {
  const menuConfig = [
    {
      label: "Attendance Rules & Thresholds",
      icon: <TuneIcon />,
      onClick: () => console.log("Attendance Rules & Thresholds"),
    },
    {
      label: "Alert Settings",
      icon: <NotificationsIcon />,
      onClick: () => console.log("Alert Settings"),
    },
    {
      label: "Sync Frequency Settings",
      icon: <SyncIcon />,
      onClick: () => console.log("Sync Frequency Settings"),
    },
    {
      label: "Data Retention Policies",
      icon: <SecurityIcon />,
      onClick: () => console.log("Data Retention Policies"),
    },
  ];

  return (
    <>
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
        Configuration Panel
      </Typography>

      <div className="max-w-md w-full bg-white shadow rounded-xl p-5 space-y-4">
        {menuConfig.map((item, index) => (
          <Button
            key={index}
            onClick={item.onClick}
            fullWidth
            variant="outlined"
            startIcon={item.icon}
            sx={{
              justifyContent: "flex-start",
              textTransform: "none",
              fontWeight: 500,
              fontSize: { xs: "0.8rem", md: "1rem" },
              backgroundColor: "#e2e8f0",
              fontWeight: 600,
              color: "grey.800",
              border: "none",
              borderRadius: 2,
              mb:1,
              justifyContent: "center",
              "&:hover": {
                backgroundColor: "#cbd5e1",
              },
              py: 1.5,
            }}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </>
  );
}

export default ConfigurationPanel;
