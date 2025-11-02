"use client";

import React from "react";
import {
    Card,
    Typography,
    Box,
    Button,
    Tabs,
    Tab,
    IconButton,
    Tooltip,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";
import {
    Payment,
    Notifications,
    CalendarToday,
    Edit,
    Delete,
} from "@mui/icons-material";
import { format, isAfter, isBefore, isToday } from "date-fns";

const ScheduledItemsList = ({
    scheduledItems,
    setScheduledItems,
    openDialog,
    setOpenDialog,
    selectedItem,
    setSelectedItem,
    view,
    setView,
    activeTab,
    setActiveTab,
}) => {
    const typeConfigs = {
        payment: { color: "#d32f2f", icon: Payment },
        reminder: { color: "#1976d2", icon: Notifications },
        holiday: { color: "#f57c00", icon: CalendarToday },
        event: { color: "#388e3c", icon: CalendarToday },
    };

    const handleAddDetails = (item) => {
        setSelectedItem(item);
        setOpenDialog(true);
    };

    const handleRemoveItem = (itemToRemove) => {
        setScheduledItems((prev) =>
            prev.filter(
                (item) =>
                    !(item.date === itemToRemove.date && item.type === itemToRemove.type)
            )
        );
    };

    const handleSaveDetails = () => {
        if (selectedItem) {
            setScheduledItems((prev) =>
                prev.map((item) =>
                    item.date === selectedItem.date && item.type === selectedItem.type
                        ? { ...item, ...selectedItem }
                        : item
                )
            );
            setOpenDialog(false);
            setSelectedItem(null);
        }
    };

    const filteredItems = scheduledItems.filter((item) => {
        const now = new Date();
        switch (view) {
            case "upcoming":
                return isAfter(item.date, now) || isToday(item.date);
            case "past":
                return isBefore(item.date, now) && !isToday(item.date);
            default:
                return true;
        }
    });

    const getItemsByType = () => {
        const types = ["payment", "reminder", "holiday", "event"];
        return filteredItems.filter((item) => item.type === types[activeTab]);
    };

    const currentItems = getItemsByType();
    const currentType = ["payment", "reminder", "event"][activeTab];

    return (
        <Card sx={{ p: 2, minHeight: 200 }}>
            {/* Header */}
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                    }}
                >
                    <Typography variant="h6">Scheduled Items</Typography>
                    <Chip label={filteredItems.length} color="primary" variant="outlined" />
                </Box>

                <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                    {["all", "upcoming", "past"].map((v) => (
                        <Button
                            key={v}
                            variant={view === v ? "contained" : "outlined"}
                            size="small"
                            onClick={() => setView(v)}
                            sx={{ textTransform: "none" }}
                        >
                            {v}
                        </Button>
                    ))}
                </Box>

                <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
                    <Tab label="Payments" sx={{ textTransform: "none" }} />
                    <Tab label="Reminders" sx={{ textTransform: "none" }} />
                    <Tab label="Events" sx={{ textTransform: "none" }} />
                </Tabs>
            </Box>

            {/* Horizontally Scrollable List */}
            <Box
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    gap: 2,
                    pb: 1,
                    "&::-webkit-scrollbar": { height: 6 },
                    "&::-webkit-scrollbar-thumb": {
                        bgcolor: "rgba(0,0,0,0.2)",
                        borderRadius: 2,
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        bgcolor: "rgba(0,0,0,0.3)",
                    },
                }}
            >
                {currentItems.length === 0 ? (
                    <Typography
                        color="text.secondary"
                        textAlign="center"
                        sx={{ py: 4, width: "100%" }}
                    >
                        No {currentType} scheduled
                    </Typography>
                ) : (
                    currentItems.map((item, index) => {
                        const config = typeConfigs[item.type];
                        const Icon = config.icon;

                        return (
                            <Box
                                key={index}
                                sx={{
                                    flex: "0 0 auto",
                                    width: 300,
                                    border: 1,
                                    borderColor: config.color + "30",
                                    borderRadius: 2,
                                    bgcolor: config.color + "08",
                                    p: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    boxShadow: 1,
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Icon sx={{ color: config.color }} />
                                    <Box>
                                        <Typography fontWeight="600">
                                            {format(item.date, "MMM dd, yyyy")}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.label || item.type}
                                        </Typography>
                                    </Box>
                                </Box>

                                {item.amount && (
                                    <Chip
                                        label={`$${item.amount}`}
                                        size="small"
                                        sx={{
                                            bgcolor: config.color,
                                            color: "white",
                                            mt: 1,
                                            alignSelf: "flex-start",
                                        }}
                                    />
                                )}

                                <Box sx={{ alignSelf: "flex-end", mt: 2 }}>
                                    <Tooltip title="Edit">
                                        <IconButton
                                            size="small"
                                            onClick={() => handleAddDetails(item)}
                                        >
                                            <Edit fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            size="small"
                                            onClick={() => handleRemoveItem(item)}
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                        );
                    })
                )}
            </Box>

            {/* Edit Dialog */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    Edit {selectedItem?.type === "payment" ? "Payment" : "Reminder"}
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Date: {selectedItem && format(selectedItem.date, "MMMM dd, yyyy")}
                    </Typography>

                    <TextField
                        fullWidth
                        label="Description"
                        value={selectedItem?.label || ""}
                        onChange={(e) =>
                            setSelectedItem((prev) => ({ ...prev, label: e.target.value }))
                        }
                        margin="normal"
                    />

                    {selectedItem?.type === "payment" && (
                        <TextField
                            fullWidth
                            label="Amount"
                            type="number"
                            value={selectedItem?.amount || ""}
                            onChange={(e) =>
                                setSelectedItem((prev) => ({
                                    ...prev,
                                    amount: e.target.value,
                                }))
                            }
                            margin="normal"
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleSaveDetails} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default ScheduledItemsList;
