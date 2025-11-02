"use client";
import React, { useState } from "react";
import Form from "@/app/components/Form/Form";
import FeeDashboard from "./FeeDashboard";
import StatCard from "./Cards";
import { Typography, Card, CardContent, Button, MenuItem, Select, Box, } from "@mui/material";
import { ReceiptLong, Print, Download } from "@mui/icons-material";
import { TableComponent } from "@/app/components/Table/TableComponent";

export default function Page() {
    const [reportType, setReportType] = useState("Daily Collection Report");
    const topHeader = [
        {
            type: "text",
            label: "Fee List",
            variant: "h6",
            fontWeight: "bold",
        },
        {
            type: "search",
            placeholder: "Search student name...",
            key: "searchStudent",
        },
        {
            type: "dropdown",
            label: "Status",
            key: "statusFilter",
            options: [
                { label: "All", value: "all" },
                { label: "Paid", value: "Paid" },
                { label: "Pending", value: "Pending" },
                { label: "Overdue", value: "Overdue" },
            ],
        },
        {
            type: "button",
            label: "Export",
            color: "primary",
            variant: "outlined",
            icon: "Download", // Icon name for renderTopHeader
            action: "exportData", // will trigger in handleAction()
        },
        {
            type: "button",
            label: "Print",
            color: "secondary",
            variant: "contained",
            icon: "Print",
            action: "printTable",
        },
    ];

    const headers = [
        "Student Name",
        "Roll No",
        "Department",
        "Amount",
        "Status",
        "Date",
    ];
    const data = [
        {
            "Student Name": "Aarav Sharma",
            "Roll No": "CSE101",
            Department: "Computer Science",
            Amount: "$1200",
            Status: "Paid",
            Date: "2025-10-01",
        },
        {
            "Student Name": "Priya Patel",
            "Roll No": "CSE102",
            Department: "Computer Science",
            Amount: "$1100",
            Status: "Pending",
            Date: "2025-10-05",
        },
        {
            "Student Name": "Rahul Verma",
            "Roll No": "ECE203",
            Department: "Electronics",
            Amount: "$1250",
            Status: "Paid",
            Date: "2025-10-08",
        },
        {
            "Student Name": "Neha Singh",
            "Roll No": "ME205",
            Department: "Mechanical",
            Amount: "$1150",
            Status: "Overdue",
            Date: "2025-10-10",
        },
        {
            "Student Name": "Rohan Das",
            "Roll No": "IT210",
            Department: "Information Tech",
            Amount: "$1300",
            Status: "Paid",
            Date: "2025-10-12",
        },
        {
            "Student Name": "Ishika Mehta",
            "Roll No": "CSE115",
            Department: "Computer Science",
            Amount: "$1000",
            Status: "Pending",
            Date: "2025-10-15",
        },
    ];

    return (
        <div className="p-8 bg-gray-50 min-h-screen space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Fee Management</h1>
            <Card className="bg-white rounded-2xl shadow-md p-6">
                <Typography variant="h5" fontWeight="bold" className="mb-4">
                    Fee Status Overview
                </Typography>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard title="Total Collection" value="$250,000" />
                    <StatCard title="Pending" value="$50,000" />
                    <StatCard title="Overdue" value="$10,000" color="text-red-500" />
                    <StatCard title="Collection Rate" value="83%" color="text-green-500" />
                </div>
                <FeeDashboard />
            </Card>
            <div className="flex flex-col lg:flex-row  gap-6">
                <div className="flex-[1.5]">
                    <Form type="feemanagement" />
                </div>
                <div className="w-full lg:w-1/3 flex flex-col gap-6">
                    <Card className="shadow-md rounded-2xl gap-4">
                        <CardContent>
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                gutterBottom
                                className="mb-3"
                            >
                                Receipt & Invoice Management
                            </Typography>

                            <div className="flex flex-col gap-3">
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    startIcon={<ReceiptLong />}
                                    sx={{
                                        textTransform: "none",
                                        fontWeight: 600,
                                        borderRadius: 2,
                                        py: 1.2,
                                    }}
                                >
                                    Record Payment
                                </Button>

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="inherit"
                                    startIcon={<Print />}
                                    sx={{
                                        borderColor: '#f8f9fb',
                                        textTransform: "none",
                                        fontWeight: 600,
                                        borderRadius: 2,
                                        py: 1.2,
                                        backgroundColor: "#f8f9fb",
                                    }}
                                >
                                    View History
                                </Button>

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="inherit"
                                    startIcon={<Download />}
                                    sx={{
                                        borderColor: "#f8f9fb",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        borderRadius: 2,
                                        py: 1.2,
                                        backgroundColor: "#f8f9fb",
                                    }}
                                >
                                    Send Reminder
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="shadow-md rounded-2xl">
                        <CardContent>
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                gutterBottom
                                className="mb-3"
                            >
                                Reports & Analytics
                            </Typography>

                            <Select
                                fullWidth
                                value={reportType}
                                onChange={(e) => setReportType(e.target.value)}
                                size="small"
                                className="mb-4"
                            >
                                <MenuItem value="Daily Collection Report">
                                    Daily Collection Report
                                </MenuItem>
                                <MenuItem value="Monthly Summary">Monthly Summary</MenuItem>
                                <MenuItem value="Pending Fee Report">Pending Fee Report</MenuItem>
                            </Select>

                            <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                                sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2 }}
                            >
                                Create Custom Report
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <TableComponent
                topHeader={topHeader}
                headers={headers}
                data={data}
                pagination
                checkBox
                styles={{
                    borderRadius: 2,
                    width: '100%',
                }}
                clickableFields={["Student Name"]}
                colors={[
                    { label: "Paid", bg: "#e0f7e9", hoverBg: "#c3eccf" },
                    { label: "Pending", bg: "#fff3cd", hoverBg: "#ffe69c" },
                    { label: "Overdue", bg: "#f8d7da", hoverBg: "#f1b0b7" },
                ]}
            />
        </div>
    );
}
