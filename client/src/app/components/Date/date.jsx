"use client";

import React, { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const DateComponent = ({
  value,
  onChange,
  placeholder = "Select Date",
  sx,
  format = "DD/MM/YYYY",
  readOnly = false,
  disabled = false,
  locale = "en",
  minDate = null,
  maxDate = null,
  onError,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const date_formater = (date) => {
    return date ? dayjs(date).format(format) : null;
  };
  useEffect(() => {
    setSelectedDate(value ? dayjs(value) : null);
  }, [value]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (onChange) {
      onChange(date_formater(date));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DatePicker
        label={placeholder || "Select Date"}
        value={selectedDate}
        onChange={handleDateChange}
        format={format}
        readOnly={readOnly}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        onError={onError}
        views={["year", "month", "day"]}
        slotProps={{
          textField: {
            fullWidth: true,
            size: "small",
            InputProps: {
              sx: {
                height: "2.5rem",
                "& input": {
                  height: "100%",
                  boxSizing: "border-box",
                },
              },
            },
          },
        }}
        sx={sx || {}}
      />
    </LocalizationProvider>
  );
};

export default DateComponent;
