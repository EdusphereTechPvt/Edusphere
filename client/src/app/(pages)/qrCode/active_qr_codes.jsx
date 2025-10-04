"use client";
import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Stack, Chip } from "@mui/material";
import { formatLabel } from "@/app/utils/Format";

const ActiveQR = ({ sessions }) => {
  
  // useEffect(() => {
  //   const fetchSessions = async () => {
  //     try {
  //       const fetchResponse = await fetch(
  //         `${process.env.NEXT_PUBLIC_BACKEND_API}/qr/search`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({}),
  //         }
  //       );

  //       if (!fetchResponse.ok) throw new Error("Failed to fetch sessions");

  //       const fetchResult = await fetchResponse.json();
  //       console.log("All Sessions:", fetchResult.data);
  //       setSessions(fetchResult.data);
  //     } catch (error) {
  //       console.error("Error fetching sessions:", error);
  //     }
  //   };

  //   fetchSessions();
  // }, []); //move it to page.jsx as it depends on qrcode management it should run after adding new

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
          },
        }}
      >
        {sessions?.length === 0 ? (
          <Typography
            sx={{
              textAlign: "center",
              color: "grey.500",
              fontSize: {
                xs: "0.75rem",
                sm: "0.8rem",
                md: "0.85rem",
                lg: "0.9rem",
              },
              py: 4,
            }}
          >
            No active QR sessions found.
          </Typography>
        ) : (
          <Stack spacing={1.5}>
            {sessions?.map((session, index) => {
              const isActive =
                !session.expired && new Date(session.endDate) > new Date();

              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: isActive ? "success.light" : "#94a3b8",
                    backgroundColor: isActive ? "#f0fdf4" : "grey.50",
                  }}
                >
                  <Box>
                    <Typography
                      fontWeight={600}
                      sx={{
                        mb: 0.3,
                        color: isActive ? "success.dark" : "grey.700",
                        fontSize: {
                          xs: "0.75rem",
                          sm: "0.8rem",
                          md: "0.89rem",
                          lg: "0.95rem",
                        },
                      }}
                    >
                      {session.sessionName}
                    </Typography>
                    <Typography
                      sx={{
                        color: isActive ? "success.light" : "grey.500",
                        fontSize: {
                          xs: "0.7rem",
                          sm: "0.75rem",
                          md: "0.85rem",
                          lg: "0.9rem",
                        },
                      }}
                    >
                      {formatLabel(session.sessionType)} | Duration:{" "}
                      {session.duration} min
                    </Typography>
                    <Typography
                      sx={{
                        color: "grey.500",
                        fontSize: {
                          xs: "0.65rem",
                          sm: "0.7rem",
                          md: "0.75rem",
                          lg: "0.8rem",
                        },
                      }}
                    >
                      {new Date(session.startDate).toLocaleString()} -{" "}
                      {new Date(session.endDate).toLocaleString()}
                    </Typography>
                  </Box>

                  <Box>
                    <Chip
                      label={isActive ? "Active" : "Inactive"}
                      size="small"
                      sx={{
                        bgcolor: "transparent",
                        border: "none",
                        color: isActive ? "green" : "grey.600",
                        fontWeight: 600,
                        fontSize: {
                          xs: "0.7rem",
                          sm: "0.75rem",
                          md: "0.85rem",
                          lg: "0.9rem",
                        },
                        height: "auto",
                      }}
                    />
                  </Box>
                </Box>
              );
            })}
          </Stack>
        )}
      </Paper>
    </Box>
  );
};

export default ActiveQR;
