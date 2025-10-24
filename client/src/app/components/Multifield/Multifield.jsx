"use client";

import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { Box, TextField, IconButton, Button, Typography } from "@mui/material";
import DateTimePicker from "../DateTimePicker/DateTimePicker";
import { Add, Delete } from "@mui/icons-material";
import DebouncedTextField from "./DebouncedTextField";

const MultiFiled = ({
  fields: fieldConfig = [
    { type: 'dropdown', key: 'category', placeholder: "New Category Name", items: [
      { id: "Event", value: "Event" },
      { id: "Class", value: "Class" },
      { id: "session", value: "Session" },
    ] },
    { type: 'input', key: 'amount', label: "Amount", placeholder: "1000" },
    { type: 'datetime', key: 'date', label: "Date & Time" },
  ],
  label,
  btnText = "add",
  minfields = 2,
  maxfields,
  initialFieldCount = 2,
  debounceDelay = 5000,
  onChange,
}) => {

  const createEmptyField = () => {
    const emptyField = {
      _id: Date.now() + Math.random(),
    };
    fieldConfig.forEach(field => {
      emptyField[field.key] = field.type === 'datetime' ? null : '';
    });
    return emptyField;
  };
  const [fields, setFields] = useState(
    Array.from({ length: initialFieldCount }, () => createEmptyField())
  );

  const maxFields = maxfields > 3 ? maxfields : fieldConfig[0].items.length;

  const effectiveMaxFields = maxFields ||
    fieldConfig.find(f => f.type === 'dropdown')?.items?.length;

  const handleAddField = () => {
    if (fields.length < effectiveMaxFields) {
      setFields([...fields, createEmptyField()]);
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

  const renderField = (fieldDef, field, idx) => {
    switch (fieldDef.type) {
      case 'dropdown':
        return (
          <Box key={`${fieldDef.key}-${idx}`} sx={{ width: { xs: "100%", sm: "35%" } }}>
            <Dropdown
              data={{
                placeholder: fieldDef.placeholder || "",
                items: fieldDef.items || [],
              }}
              style={{ inlineStyle: { mt: 0, mb: 0 } }}
              value={field[fieldDef.key]}
              onSelect={(value) => handleFieldChange(idx, fieldDef.key, value)}
            />
          </Box>
        );

      case 'input':
        return (
          <Box key={`${fieldDef.key}-${idx}`} sx={{ width: { xs: "100%", sm: "25%" } }}>
            <DebouncedTextField
              label={fieldDef.label || ""}
              placeholder={fieldDef.placeholder || inputData.placeholder}
              fullWidth
              size="small"
              variant="outlined"
              value={field[fieldDef.key]}
              onChange={(value) =>
                handleFieldChange(idx, fieldDef.key, value)
              }
              debounceDelay={debounceDelay}
            />
          </Box>
        );

      case 'datetime':
        return (
          <Box key={`${fieldDef.key}-${idx}`}>
            <DateTimePicker
              label={fieldDef.label || ""}
              value={field[fieldDef.key]}
              onChange={(value) => handleFieldChange(idx, fieldDef.key, value)}
              sx={{ width: { xs: "100%", sm: "28%" } }}
            />
          </Box>
        );

      default:
        return null;
    }
  };
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
            key={field._id}
            sx={{ display: "flex", gap: 1, alignItems: "center", width: "100%" }}
          >
            {fieldConfig.map((fieldDef) => renderField(fieldDef, field, idx))}

            {fields.length && (
              <IconButton
                onClick={() => handleDeleteField(idx)}
                size="small"
                disabled={idx < minfields}
              >
                <Delete sx={{ fontSize: "1.7rem", color: "grey.500", cursor:"pointer"}} />
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