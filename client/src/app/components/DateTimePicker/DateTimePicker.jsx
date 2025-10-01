"use client";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker as MuiDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";

const DateTimePicker = ({
  label,
  value,
  onChange,
  minDateTime = null,
  disabled = false,
  styles = {},
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDateTimePicker
        label={label}
        value={value || null}
        onChange={(newValue) => onChange(newValue)}
        minDateTime={minDateTime}
        disabled={disabled}
        slotProps={{
          textField: {
            fullWidth: true,
            margin: "normal",
            sx: {
              
            },
            ...styles.textField,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DateTimePicker;
