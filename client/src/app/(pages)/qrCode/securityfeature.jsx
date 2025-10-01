"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import HistoryIcon from "@mui/icons-material/History";
import ShieldIcon from "@mui/icons-material/Shield";

function SecurityFeature(response) {
  const [formData, setFormData] = useState({});
  response = formData

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
        {" "}
        Security Features
      </Typography>

      <div className="max-w-md w-full bg-white shadow rounded-xl p-5 space-y-3">
        {/* QR Code Expiration */}
        <div>
          {" "}
          <TextField
            label="QR Code Expiration (minutes)"
            placeholder="e.g., 5"
            value={formData.QRCodeExpiration || ""}
            onChange={(e) => handleChange("QRCodeExpiration", e.target.value)}
            fullWidth
            size="medium"
            disabled
          />
        </div>

        {/* Unique Session Code */}
        <div>
          <TextField
            label="Unique Session Code"
            placeholder="Auto-generated or manual"
            value={formData.UniqueSessionCode || ""}
            onChange={(e) => handleChange("UniqueSessionCode", e.target.value)}
            fullWidth
            size="medium"
            disabled
          />
        </div>
        {/* Encryption Status */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2,
            border: "1px solid",
            borderColor: "grey.300",
            borderRadius: 2,
            bgcolor: "#f8fafc",
            mt: 2,
          }}
        >
          <div className="p-3 bg-[#dcfce7] rounded-full">
            <ShieldIcon sx={{ color: "#3bb367", fontSize: 30 }} />
          </div>
          <Box>
            <Typography
              fontSize="0.875rem"
              fontWeight={500}
              color="text.primary"
            >
              Encryption Status
            </Typography>
            <Typography
              fontSize="0.875rem"
              fontWeight={600}
              color="success.dark"
            >
              Enabled (AES-256)
            </Typography>
          </Box>
        </Box>

        <Button
          onClick={() => console.log("clicked")}
          fullWidth
          variant="outlined"
          disabled
          startIcon={<HistoryIcon />}
          sx={{
            textTransform: "none",
            fontSize: { xs: "0.8rem", md: "1rem" },
            backgroundColor: "#e2e8f0",
            fontWeight: 600,
            color: "grey.800",
            border: "none",
            borderRadius: 2,
            mb: 1,
            justifyContent: "center",
            "&:hover": {
              backgroundColor: "#cbd5e1",
            },
            py: 1.5,
          }}
        >
          View Access Logs
        </Button>
      </div>
    </>
  );
}

export default SecurityFeature;
