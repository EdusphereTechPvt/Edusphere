"use client";

import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { Box, TextField, IconButton, Button, Typography } from "@mui/material";
import DateTimePicker from "../DateTimePicker/DateTimePicker";
import { Add, Delete } from "@mui/icons-material";

const MultiFiled = ({
  label = "Fee Categories & Amounts",
  btnText = "Add Fee Categories",
  DropdownData = {
    placeholder: "New Category Name",
    items: [
      { id: "Event", value: "Event" },
      { id: "Class", value: "Class" },
      { id: "Class", value: "Class" },
    ],
  },
  inputData = {
    label: "Amout",
    placeholder: "1000",
  },
  onChange,
}) => {
  const [fields, setFields] = useState([
    { category: "", amount: "", date: null },
    { category: "", amount: "", date: null },
  ]);

  const maxFields = DropdownData.items.length;

  const handleAddField = () => {
    if (fields.length < maxFields) {
      setFields([...fields, { category: "", amount: "", date: null }]);
    }
  };

  const handleDeleteField = (index) => {
    const updated = fields.filter((_, i) => i !== index);
    setFields(updated);
  };

  const handleFieldChange = (index, key, value) => {
    const updated = fields.map((field, idx) =>
      idx === index ? { ...field, [key]: value } : field
    );
    setFields(updated);
  };

  useEffect(() => {
    if (onChange) onChange(fields);
  }, [fields, onChange]);

  return (
    <Box>
      {label && (
        <Typography
          sx={{
            mb: 1,
            fontWeight: 600,
            fontSize: {
              xs: "0.75rem",
              sm: "0.85rem",
              md: "0.95rem",
              lg: "1rem",
            },
          }}
        >
          {label}
        </Typography>
      )}
      <div className="space-y-2">
        {fields.map((field, idx) => (
          <Box
            key={idx}
            sx={{ display: "flex", gap: 1, alignItems: "center", width: "80%" }}
          >
            {/* Dropdown */}
            <Box sx={{ width: { xs: "100%", sm: "35%" } }}>
              <Dropdown
                data={DropdownData}
                style={{ inlineStyle: { mt: 0, mb: 0 } }}
                value={field.category}
                onSelect={(value) => handleFieldChange(idx, "category", value)}
              />
            </Box>

            {/* input */}
            <Box sx={{ width: { xs: "100%", sm: "25%" } }}>
              <TextField
                label={inputData.label}
                placeholder={inputData.placeholder}
                fullWidth
                size="small"
                variant="outlined"
                value={field.amount}
                onChange={(e) =>
                  handleFieldChange(idx, "amount", e.target.value)
                }
              />
            </Box>

            {/* datePicker */}
            <Box sx={{ width: { xs: "100%", sm: "28%" } }}>
              <DateTimePicker
                label="Time"
                value={field.date}
                onChange={(value) => handleFieldChange(idx, "date", value)}
                sx={{ width: "100%" }}
              />
            </Box>

            {/* btn */}
            {idx > 1 && (
              <IconButton onClick={() => handleDeleteField(idx)}>
                <Delete sx={{ fontSize: "1.7rem", color: "grey.500" }} />
              </IconButton>
            )}
          </Box>
        ))}
      </div>

      {btnText && (
        <Button
          startIcon={<Add />}
          onClick={handleAddField}
          sx={{
            color: "#1976d2",
            textTransform: "none",
            fontSize: "0.85rem",
            fontWeight: 600,
            pl: 1,
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          {btnText}
        </Button>
      )}
    </Box>
  );
};

export default MultiFiled;