import React from "react";
import { Box, Paper, Typography, Stack, Avatar } from "@mui/material";
import { MdLogin, MdLogout } from "react-icons/md";

const InsOuts = ({ logs }) => {
  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
          fontSize: {
            xs: "1.1rem",
            sm: "1.18rem",
            md: "1.2rem",
            lg: "1.35rem",
          },
          mb: 2,
          color: "text.primary",
        }}
      >
        Today's Check-ins/Check-outs
      </Typography>

      <Paper
        sx={{
          flex: 1,
          p: 2,
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
          },
        }}
      >
        <Stack spacing={3}>
          {logs.map((log, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <Avatar
                sx={{
                  backgroundColor: log.type === "in" ? "#dcfce7" : "#fee2e2",
                  color: log.type === "in" ? "#5eba67" : "#e13939",
                  width: { xs: 36, sm: 40, md: 44, lg: 48 },
                  height: { xs: 36, sm: 40, md: 44, lg: 48 },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {log.type === "in" ? (
                  <MdLogin size={25} />
                ) : (
                  <MdLogout size={25} />
                )}
              </Avatar>
              <Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "0.8rem",
                      sm: "0.85rem",
                      md: "0.9rem",
                      lg: "1rem",
                    },
                    color: "text.primary",
                    fontWeight: 500,
                  }}
                >
                  <strong>{log.user}</strong>{" "}
                  {log.type === "in" ? "checked in" : "checked out"}
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "0.65rem",
                      sm: "0.7rem",
                      md: "0.75rem",
                      lg: "0.8rem",
                    },
                    color: "text.secondary",
                  }}
                  color="text.secondary"
                >
                  {log.session} - {log.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};

export default InsOuts;
