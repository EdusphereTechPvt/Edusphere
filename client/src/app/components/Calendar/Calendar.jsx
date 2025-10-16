"use client"

import React from "react";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const Calendar = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateCalendar 
        views={['year', 'month', 'day']} 
        showDaysOutsideCurrentMonth
        sx={{
          width: '100%',
          height: '100%',
          '& .MuiDateCalendar-root': {
            width: '100%',
            height: '100%',
          }
        }}
      />
    </LocalizationProvider>
  );
};

export default Calendar;