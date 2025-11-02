"use client";

import React, { useState, useMemo, useEffect } from "react";
import { TextField, Button, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Dropdown from "@/app/components/Dropdown/Dropdown";

const StudentFilters = ({ data, onBulkOperation, onSendReminder, onfilter }) => {
    const [search, setSearch] = useState("");
    const [classFilter, setClassFilter] = useState("");
    const [sectionFilter, setSectionFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    const dropdownConfig = [
        { label: "Class", key: "classes", onSelect: setClassFilter, },
        { label: "Section", key: "sections", onSelect: setSectionFilter, },
        { label: "Status", key: "statuses", onSelect: setStatusFilter, },
        { label: "Category", key: "categories", onSelect: setCategoryFilter, },
    ];
    const filteredStudents = useMemo(() => {
        if (!data?.students) return [];

        let filtered = data.students;

        if (search) {
            filtered = filtered.filter(
                (s) =>
                    s.name.toLowerCase().includes(search.toLowerCase()) ||
                    s.parentName.toLowerCase().includes(search.toLowerCase()) ||
                    s.id.toString().includes(search)
            );
        }

        if (classFilter) filtered = filtered.filter((s) => s.class === classFilter);
        if (sectionFilter) filtered = filtered.filter((s) => s.section === sectionFilter);
        if (statusFilter) filtered = filtered.filter((s) => s.status.toLowerCase() === statusFilter.toLowerCase());
        if (categoryFilter) filtered = filtered.filter((s) => s.category.toLowerCase() === categoryFilter.toLowerCase());

        return filtered;
    }, [search, classFilter, sectionFilter, statusFilter, categoryFilter]);

    useEffect(() => {
        onfilter?.(filteredStudents);
    }, [filteredStudents, onfilter, data?.students]);

    return (
        <Box sx={{ bgcolor: "white", boxShadow: 2, borderRadius: 4, p: 3 }}>
            <h3 className="text-lg font-semibold mb-4">Student Selection & Filters</h3>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(6, 1fr)" },
                    gap: 2,
                    mb: 3,
                }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Search by student name, ID, or parent name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ gridColumn: "span 2" }} />

                {dropdownConfig.map((item) => (
                    <Dropdown
                        key={item.key}
                        data={{
                            placeholder: `All ${item.label}s`,
                            items: [
                                ...(data?.[item.key] || []).map((st) => ({
                                    label: st.charAt(0).toUpperCase() + st.slice(1),
                                    value: st,
                                })),
                            ],
                        }}
                        onSelect={item.onSelect}
                    />
                ))}
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="outlined" onClick={onBulkOperation}>
                    Bulk Operations
                </Button>
                <Button variant="contained" color="primary" onClick={onSendReminder}>
                    Send Reminders
                </Button>
            </Box>
        </Box>
    );
};

export default StudentFilters;