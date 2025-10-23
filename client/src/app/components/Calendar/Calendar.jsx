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
        className="w-80 max-w-full bg-white rounded-lg p-2 shadow-md border-2 border-blue-500"
        sx={{
          '& .MuiYearCalendar-root': {
            '@media (max-width: 640px)': {
              display: 'grid !important',
              gridTemplateColumns: 'repeat(2, 1fr) !important',
              gap: '4px !important',
            },
          },
          '& .MuiMonthCalendar-root': {
            '@media (max-width: 640px)': {
              display: 'grid !important',
              gridTemplateColumns: 'repeat(2, 1fr) !important',
              gap: '4px !important',
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default Calendar;