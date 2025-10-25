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
  format = "MM-DD-YYYY",
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
    if (!value) {
      setSelectedDate(null);
    } else if (dayjs(value, format, true).isValid()) {
      setSelectedDate(dayjs(value, format));
    } else if (dayjs(value).isValid()) {
      setSelectedDate(dayjs(value));
    } else {
      setSelectedDate(null);
    }
  }, [value, format]);

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
        minDate={minDate ? dayjs(minDate) : undefined}
  maxDate={maxDate ? dayjs(maxDate) : undefined}
        onError={onError}
        views={["year", "month", "day"]}
        slotProps={{
          textField: {
            fullWidth: true,
            size: "small",
            inputProps: { placeholder: format.toUpperCase() },
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
