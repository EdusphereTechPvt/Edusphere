"use client";
import React from "react";
import { TableComponent } from "@/app/components/Table/TableComponent";

export default function MySchedulePage() {
    const headers = ["Time", "Class", "Subject", "Students", "Actions"];

    const data = [
        { Time: "9:00 AM - 10:00 AM", Class: "Math 101", Subject: "Algebra", Students: 25, Actions: "View" },
        { Time: "10:15 AM - 11:15 AM", Class: "Science 201", Subject: "Physics", Students: 20, Actions: "View" },
        { Time: "11:30 AM - 12:30 PM", Class: "History 101", Subject: "World History", Students: 30, Actions: "View" },
        { Time: "1:00 PM - 2:00 PM", Class: "English 201", Subject: "Literature", Students: 22, Actions: "View" },
        { Time: "2:15 PM - 3:15 PM", Class: "Art 101", Subject: "Drawing", Students: 18, Actions: "View" },
    ];

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const handleClick = (header, value, row) => {
        if (header === "Actions") alert(`Viewing details for ${row.Class}`);
    };

    return (
        <div className="min-h-full bg-white p-3 sm:p-5 md:p-8 lg:p-10 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed">
            
        <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-[1.9rem] font-semibold text-gray-900 tracking-tight">
            My Schedule
        </h1>
        <p className="text-gray-500 mt-1 text-[12px] sm:text-[13px] md:text-[14px]">
            {today}
        </p>

        <h2 className="text-lg sm:text-lg md:text-xl lg:text-[1.3rem] font-semibold text-gray-800 mt-5 sm:mt-7 mb-3 sm:mb-4">
            Today’s Classes
        </h2>

        
        <div className="overflow-x-auto mb-10 sm:mb-14 md:mb-18 rounded-xl shadow-sm border border-gray-100">
            <TableComponent
            headers={headers}
            data={data}
            onClick={handleClick}
            checkBox={false}
            pagination={false}
            clickableFields={["Actions"]}
            styles={{
                headerCell: {
                fontWeight: 600,
                color: "#374151",
                backgroundColor: "#f9fafb",
                borderBottom: "1px solid #e5e7eb",
                fontSize: "0.9rem",
                },
                bodyCell: {
                fontSize: "0.85rem",
                color: "#111827",
                },
            }}
            columnStyles={{
                Time: { fontWeight: 500 },
            }}
            />
        </div>
    </div>
    );}
