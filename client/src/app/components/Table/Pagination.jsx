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
}) => {
  const totalPages = Math.ceil(totalValues / limit);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // column on mobile, row on bigger screens
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      {RowBtn && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
            width: { xs: "100%", sm: "auto" }, // full width on mobile
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "gray",
              fontSize: { xs: "0.8rem", sm: "0.88rem" },
            }}
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
              // minWidth: { xs: "100%", sm: 80 },
              backgroundColor: "white",
              color: "black",
              fontSize: { xs: "0.8rem", sm: "0.88rem" },
              fontWeight: "500",
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
              <MenuItem
                key={rows}
                sx={{ bgcolor: "white", color: "black" }}
                value={rows}
              >
                {rows}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}

      {/* Pagination */}
      <Stack
        spacing={2}
        sx={{
          width: { xs: "100%", sm: "auto" }, // full width pagination on mobile
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          siblingCount={0}
          boundaryCount={1}
          onChange={(_, value) => setPage(value)}
          color="primary"
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-end" }, // center on mobile, right on desktop
            backgroundColor: "#fff",
            border: "1px solid #d9d7d7",
            borderRadius: "6px",
            "& .MuiPaginationItem-root": {
              color: "black",
              fontWeight: "500",
              borderRadius: "1px",
              "&.Mui-selected": {
                borderRadius: "6px",
                backgroundColor: "var(--color-primary)",
                color: "white",
              },
              "&:hover": {
                borderRadius: "6px",
              },
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default CustomPagination;