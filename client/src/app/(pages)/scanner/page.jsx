"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Typography,
    Paper,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ErrorIcon from "@mui/icons-material/Error";
import { AttendanceScannerConfig } from "@/app/config/AttendaceConfig";

import { TableComponent } from "@/app/components/Table/TableComponent";
import { Scanner } from "@yudiel/react-qr-scanner";

const statusIconMap = {
    success: <CheckCircleIcon fontSize="small" />,
    warning: <HourglassBottomIcon fontSize="small" />,
    error: <ErrorIcon fontSize="small" />,
};

const AttendanceScanner = () => {
    const config = AttendanceScannerConfig;

    const [timer, setTimer] = useState(332);
    const [isRunning, setIsRunning] = useState(true);
    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => setTimer((t) => t + 1), 1000);
        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (time) => {
        const pad = (num) => String(num).padStart(2, "0");
        const h = pad(Math.floor(time / 3600));
        const m = pad(Math.floor((time % 3600) / 60));
        const s = pad(time % 60);
        return `${h}:${m}:${s}`;
    };

    const handleScan = (result) => {
        if (result) {
            setScanResult(result);
            // You can add logic to update attendance based on scanResult here
            console.log("QR Code scanned:", result);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    const statusColorMap = {
        success: "success",
        warning: "warning",
        error: "error",
    };

    return (
        <Box sx={{ minHeight: "100vh", background: "#fafbfc", px: { xs: 1, sm: 2, md: 3 }, py: { xs: 2, sm: 3, md: 4 } }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", md: "flex-start" },
                    maxWidth: 1100,
                    mx: "auto",
                }}
            >
                <Box sx={{ mb: { xs: 2, md: 0 }, width: { xs: "100%", md: "auto" } }}>
                    <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
                        {config.title}
                    </Typography>
                    <Typography variant="body1" color="gray">
                        Class: {config.class}, Subject: {config.subject}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: { xs: "100%", md: "auto" }, justifyContent: { xs: "space-between", md: "flex-start" } }}>
                    <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
                        <Typography variant="body2" sx={{ color: "gray" }}>
                            Session Timer
                        </Typography>
                        <Typography variant="h5" sx={{ color: "#161c24", fontWeight: 700 }}>
                            {formatTime(timer)}
                        </Typography>
                    </Box>
                    <Button variant="outlined" color="error" sx={{ height: 40, fontWeight: 500, whiteSpace: "nowrap" }} onClick={() => setIsRunning(false)}>
                        Stop Session
                    </Button>
                </Box>
            </Box>

            <Box
                sx={{
                    background: "#fff",
                    borderRadius: 4,
                    boxShadow: 2,
                    mx: "auto",
                    my: 5,
                    maxWidth: 900,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    py: 5,
                    px: { xs: 1, sm: 3 },
                    width: { xs: "95vw", sm: "80vw", md: "auto" },
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        width: { xs: "100%", sm: 650 },
                        height: { xs: 280, sm: 350 },
                        borderRadius: 4,
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                   <Scanner
        onScan={(result) => alert(`Scanned Result: ${JSON.stringify(result)}`)}
        onError={(error) => console.error(error?.message)}
        constraints={{ facingMode: "environment" }} // use back camera on mobile
        style={{ width: "300px", height: "300px" }}
      />


                    <Box
                        sx={{
                            border: "3px solid #3195f3",
                            borderRadius: 3,
                            position: "absolute",
                            left: 32,
                            top: 32,
                            right: 32,
                            bottom: 32,
                            pointerEvents: "none",
                        }}
                    />
                </Paper>
                <Typography sx={{ color: "gray", fontWeight: 500, mt: 3, fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                    Position the QR code within the frame.
                </Typography>
            </Box>

            <Box sx={{ maxWidth: 900, mx: "auto", my: 5 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" fontWeight={700}>
                        Recently Scanned
                    </Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{ borderRadius: "16px", textTransform: "none", fontWeight: 500, px: 3, whiteSpace: "nowrap" }}
                    >
                        Manual Entry
                    </Button>
                </Box>

                <TableComponent
                    headers={config.recentlyScanned.headers}
                    data={config.recentlyScanned.students}
                    pagination={false}
                    className="custom-table-css"
                    styles={{
                        borderRadius: "18px",
    
                        headerCell: {
                            background: "#fff",
                            fontWeight: "bold",
                            color: "#858D9D",
                            textTransform: "uppercase",
                            fontSize: "1rem",
                            borderBottom: "none"
                        },
                        topHeaderStyles: {
                            background: "#fff",
                            borderBottom: "none"
                        }
                    }}
                />
            </Box>

        </Box>
    );
};

export default AttendanceScanner;