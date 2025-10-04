"use client";
import React from "react";
import { TableComponent } from "../../components/Table/TableComponent"; 

const FeeBreakdownTable = () => {
    const headers = ["Due Date", "Fee Type", "Amount", "Status", ""];
    const data = [
    {
        "Due Date": "2024-03-15",
        "Fee Type": "Tuition Fee",
        "Amount": "$150.00",
        "Status": "Overdue",
        "Action": "View Receipt"
    },
    {
        "Due Date": "2024-04-15", 
        "Fee Type": "Activity Fee",
        "Amount": "$100.00",
        "Status": "Due",
        "Action": "View Receipt"
    },
    {
        "Due Date": "2024-02-15",
        "Fee Type": "Library Fee", 
        "Amount": "$50.00",
        "Status": "Paid",
        "Action": "View Receipt"
    }
];


  const columnStyles = {
    "Amount": { fontWeight: "bold" }
  };

  const handleViewReceipt = (header, value) => {
    if (header === "Action" && value === "View Receipt") {
      
      console.log("View receipt clicked");

    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Detailed Fee Breakdown</h2>
      
      <TableComponent
        headers={headers}
        data={data}
        type="fee-breakdown"
        onClick={handleViewReceipt}
        pagination={false}
        columnStyles={columnStyles}
        clickableFields={["action"]}
        styles={{
          headerCell: { 
            backgroundColor: "#F9FAFB",
            fontWeight: 600,
            color: "#374151"
          }
        }}
      />
    </div>
  );
};

export default FeeBreakdownTable;