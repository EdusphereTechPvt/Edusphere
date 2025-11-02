"use client";

import React from "react";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";

const FeeDashboard = () => {
    const theme = useTheme();

    const data = {
        trends: [
            { month: "Jan", amount: 18500 },
            { month: "Feb", amount: 21500 },
            { month: "Mar", amount: 19800 },
            { month: "Apr", amount: 22800 },
            { month: "May", amount: 24500 },
            { month: "Jun", amount: 26800 },
            { month: "Jul", amount: 28500 },
            { month: "Aug", amount: 30500 },
            { month: "Sep", amount: 32500 },
            { month: "Oct", amount: 31800 },
            { month: "Nov", amount: 29500 },
            { month: "Dec", amount: 33800 },
        ],
        distribution: [
            { category: "Tuition", amount: 180000 },
            { category: "Transport", amount: 25000 },
            { category: "Extra", amount: 12000 },
            { category: "Exam", amount: 20000 },
            { category: "Misc", amount: 13000 },
        ],
    };

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
                mt: 4,
            }}
        >
            {/* Line Chart Card */}
            <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                <CardContent>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        mb={2}
                        sx={{ color: theme.palette.primary.main }}
                    >
                        Payment Trends
                    </Typography>
                    <LineChart
                        dataset={data.trends}
                        xAxis={[
                            {
                                scaleType: "band",
                                label: "Month",
                                dataKey: "month",
                                tickLabelStyle: { fontSize: 12, fontWeight: 500 },
                            },
                        ]}
                        yAxis={[
                            {
                                label: "Amount ($)",
                                tickLabelStyle: { fontSize: 12 },
                            },
                        ]}
                        series={[
                            {
                                dataKey: "amount",
                                label: "Monthly Collection",
                                curve: "natural",
                                area: true,
                                color: theme.palette.primary.main,
                                showMark: true,
                            },
                        ]}
                        margin={{ left: 50, right: 20, top: 20, bottom: 40 }}
                        grid={{ vertical: true }}
                        sx={{
                            "& .MuiAreaElement-root": {
                                fill: `url(#areaGradient)`,
                                fillOpacity: 0.3,
                            },
                            "& .MuiLineElement-root": {
                                strokeWidth: 3,
                                strokeLinecap: "round",
                            },
                        }}
                        height={320}
                    >
                        <defs>
                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="0%"
                                    stopColor={theme.palette.primary.main}
                                    stopOpacity={0.4}
                                />
                                <stop
                                    offset="100%"
                                    stopColor={theme.palette.primary.main}
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                    </LineChart>
                </CardContent>
            </Card>

            {/* Bar Chart Card */}
            <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                <CardContent>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        mb={2}
                        sx={{ color: theme.palette.primary.main }}
                    >
                        Payment Distribution
                    </Typography>
                    <BarChart
                        dataset={data.distribution}
                        xAxis={[
                            {
                                scaleType: "band",
                                dataKey: "category",
                                label: "Category",
                                tickLabelStyle: { fontSize: 12, fontWeight: 500 },
                            },
                        ]}
                        yAxis={[
                            {
                                label: "Amount ($)",
                                tickLabelStyle: { fontSize: 12 },
                            },
                        ]}
                        series={[
                            {
                                dataKey: "amount",
                                label: "Expenditure",
                                color: theme.palette.primary.main,
                            },
                        ]}
                        margin={{ left: 50, right: 20, top: 20, bottom: 40 }}
                        sx={{
                            "& .MuiBarElement-root": {
                                rx: 4,
                            },
                        }}
                        height={320}
                    />
                </CardContent>
            </Card>
        </Box>
    );
};

export default FeeDashboard;
