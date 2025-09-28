"use client";
import React, { useState } from "react";
import TopCards from "./TopCards";
import StudentFilters from "./Student_Selection";
import { TableComponent } from "@/app/components/Table/TableComponent";

export default function Page() {
    const onBulkOperation = () => { console.log(`Performing bulk operation on selected students`); };
    const onSendReminder = () => { console.log("Sending reminders to selected students"); };
    const cardsData = [
        { title: "Total Collected", desc: "$250,000" },
        { title: "Pending Amount", desc: "$50,000" },
        { title: "Collection Rate", desc: "83%" },
    ];
    const Data = {
        students: [{
            id: 1,
            name: "Aarav",
            parentName: "Mr. Sharma",
            class: "1",
            section: "A",
            status: "paid",
            category: "sc",
        },
        {
            id: 2,
            name: "Ishita",
            parentName: "Mrs.Verma",
            class: "2",
            section: "B",
            status: "unpaid",
            category: "general",
        },
        {
            id: 3,
            name: "Rohan",
            parentName: "Mr. Gupta",
            class: "1",
            section: "A",
            status: "inprocess",
            category: "general",
        },
        {
            id: 4,
            name: "vansh",
            parentName: "Mr. Kapoor",
            class: "2",
            section: "A",
            status: "inprocess",
            category: "general",
        },
        {
            id: 5,
            name: "krish",
            parentName: "Mr. arya",
            class: "2",
            section: "c",
            status: "inprocess",
            category: "general",
        },
        {
            id: 6,
            name: "Ananya",
            parentName: "Mr. singhal",
            class: "2",
            section: "A",
            status: "inprocess",
            category: "general",
        },
        {
            id: 7,
            name: "Vasu",
            parentName: "Mr. singhal",
            class: "6",
            section: "A",
            status: "inprocess",
            category: "general",
        },
        {
            id: 8,
            name: "Vasu",
            parentName: "Mr. singhal",
            class: "6",
            section: "A",
            status: "inprocess",
            category: "general",
        },
        {
            id: 9,
            name: "Vasu",
            parentName: "Mr. singhal",
            class: "6",
            section: "A",
            status: "inprocess",
            category: "general",
        },
        {
            id: 10,
            name: "Vasu",
            parentName: "Mr. singhal",
            class: "6",
            section: "A",
            status: "inprocess",
            category: "general",
        },
        {
            id: 11,
            name: "Vasu",
            parentName: "Mr. singhal",
            class: "6",
            section: "A",
            status: "inprocess",
            category: "general",
        },
        {
            id: 12,
            name: "Vasu",
            parentName: "Mr. singhal",
            class: "6",
            section: "A",
            status: "inprocess",
            category: "general",
        },
        {
            id: 13,
            name: "Vasu",
            parentName: "Mr. singhal",
            class: "6",
            section: "A",
            status: "inprocess",
            category: "general",
        },
        ],
        classes: ["2", "10", "11", "6"],
        sections: ["A", "B"],
        statuses: ["paid", "inprocess", "unpaid"],
        categories: ["general", "obc", "sc"]
    };

    const [filteredStudents, setFilteredStudents] = useState(Data.students);

    return (
        <div className="p-6 space-y-6">
            <TopCards cardsData={cardsData} />
            <StudentFilters
                data={Data}
                onBulkOperation={onBulkOperation}
                onSendReminder={onSendReminder}
                onfilter={setFilteredStudents} />

            <h3 className="text-lg font-semibold mb-3">Filtered Students</h3>
            <div className="mt-6">
                <TableComponent
                    headers={["ID", "Name", "Parent Name", "Class", "Section", "Category", "Status"]}
                    data={filteredStudents.map((s) => ({
                        ID: s.id,
                        Name: s.name,
                        "Parent Name": s.parentName,
                        Class: s.class,
                        Section: s.section,
                        Category: s.category,
                        Status: s.status,
                    }))}
                    pagination={false} />
            </div>
        </div>
    );
}
