"use client";

import React, { useState, useEffect } from "react";
import { Card, Box, Typography, Button, CircularProgress } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import RefreshIcon from "@mui/icons-material/Refresh";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";

const QrCodeDisplay = () => {
  const [timeLeft, setTimeLeft] = useState(45);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [sessionTimeLeft, setSessionTimeLeft] = useState(null);

  const fetchSession = async () => {
    try {
      setLoading(true);

      const dummySession = {
        sessionId: "abc123",
        sessionName: "Sample Class",
        sessionType: "class",
        startTime: new Date().toISOString(),
        endTime: new Date(new Date().getTime() + 10 * 60 * 1000).toISOString(),
      };

      await new Promise((resolve) => setTimeout(resolve, 500));

      setSession(dummySession);
      setQrValue(JSON.stringify(dummySession));

      const end = new Date(dummySession.endTime).getTime();
      const now = new Date().getTime();
      setSessionTimeLeft(Math.max(Math.floor((end - now) / 1000), 0));
    } catch (err) {
      console.error("Error fetching session:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleRefresh();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (sessionTimeLeft > 0) {
      const sessionTimer = setTimeout(
        () => setSessionTimeLeft((t) => t - 1),
        1000
      );
      return () => clearTimeout(sessionTimer);
    }
  }, [sessionTimeLeft]);

  useEffect(() => {
    fetchSession();
  }, []);

  const handleRefresh = async () => {
    setTimeLeft(45);
    await fetchSession();
  };

  const handleAction = (action) => {
    if (action === "pause") {
      // Pause QR refresh
      clearTimeout(qrTimer);
    } else if (action === "end") {
      // End session logic
      setSession(null);
      setQrValue("");
    }
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const sessionMinutes =
    sessionTimeLeft !== null ? Math.floor(sessionTimeLeft / 60) : null;
  const sessionSeconds = sessionTimeLeft !== null ? sessionTimeLeft % 60 : null;

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 0,
        border: "1px solid #e5e7eb",
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        gap: 2,
        height: "100%",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 700, color: "#111827", alignSelf: "flex-start" }}
      >
        QR Code Display
      </Typography>
      <Box
        sx={{
          width: 200,
          height: 200,
          bgcolor: "#f9fafb",
          border: "1px solid #e5e7eb",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <CircularProgress size={32} />
        ) : qrValue ? (
          <QRCodeCanvas value={qrValue} size={180} />
        ) : (
          <Typography sx={{ color: "#9ca3af" }}>No session</Typography>
        )}
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, letterSpacing: 2, color: "#111827" }}
        >
          {minutes} : {seconds}
        </Typography>
        <Typography
          variant="caption"
          sx={{ display: "block", color: "#6b7280", mt: 0.5 }}
        >
          QR Refresh Timer
        </Typography>
      </Box>

      {/*
      {sessionTimeLeft !== null && (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#111827" }}>
            {sessionMinutes}:{String(sessionSeconds).padStart(2, "0")}
          </Typography>
          <Typography variant="caption" sx={{ display: "block", color: "#6b7280" }}>
            Session Time Left
          </Typography>
        </Box>
      )} */}

      {/* Refresh btn */}
      <Button
        startIcon={<RefreshIcon />}
        onClick={handleRefresh}
        sx={{
          textTransform: "none",
          fontWeight: 600,
          color: "#111827",
          fontSize: "0.8rem",
          "&:hover": { bgcolor: "#f3f4f6" },
        }}
      >
        Refresh QR Code
      </Button>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        {[
          {
            label: "End Session",
            icon: (
              <StopCircleIcon sx={{ mr: 1, fontSize: 22, color: "white" }} />
            ),
            background: "red",
            color: "white",
            hoverbg: "#ff4d4d",
          },
          {
            label: "Pause Session",
            icon: (
              <PauseCircleOutlineIcon
                sx={{ mr: 1, fontSize: 22, color: "black" }}
              />
            ),
            background: "lightgray",
            color: "black",
            hoverbg: "#f4f6fa",
          },
        ].map((action) => (
          <Button
            key={action.label}
            startIcon={action.icon}
            variant="contained"
            fullWidth
            onClick={() =>
              handleAction(action.label.toLowerCase().split(" ")[0])
            }
            sx={{
              width: "100%",
              py: 1.2,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: { xs: "0.8rem" },
              background: action.background,
              color: action.color,

              "&:hover": { background: action.hoverbg },
            }}
          >
            {action.label}
          </Button>
        ))}
      </Box>
    </Card>
  );
};

export default QrCodeDisplay;
