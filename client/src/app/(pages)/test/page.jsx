"use client";
import React from "react";
import { TableComponent } from "../../components/Table/TableComponent";

const Page = () => {
  const topHeader = [
    { type: "text", label: "User Management" },
    { type: "search", placeholder: "Search users..." },
    {
      type: "button",
      label: "Add User",
      action: "addUser",
      variant: "contained",
      Icon: null,
      styles: { elementStyles: { fontSize: "0.85rem" } },
    },
    {
      type: "dropdown",
      name: "gender",
      placeholder: "Select gender",
      items: [
        { id: "male", value: "Male" },
        { id: "female", value: "Female" },
        { id: "other", value: "Other" },
      ],
    },
  ];


  const headers = ["ID", "Name", "Email", "Status"];
  const data = [
    { ID: 1, Name: "Aditya", Email: "aditya@example.com", Status: "Active" },
    { ID: 2, Name: "Rahul", Email: "rahul@example.com", Status: "Inactive" },
    { ID: 3, Name: "Sneha", Email: "sneha@example.com", Status: "Active" },
  ];


  const handleCellClick = (header, value, row) => {
    alert(`Clicked on ${header}: ${row} ${value}`);
    console.log("Row Data:", row);
  };

  return (
    <div className="p-4">
      <TableComponent
        topHeader={topHeader}
        headers={headers}
        data={data}
        clickableFields={["Name", "Email"]}
        onClick={handleCellClick}
        pagination={true}
      />
    </div>
  );
};

export default Page;
