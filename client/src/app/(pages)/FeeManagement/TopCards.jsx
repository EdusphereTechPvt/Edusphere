"use client";
import React from "react";
import { Grid } from "@mui/material";
import GenericCard from "@/app/components/CardComponent/GenericCard"; 

const TopCards = ({ cardsData = [] }) => {
  return (
    <Grid container spacing={2}>
      {cardsData.map((card, index) => (
        <Grid size={{ xs: 12, sm:6, md: 4 }} key={index}>
          <GenericCard
            title={card.title}
            desc={card.desc}
            styles={{
              cardStyle: {
                inlineStyle: {
                  maxWidth: "100%",
                  minHeight: 100,
                  justifyContent: "center",
                },
              },
              textContainerStyle: {
                titleStyle: {
                  inlineStyle: { fontSize: "0.85rem", color: "gray-500" },
                },
                descStyle: {
                  inlineStyle: {
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "gray-900",
                  },
                },
              },
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
