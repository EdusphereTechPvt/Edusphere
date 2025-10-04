"use client";

import {
    Box,
    Card,
    CardContent,
    Typography,
    useTheme,
} from "@mui/material";
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
        ]
    };

    return (
        <Box sx={{ p: 3, bgcolor: "grey.50", minHeight: "100vh" }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                
                
                <Box sx={{ flex: "1 1 100%", minWidth: "100%", "@media (min-width:768px)": { flex: "1 1 45%", minWidth: 400 } }}>
                    <Card sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" mb={2} fontWeight="bold" color="theme.palette.primary.main">
                                Payment Trends
                            </Typography>
                            <Box sx={{ height: 400, width: "100%", minWidth: 500 }}> 
                                <LineChart
                                    dataset={data.trends}
                                    xAxis={[{ 
                                        scaleType: "band", 
                                        label: "Month",
                                        dataKey: "month",
                                        tickLabelStyle: { 
                                            fontSize: 12, 
                                            fontWeight: 500,
                                        }
                                    }]}
                                    yAxis={[{ 
                                        label: "Amount ($)",
                                        tickLabelStyle: { fontSize: 12 }
                                    }]}
                                    series={[{
                                        dataKey: "amount",
                                        label: "Monthly Collection",
                                        curve: "natural",
                                        area: true,
                                        color: theme.palette.primary.main,
                                        showMark: true,
                                    }]}
                                    
                                    margin={{ left: 70, right: 30, top: 30, bottom: 70 }}
                                    sx={{
                                        "& .MuiAreaElement-root": {
                                            fill: `url(#areaGradient)`,
                                            fillOpacity: 0.3,
                                        },
                                        "& .MuiLineElement-root": {
                                            strokeWidth: 3,
                                            strokeLinecap: "round",
                                        },
                                        width: '100%',
                                        height: '100%'
                                    }}
                                    grid={{ vertical: true }}
                                >
                                    <defs>
                                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={theme.palette.primary.main} stopOpacity={0.4} />
                                            <stop offset="100%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                </LineChart>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                <Box sx={{ flex: "1 1 100%", minWidth: "100%", "@media (min-width:768px)": { flex: "1 1 45%", minWidth: 400 } }}>
                    <Card sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" mb={2} fontWeight="bold" color="theme.palette.primary.main">
                                Payment Distribution
                            </Typography>
                            <Box sx={{ height: 400, width: "100%", minWidth: 500 }}> 
                                <BarChart
                                    dataset={data.distribution}
                                    xAxis={[{ 
                                        scaleType: "band", 
                                        dataKey: "category",
                                        label: "Category",
                                        tickLabelStyle: { 
                                            fontSize: 12, 
                                            fontWeight: 500 
                                        }
                                    }]}
                                    yAxis={[{ 
                                        label: "Amount ($)",
                                        tickLabelStyle: { fontSize: 12 }
                                    }]}
                                    series={[{
                                        dataKey: "amount",
                                        label: "Expenditure",
                                        color: theme.palette.primary.main,
                                    }]}
                                    
                                    margin={{ left: 70, right: 30, top: 30, bottom: 70 }}
                                    sx={{
                                        "& .MuiBarElement-root": {
                                            rx: 4,
                                        },
                                        width: '100%',
                                        height: '100%'
                                    }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
};

export default FeeDashboard;