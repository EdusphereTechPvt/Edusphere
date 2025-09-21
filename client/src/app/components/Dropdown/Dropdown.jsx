"use client"
import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  OutlinedInput,
} from "@mui/material";

const Dropdown = ({ data, resetFlag, style = {}, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    onSelect?.(value);
  };

  useEffect(()=>{
    setSelectedValue("")
  },[resetFlag])

  return (
    <Box className={`${style.className}`} sx={{ ...style.inlineStyle }}>
      {data.label && (
        <Box className="text-sm font-medium mb-[0.33rem] text-gray-700">{data.label}</Box>
      )}

      <FormControl
        fullWidth
        size="small"
        required={data.required}
        disabled={data.items.length === 0 || data.disabled}
      >
        <InputLabel id="dropdown-label">{data.placeholder}</InputLabel>

        <Select
          labelId="dropdown-label"
          value={selectedValue || ""}
          onChange={handleChange}
          onClose={() => setIsOpen(false)}
          onOpen={() => setIsOpen(true)}
          open={isOpen}
          label={data.placeholder}
                
          sx={{ borderRadius: "0.35rem", ...style,}}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: "0.35rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                mt: "0.7rem",
              },
            },
          }}
        >
          {data?.items?.map((item, index) => {
            const itemValue = item.value || item;
            const itemLabel = item.label || item;
            return (
              <MenuItem
                key={index}
                value={itemValue}
                sx={{
                  "&:hover": {
                    backgroundColor: "var(--color-secondary)",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "var(--color-primary)",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "var(--color-primary)",
                    },
                  },
                  borderRadius: "0.45rem",
                  mx: "0.25rem",
                }}
              >
                {itemLabel}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;
