"use client";
import { TableComponent } from "@/app/components/Table/TableComponent";



const handleClick = (rowData) => {
    console.log(rowData);
}
const ClassOverview = () => {
    const sample_headers = ["Student Name", "Student ID", "Attendance Status", "Actions",];
    const topHeader = [
        { type: "text", label: "Class Overview", styles: { fontSize: "1.45rem", fontWeight: "bold" }, },
        { type: "button", label: "Report Absence", action: "reportAbsence", styles: { elementStyles: { backgroundColor: "#f9fafb", color: "#2563eb" }, }, },
    ];
    const sample_data = [
        { "Student Name": "Liam Carter", "Student ID": "987654321", "Attendance Status": "Present", "Actions": "Override" },
        { "Student Name": "Olivia Bennett", "Student ID": "112233445", "Attendance Status": "Absent", "Actions": "Override" },
        { "Student Name": "Noah Foster", "Student ID": "556677889", "Attendance Status": "Present", "Actions": "Override" },
    ];
    return (
        <div className="w-full h-full px-4 py-2">
            <TableComponent
                topHeader={topHeader}
                headers={sample_headers}
                data={sample_data}
                pagination={false}
                clickableFields={["actions"]}
                onClick={handleClick}
                columnStyles={{ "Actions": { color: "blue" } }}
            />
        </div>
    );
};


export default ClassOverview;
