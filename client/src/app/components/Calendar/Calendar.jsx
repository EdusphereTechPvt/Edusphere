"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Tooltip,
  TextField,
  Chip,
  MenuItem,
  Alert,
  Button,
} from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, isSameDay, addDays, isWithinInterval } from "date-fns";
import {
  Payment as PaymentIcon,
  Notifications as ReminderIcon,
  BeachAccess as HolidayIcon,
  Event as EventIcon,
  ClearAll,
  Cancel,
} from "@mui/icons-material";

const Calendar = ({
  initialSelectedDates = [],
  onDatesChange,
  showSelectedSummary = true,
  selectionMode: externalSelectionMode = "multiple",
  dateType: externalDateType = "payment",
}) => {
  const [selectedDates, setSelectedDates] = useState(initialSelectedDates);
  const [selectionMode, setSelectionMode] = useState(externalSelectionMode);
  const [currentDateType, setCurrentDateType] = useState(externalDateType);
  const [dateLabel, setDateLabel] = useState("");
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);

  const dateTypes = {
    payment: { label: "Payment", color: "#d32f2f", light: "#ffcdd2", icon: <PaymentIcon fontSize="small" /> },
    reminder: { label: "Reminder", color: "#1976d2", light: "#bbdefb", icon: <ReminderIcon fontSize="small" /> },
    holiday: { label: "Holiday", color: "#f57c00", light: "#ffe0b2", icon: <HolidayIcon fontSize="small" /> },
    event: { label: "Event", color: "#388e3c", light: "#c8e6c9", icon: <EventIcon fontSize="small" /> },
  };

  const isDateSelected = (date) => selectedDates.some((d) => isSameDay(d.date, date));
  const getDateType = (date) => selectedDates.find((d) => isSameDay(d.date, date))?.type;

  const handleDateSelect = (date) => {
    if (selectionMode === "range") {
      if (!rangeStart) return setRangeStart(date);
      setRangeEnd(date);
      handleRangeConfirm(date);
      return;
    }

    if (selectionMode === "multiple") {
      setSelectedDates((prev) =>
        isDateSelected(date)
          ? prev.filter((d) => !isSameDay(d.date, date))
          : [...prev, { date, type: currentDateType, label: dateLabel || dateTypes[currentDateType].label }]
      );
    } else {
      setSelectedDates([{ date, type: currentDateType, label: dateLabel || dateTypes[currentDateType].label }]);
    }
    setDateLabel("");
  };

  const handleRangeConfirm = (endDate) => {
    if (!rangeStart) return;
    const range = [];
    let current = rangeStart;
    while (current <= endDate) {
      range.push({
        date: new Date(current),
        type: currentDateType,
        label: dateLabel || `${format(rangeStart, "MMM dd")} - ${format(endDate, "MMM dd")}`,
      });
      current = addDays(current, 1);
    }
    setSelectedDates((prev) => [...prev, ...range]);
    setRangeStart(null);
    setRangeEnd(null);
    setDateLabel("");
  };

  const handleClearAll = () => {
    setSelectedDates([]);
    setRangeStart(null);
    setRangeEnd(null);
  };

  const handleRemoveDate = (dateToRemove) => {
    setSelectedDates((prev) => prev.filter((item) => !isSameDay(item.date, dateToRemove)));
  };

  const CustomDay = (props) => {
    const { day, outsideCurrentMonth } = props;
    const date = day;
    const isSelected = isDateSelected(date);
    const dateType = getDateType(date);
    const isInRange = rangeStart && rangeEnd && isWithinInterval(date, { start: rangeStart, end: rangeEnd });
    const isRangeStart = rangeStart && isSameDay(date, rangeStart);
    const isRangeEnd = rangeEnd && isSameDay(date, rangeEnd);

    const color = dateType ? dateTypes[dateType].color : "#ccc";
    const lightColor = dateType ? dateTypes[dateType].light : "#f0f0f0";

    const bgColor =
      isRangeStart || isRangeEnd
        ? color
        : isInRange
        ? lightColor
        : isSelected
        ? color
        : "transparent";

    const textColor =
      isRangeStart || isRangeEnd || isSelected ? "white" : isInRange ? color : "inherit";

    return (
      <Tooltip title={dateType ? dateTypes[dateType].label : "Click to schedule"} arrow>
        <Box
          onClick={() => handleDateSelect(date)}
          sx={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontWeight: isSelected ? "bold" : "normal",
            backgroundColor: bgColor,
            color: textColor,
            transition: "all 0.2s ease",
            "&:hover": { transform: "scale(1.1)", backgroundColor: lightColor },
          }}
        >
          {format(date, "d")}
        </Box>
      </Tooltip>
    );
  };

  useEffect(() => {
    onDatesChange?.(selectedDates);
  }, [selectedDates]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          width: "100%",
          maxWidth: 420,
          borderRadius: 3,
          background: "linear-gradient(180deg, #fff, #fafafa)",
        }}
      >
        {/* Header */}
        <Typography variant="h6" color="primary" gutterBottom>
          Schedule Calendar
        </Typography>

        {/* Dropdown Controls */}
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <TextField
            select
            size="small"
            fullWidth
            label="Selection Mode"
            value={selectionMode}
            onChange={(e) => setSelectionMode(e.target.value)}
          >
            <MenuItem value="single">Single</MenuItem>
            <MenuItem value="multiple">Multiple</MenuItem>
            <MenuItem value="range">Range</MenuItem>
          </TextField>

          <TextField
            select
            size="small"
            fullWidth
            label="Date Type"
            value={currentDateType}
            onChange={(e) => setCurrentDateType(e.target.value)}
          >
            {Object.entries(dateTypes).map(([key, config]) => (
              <MenuItem key={key} value={key}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {config.icon}
                  {config.label}
                </Box>
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Description Input */}
        <TextField
          fullWidth
          size="small"
          label="Description"
          value={dateLabel}
          onChange={(e) => setDateLabel(e.target.value)}
          placeholder="Add description (optional)"
          sx={{ mb: 2 }}
        />

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleClearAll}
            startIcon={<ClearAll />}
          >
            Clear
          </Button>
          {selectionMode === "range" && rangeStart && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setRangeStart(null);
                setRangeEnd(null);
              }}
              startIcon={<Cancel />}
            >
              Cancel Range
            </Button>
          )}
        </Box>

        {/* Range Info */}
        {selectionMode === "range" && rangeStart && (
          <Alert severity="info" sx={{ mb: 2, fontSize: "0.8rem" }}>
            {rangeEnd
              ? `${format(rangeStart, "MMM dd")} - ${format(rangeEnd, "MMM dd")}`
              : `Start: ${format(rangeStart, "MMM dd")}`}
          </Alert>
        )}

        {/* Calendar */}
        <DateCalendar
          showDaysOutsideCurrentMonth
          slots={{ day: CustomDay }}
          sx={{
            "& .MuiPickersCalendarHeader-root": { mb: 1 },
            "& .MuiPickersCalendarHeader-label": { fontWeight: 600 },
          }}
        />
      </Paper>
    </LocalizationProvider>
  );
};

export default Calendar;
