import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Box,
} from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const SearchContainer = styled(Paper)(({ theme }) => ({
  padding: "8px 16px",
  display: "flex",
  alignItems: "center",
  width: "100%",
  maxWidth: 600,
  margin: "20px auto",
  backgroundColor: "#fff",
  // boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  boxShadow: "none",
  // border: `1px solid #e5e5e5`,
}));

const SearchTextField = styled(TextField)({
  width: "100%",
  borderRadius: "0.35rem",
  "& .MuiOutlinedInput-root": {
    height: "2.48rem",
    borderRadius: "0.35rem",
    "& input": {
      height: "100%",
      padding: "0 14px",
      fontSize: "1rem",
      boxSizing: "border-box",
    },
  },
});

const SearchBox = ({
  onSearch,
  placeholder = "Search...",
  delay = 2000,
  style = {},
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const timeoutRef = useRef(null);
  const searchTermRef = useRef(searchTerm);

  useEffect(() => {
    searchTermRef.current = searchTerm;
  }, [searchTerm]);

  const handleSearch = useCallback(() => {
    if (searchTermRef.current.trim() !== "") {
      onSearch(searchTermRef.current.trim());
    }
  }, [onSearch]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      handleSearch();
    }, delay);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onSearch("");
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "5.08rem",
        ...style,
      }}
    >
      <SearchContainer elevation={3}>
        <SearchTextField
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear search"
                  onClick={handleClear}
                  size="small"
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          variant="outlined"
        />
      </SearchContainer>
    </Box>
  );
};

export default SearchBox;