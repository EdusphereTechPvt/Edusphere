"use client";

import { PricingConfig } from "@/app/config/PricingConfig";
import { Box, ButtonGroup, Grid } from "@mui/material";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import { TableComponent } from "@/app/components/Table/TableComponent";
import { DynamicRenderer } from "@/app/utils/DynamicRender";

const Subscription = () => {
  const config = PricingConfig;
  const [period, setPeriod] = useState("monthly");

  const handlePeriodChange = (newPeriod) => {
    if (newPeriod !== null) {
      setPeriod(newPeriod);
    }
  };

  return (
    <Box
      sx={{
        p: "2rem",
        px: { xs: "1.5rem", sm: "2rem", md: "3rem", lg: "4rem" },
        gap: "3rem",
      }}
    >
      {/* header */}
      <div className="lg:mt-10">
        <h1 className="text-xl md:text-5xl font-bold mb-2 text-gray-900 text-center ">
          {config.title}
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">{config.desc}</p>

        <div className="text-center my-8 md:my-16">
          <ButtonGroup
            style={{ background: "#f0f0f0", borderRadius: "50px" }}
            className="m-4 text-center"
          >
            <button
              style={{
                borderRadius: "50px",
                background: period == "monthly" ? "#1975d0" : "#E7EAEE",
                color: period === "monthly" ? "white" : "black",
              }}
              className=" px-6 py-2 font-bold"
              onClick={() => handlePeriodChange("monthly")}
            >
              Monthly
            </button>
            <button
              style={{
                borderRadius: "50px",
                background: period == "annual" ? "#1975d0" : "#E7EAEE",
                color: period === "annual" ? "white" : "black",
              }}
              className=" px-6 py-2 font-bold"
              onClick={() => handlePeriodChange("annual")}
            >
              Annual
            </button>
          </ButtonGroup>
        </div>
      </div>

      {/* cards */}
      <div className="mx-auto ">
        <Grid container spacing={5} justifyContent="center">
          {config.cards.map((card, key) => (
            <div
              key={key}
              style={
                card.title === "Pro"
                  ? { position: "relative", bottom: "1.5rem" }
                  : {}
              }
            >
              {card.title == "Pro" ? (
                <div className="card position-absolute">
                  <div
                    style={{ position: "relative", bottom: "-13px" }}
                    className="text-center lg:w-80 w-75 "
                  >
                    <span
                      style={{
                        borderRadius: "30px",
                        background: "#1976d2",
                        color: "white",
                      }}
                      className="px-5 pt-[3px] pb-[5px]"
                    >
                      Most Popular
                    </span>
                  </div>
                </div>
              ) : null}
              <Card
                className="lg:w-80 w-75 h-100 display-flex align-items p-4"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  border: card.title == "Pro" && "2px solid #1976d2",
                  borderRadius: "12px",
                  boxShadow: "0 0 6px 0px black",
                }}
              >
                <div>
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: 12, lg: 14 },
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      component="div"
                      variant="h5"
                      sx={{
                        fontSize: {
                          xs: "1.2rem",
                          sm: "1.35rem",
                          md: "1.5rem",
                          lg: "1.75rem",
                        },
                      }}
                    >
                      {`${card[period].price} /${
                        period === "monthly" ? "month" : "year"
                      }`}
                    </Typography>
                    <Typography
                      component="div"
                      sx={{
                        color: "text.secondary",
                        mb: 1.5,
                        fontSize: {
                          xs: "0.8rem",
                          sm: "0.85rem",
                          md: "0.9rem",
                          lg: "0.85rem",
                        },
                      }}
                    >
                      {card[period].desc}
                    </Typography>
                    <Typography
                      component="div"
                      sx={{
                        fontSize: {
                          xs: "0.75rem", 
                          sm: "0.8rem",
                          md: "0.85rem",
                          lg: "0.9rem",
                        },
                      }}
                    >
                      {card[period].features.map((feature) => (
                        <div
                          key={feature.feature}
                          className="flex items-center gap-1"
                        >
                          <CheckIcon fontSize="small" /> {feature.feature}
                        </div>
                      ))}
                    </Typography>
                  </CardContent>
                </div>
                <div className="text-center rounded py-1">
                  <Button variant="contained">
                    <span className="px-14">{card[period].button}</span>
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </Grid>
      </div>

      {/* table */}
      <div className="max-w-5xl mx-auto my-8 md:my-15">
        <h1 className="text-lg md:text-3xl font-bold  mb-5 text-gray-900 text-center ">
          {config.tableTitle}
        </h1>

        <TableComponent
          headers={config.table.headers}
          data={config.table.data}
          styles={{
            headerCell: {
              color: "black",
              textAlign: "left",
              fontWeight: "bolder",
            },
            dataCell: {
              textAlign: "center",
            },
          }}
        />
      </div>

      {/* schoool title */}
      <div className="w-full max-w-5xl mx-auto my-8 md:my-16">
        <h4 className="text-lg md:text-2xl font-bold mb-2 text-gray-900 text-center ">
          {config.schoolTitle}
        </h4>
        <p className="text-sm text-gray-500 text-center mb-6">
          {config.schoolDesc}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 4,
              overflowX: "auto",
              overflowY: "hidden",
              scrollSnapType: "x mandatory",
              scrollbarWidth: "thin",
              scrollbarColor: "transparent transparent",
              transition: "scrollbar-color 0.09s ease",
              "&:hover": {
                scrollbarColor: "#9ca3af #f1f1f1",
              },
              "&::-webkit-scrollbar": {
                height: "6px",
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
            className="py-4 max-w-3xl"
          >
            <div className="flex gap-4">
              {config.schoolLogos.map((logo, key) => (
                <Card
                  key={key}
                  className="flex-shrink-0 flex items-center justify-center p-4"
                  style={{ minWidth: "120px" }}
                >
                  <img
                    src={logo}
                    alt=""
                    className="w-24 md:w-32 object-contain"
                  />
                </Card>
              ))}
            </div>
          </Box>
        </div>
      </div>

      {/* feedback */}
      <div className="w-full max-w-3xl mx-auto">
        <p className="text-sm text-gray-500 text-center mb-6">
          {config.principalFeedBack}
        </p>

        <h4 className="text-xl md:text-3xl font-bold mb-2 text-gray-900 text-center ">
          {config.principal}
        </h4>
        <p className="text-sm text-gray-500 text-center mb-6">
          {config.principalDesc}
        </p>
      </div>

      {/* faq */}
      <div className="w-full max-w-3xl mx-auto mt-12">
        <h4
          className="text-xl md:text-2xl font-bold mb-2 text-gray-900 text-center "
          style={{
            ...config.frequentQuestions.styles?.titleStyle?.inlineStyle,
          }}
        >
          {config.frequentQuestions.title}
        </h4>
        {config.frequentQuestions.items.map((question, key) => (
          <DynamicRenderer key={key} config={question} />
        ))}
      </div>

      {/* button */}
      <div className="w-full max-w-3xl mx-auto mt-12">
        <h4 className="text-lg md:text-3xl font-bold mb-1 text-gray-900 text-center ">
          {config.transformSchool.title}
        </h4>
        <p className="text-sm text-gray-500 text-center mb-6">
          {config.transformSchool.desc}
        </p>

        <div className="w-full text-center">
          <Button
            variant="contained"
            sx={{ fontSize: { xs: "0.85rem", md: "1.1rem" } }}
          >
            {config.transformSchool.button}
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default Subscription;