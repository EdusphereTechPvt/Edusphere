import { Pagination, Stack, MenuItem, Select, Typography } from "@mui/material";

const CustomPagination = ({  
  RowBtn = true,
  totalValues,
  page,
  setPage,
  limit,
  setLimit, }) => {

    const totalPages = Math.ceil(totalValues / limit);
  return (
    <div className="flex justify-between items-center flex-wrap gap-4">
      {RowBtn && (
        <div className="flex items-center gap-2">
          <Typography variant="body2" className="text-gray-500">
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
              fontSize: "0.88rem",
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
        </div>
      )}

      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={page}
          siblingCount={0}
          boundaryCount={1}
          onChange={(_, value) => setPage(value)}
          color="primary"
          sx={{
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
    </div>
  );
};
export default CustomPagination;