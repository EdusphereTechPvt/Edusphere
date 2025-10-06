"use client";

import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { Box, TextField, IconButton, Button, Typography } from "@mui/material";
import DateTimePicker from "../DateTimePicker/DateTimePicker";
import { Add, Delete } from "@mui/icons-material";

const MultiFiled = ({
  label = "",
  btnText = "",
  DropdownData = {
    placeholder: "",
    items: [],
  },
  inputData = {
    label: "Amount",
    placeholder: "1000",
  },
  onChange,
}) => {
  const [fields, setFields] = useState([
    { category: DropdownData.items[0]?.id || "", amount: "", date: null },
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
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        {fields.map((field, idx) => (
          <Box
            key={idx}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1,
              alignItems: { xs: "", sm: "center" },
              justifyContent: "center",
              // maxWidth: "100%",
            }}
          >
            {/* Dropdown */}
            <Box sx={{ minWidth: "40%", width: "100%" }}>
              <Dropdown
                data={DropdownData}
                style={{ inlineStyle: { mt: 0, mb: 0 } }}
                value={field.category}
                onSelect={(value) => handleFieldChange(idx, "category", value)}
              />
            </Box>

            {/* input */}
            <Box sx={{ minWidth: "30%" }}>
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

            <DateTimePicker
              label="Time"
              value={field.date}
              onChange={(value) => handleFieldChange(idx, "date", value)}
              sx={{ width: "100%", minWidth: "30%", pl: 1 }}
            />
            {/* btn */}
            <Button
              disabled={idx === 0}
              variant="outlined"
              sx={{
                ml: 0.1,
                mr: -1,
                p: "7px",
                borderRadius: "5px",
                width: { xs: "100%", sm: "0%" },
                bgcolor: "error.main",
                color: "white",
                border: "none",
                justifyContent: "center",
                transition: "all 0.3s ease",

                "&:hover": {
                  bgcolor: "error.dark",
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
                },

                "&.Mui-disabled": {
                  bgcolor:'grey.500',
                  color: "white",
                  opacity: 0.6,
                },
              }}
              onClick={() => handleDeleteField(idx)}
            >
              <Delete
                sx={{
                  fontSize: "1.5rem",
                }}
              />
            </Button>
          </Box>
        ))}
      </Box>

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
