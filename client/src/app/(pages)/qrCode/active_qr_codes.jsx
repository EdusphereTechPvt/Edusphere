import React from "react";
import { Box, Paper, Typography, Stack, Chip } from "@mui/material";

const ActiveQR = ({ sessions }) => {
  // const [hover, setHover] = useState(false)
  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{
          fontSize: {
            xs: "1.1rem",
            sm: "1.18rem",
            md: "1.2rem",
            lg: "1.35rem",
          },
        }}
        gutterBottom
      >
        Active QR Code Sessions
      </Typography>

      <Paper
        sx={{
          flex: 1,
          p: 2,
          borderRadius: 2,
          boxShadow: 1,
          maxHeight: "24rem",
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "transparent transparent",
          transition: "scrollbar-color 0.09s ease",
          "&:hover": {
            scrollbarColor: "#9ca3af #f1f1f1",
          },
          "&::-webkit-scrollbar": {
            width: "6px",
            backgroundColor: "transparent",
          },
          "&:hover::-webkit-scrollbar": {
            backgroundColor: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "transparent",
            borderRadius: "8px",
          },
          "&:hover::-webkit-scrollbar-thumb": {
            backgroundColor: "#9ca3af",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#6b7280",
          }
        }}
      >
        <Stack spacing={1.5}>
          {sessions.map((session, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: session.active ? "success.light" : "#94a3b8",
                backgroundColor: session.active ? "#f0fdf4" : "grey.50",
              }}
            >
              {/* Left side: Title + Location */}
              <Box>
                <Typography
                  fontWeight={600}
                  sx={{
                    mb: 0.3,
                    color: session.active && "success.dark",
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.8rem",
                      md: "0.89rem",
                      lg: "0.95rem",
                    },
                  }}
                >
                  {session.name}
                </Typography>
                <Typography
                  sx={{
                    color: session.active ? "success.light" : "grey.500",
                    fontSize: {
                      xs: "0.7rem",
                      sm: "0.75rem",
                      md: "0.85rem",
                      lg: "0.9rem",
                    },
                  }}
                >
                  {session.location}
                </Typography>
              </Box>

              {/* Right side: Status */}

              <Box>
                <Chip
                  label={session.active ? "Active" : "Inactive"}
                  size="small"
                  sx={{
                    bgcolor: "transparent",
                    border: "none",
                    color: session.active ? "green" : "grey.600",
                    fontWeight: 600,
                    fontSize: {
                      xs: "0.7rem",
                      sm: "0.75rem",
                      md: "0.85rem",
                      lg: "0.9rem",
                    },
                    height: "auto", // adjusts height to text
                  }}
                />
              </Box>
            </Box>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};

export default ActiveQR;
