"use client";
import React from "react";
import { TableComponent } from "../../components/Table/TableComponent";

const PaymentHistoryTable = () => {

  const headers = ["Date", "Transaction ID", "Description", "Amount", "Status"];


  const data = [
    {
      "Date": "2024-02-15",
      "Transaction ID": "TXN12345",
      "Description": "Tuition Fee Payment",
      "Amount": "$150.00",
      "Status": "Success"
    },
    {
      "Date": "2024-01-15",
      "Transaction ID": "TXN67890",
      "Description": "Activity Fee Payment",
      "Amount": "$100.00",
      "Status": "Failed"
    }
  ];


  const columnStyles = {
    "Amount": { fontWeight: "bold" },
    "Transaction ID": { fontFamily: "monospace" }
  };

  
  const handleRowClick = (header, value) => {
    console.log("Clicked:", header, value);
    
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Payment History & Transaction Ledger</h2>
      
      <TableComponent
        headers={headers}
        data={data}
        type="payment-history"
        onClick={handleRowClick}
        pagination={false}
        columnStyles={columnStyles}
        clickableFields={[]}
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

export default PaymentHistoryTable;