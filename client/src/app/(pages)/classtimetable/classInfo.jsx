"use client";
import { Box, Typography } from "@mui/material";

const ClassInfoCard = ({ data }) => {
    const infoItems = [
        { label: "Class Teacher:", value: data.classTeacher, bold: false },
        { label: "Assigned Room:", value: data.assignedroom, bold: false },
        { label: "Total Periods/Week:", value: data.totalperiodsweeks, bold: false },
    ];

    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                p: 2.5,
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}>
            <Typography variant="subtitle1" sx={{fontSize: "1.2rem", fontWeight: 600, mb: 2, color: "text.primary" }}>
                Class Information
            </Typography>
            {infoItems.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: index < infoItems.length - 1 ? 1 : 0,
                    }}>
                    <Typography color="text.secondary">{item.label}</Typography>
                    <Typography sx={{ fontWeight: item.bold ? 600 : 400 }}>
                        {item.value}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default ClassInfoCard;
