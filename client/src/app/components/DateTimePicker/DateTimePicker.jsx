"use client";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker as MuiDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const DateTimePicker = ({
  label,
  value,
  onChange,
  minDateTime = null,
  disabled = false,
  styles = {},
  sx = {},
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDateTimePicker
        label={label}
        value={value || null}
        onChange={(newValue) => onChange(newValue)}
        minDateTime={minDateTime}
        disabled={disabled}
        sx={{
          width: styles.width || "100%",
          ...sx,
        }}
        slotProps={{
          textField: {
            size: "small",
            sx: {
              "& .MuiInputBase-root": {
                paddingTop: "4px",
                paddingBottom: "4px",
                height: "40px",
              },
              "& .MuiInputLabel-shrink": {
                top: "0px",
              },
              ...styles.textField,
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DateTimePicker;
