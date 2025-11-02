"use client";
import React, { useState } from "react";
import { Card, Typography, Box } from "@mui/material";
import FeeBreakdownTable from "./FeeBreakdownTable";
import PaymentHistoryTable from "./PaymentHistoryTable";
import FeeStatusOverview from "./FeeStatusOverview";
import Calendar from "../../components/Calendar/Calendar";
import ScheduledItemsList from "./ScheduledItemsList";

export default function Page() {
  const [scheduledItems, setScheduledItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [view, setView] = useState("all");
  const [activeTab, setActiveTab] = useState(0);

  const handleDatesChange = (selectedDates) => {
    setScheduledItems(selectedDates);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <h1 className="text-4xl md:text-4xl font-bold text-gray-800 mb-8 ml-8 tracking-tight">
        Fee Management
      </h1>
      <div className="container mx-auto px-4">
        <section>
          <FeeStatusOverview />
        </section>
        <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card sx={{ p: 2 }}>
              <FeeBreakdownTable />
            </Card>

            <Card sx={{ p: 2 }}>
              <PaymentHistoryTable />
            </Card>
          <Card sx={{ p: 2 , mt:4}}>
              <ScheduledItemsList
                scheduledItems={scheduledItems}
                setScheduledItems={setScheduledItems}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                view={view}
                setView={setView}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </Card>

          </div>

          <aside className="md:col-span-1">
            <Card
              elevation={3}
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  "& .MuiPaper-root": {
                    width: "100% !important",
                    maxWidth: "100% !important",
                  },
                }}
              >
                <Calendar
                  onDatesChange={handleDatesChange} // ✅ Fixed here
                  showSelectedSummary={true}
                />
              </Box>
            </Card>
          </aside>
        </section>
      </div>
    </main>
  );
}
