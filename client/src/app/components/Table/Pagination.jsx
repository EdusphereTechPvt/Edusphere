import React from "react";
import {
  Pagination,
  Stack,
  MenuItem,
  Select,
  Typography,
  Box,
} from "@mui/material";

const CustomPagination = ({
  RowBtn = true,
  totalValues,
  page,
  setPage,
  limit,
  setLimit,
  selectedRow,
}) => {
  const totalPages = Math.ceil(totalValues / limit);
  const start = (page - 1) * limit + 1;
  const end = Math.min(start + limit - 1, totalValues);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: { xs: "center", sm: "space-between" },
        alignItems: { xs: "flex-start", sm: "center" },
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: "gray",
          fontSize: { xs: "0.75rem", sm: "0.85rem" },
        }}
      >
        {selectedRow && selectedRow > 0
          ? `${selectedRow} Rows are selected out of ${totalValues}`
          : `Showing ${start} to ${end} of ${totalValues} results`}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          // alignItems: { xs: "flex-start", sm: "center" },
          alignItems: "center",
          gap: 2,
          width: { xs: "100%", sm: "auto" },
        }}
      >
        {RowBtn && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "gray", fontSize: { xs: "0.75rem", sm: "0.85rem" } }}
            >
              Rows per page:
            </Typography>
            <Select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              sx={{
                height: 32,
                backgroundColor: "white",
                color: "black",
                fontSize: { xs: "0.75rem", sm: "0.85rem" },
                fontWeight: 500,
                ".MuiSelect-icon": { color: "black" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#d9d7d7",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#6B7280",
                },
              }}
            >
              {[5, 10, 20, 50, 100].map((rows) => (
                <MenuItem key={rows} value={rows}>
                  {rows}
                </MenuItem>
              ))}
            </Select>
          </Box>
        )}

        {/* Pagination */}
        <Stack spacing={2} sx={{ width: "auto" }}>
          <Pagination
            count={totalPages}
            page={page}
            siblingCount={0}
            boundaryCount={1}
            onChange={(_, value) => setPage(value)}
            color="primary"
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-end" },
              backgroundColor: "#fff",
              border: "1px solid #d9d7d7",
              borderRadius: "6px",
              "& .MuiPaginationItem-root": {
                color: "black",
                fontWeight: "500",
                borderRadius: "1px",
                "&.Mui-selected": {
                  borderRadius: "6px",
                  backgroundColor: "#155dfc",
                  color: "white",
                },
                "&:hover": { borderRadius: "6px" },
              },
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default CustomPagination;
