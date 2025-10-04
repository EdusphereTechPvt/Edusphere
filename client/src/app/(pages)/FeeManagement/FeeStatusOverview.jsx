"use client";
import React from "react";
import GenericCard from "../../components/CardComponent/GenericCard";
import { Box } from "@mui/material";

const FeeStatusOverview = () => {
    return (
    <Box
        sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 2,
            backgroundColor: "#f9fafb",
            padding: "20px",
            borderRadius: "12px",
        }}
    >
        <GenericCard
            title="Total Due Now"
            desc="$250.00"
            additionalInfo={[{ overdue: "Overdue by 5 days" }]}
            styles={{
            cardStyle: {
                inlineStyle: {
                flex: "1",
                minWidth: "240px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                padding: "20px",
                textAlign: "left",
                alignItems: "flex-start",
                },
            },
            textContainerStyle: {
                titleStyle: {
                inlineStyle: {
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "#6b7280",
                    marginBottom: "4px",
                },
                },
                descStyle: {
                inlineStyle: {
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    color: "#d97706",
                    marginBottom: "4px",
                },
                },
                additionalInfoStyle: {
                overdue: {
                    inlineStyle: {
                    fontSize: "0.9rem",
                    color: "#6b7280",
                    },
                },
                },
            },
            }}
        />

        {/* Card 2 - Total Upcoming */}
        <GenericCard
            title="Total Upcoming"
            desc="$500.00"
            additionalInfo={[{ due: "Due in 15 days" }]}
            styles={{
            cardStyle: {
                inlineStyle: {
                flex: "1",
                minWidth: "240px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                padding: "20px",
                textAlign: "left",
                alignItems: "flex-start",
                },
            },
            textContainerStyle: {
                titleStyle: {
                inlineStyle: {
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "#6b7280",
                    marginBottom: "4px",
                },
                },
                descStyle: {
                inlineStyle: {
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    color: "#2563eb",
                    marginBottom: "4px",
                },
                },
                additionalInfoStyle: {
                due: {
                    inlineStyle: {
                    fontSize: "0.9rem",
                    color: "#6b7280",
                    },
                },
                },
            },
            }}
        />

      {/* Card 3 - Total Paid */}
      <GenericCard
        title="Total Paid (This Term)"
        desc="$1200.00"
        additionalInfo={[{ paid: "Last paid on Mar 1, 2024" }]}
        styles={{
          cardStyle: {
            inlineStyle: {
              flex: "1",
              minWidth: "240px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              padding: "20px",
              textAlign: "left",
              alignItems: "flex-start",
            },
          },
          textContainerStyle: {
            titleStyle: {
              inlineStyle: {
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "#6b7280",
                marginBottom: "4px",
              },
            },
            descStyle: {
              inlineStyle: {
                fontSize: "1.8rem",
                fontWeight: 700,
                color: "#16a34a",
                marginBottom: "4px",
              },
            },
            additionalInfoStyle: {
              paid: {
                inlineStyle: {
                  fontSize: "0.9rem",
                  color: "#6b7280",
                },
              },
            },
          },
        }}
      />

      {/* Card 4 - Payment Status */}
      <GenericCard
        title="Payment Status"
        desc="Partially Overdue"
        additionalInfo={[{ items: "1 of 3 items overdue" }]}
        styles={{
          cardStyle: {
            inlineStyle: {
              flex: "1",
              minWidth: "240px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              padding: "20px",
              textAlign: "left",
              alignItems: "flex-start",
            },
          },
          textContainerStyle: {
            titleStyle: {
              inlineStyle: {
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "#6b7280",
                marginBottom: "4px",
              },
            },
            descStyle: {
              inlineStyle: {
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "#dc2626",
                marginBottom: "4px",
              },
            },
            additionalInfoStyle: {
              items: {
                inlineStyle: {
                  fontSize: "0.9rem",
                  color: "#6b7280",
                },
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default FeeStatusOverview;
