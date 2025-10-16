"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { demoConfig } from "@/app/config/demoConfig";
import Form from "@/app/components/Form/Form";
import { DynamicRenderer } from "@/app/utils/DynamicRender";

const page = () => {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        p: "2rem",
        px: {xs:"1.5rem", sm:"2rem", md:"3rem", lg:"4rem"},
        gap: "3rem",
        alignItems: { xs: "center", md: "flex-start" },
        textAlign: { xs: "left", md: "left" },
      }}
    >
      {/* textContent */}
      <Box>
        {demoConfig.sections.map((section, idx) => (
          <Box
            key={idx}
            className={section.styles?.className}
            style={section.styles?.inlineStyle}
          >
            {section.title && (
              <Typography
                sx={section.styles?.titleStyle?.inlineStyle}
                className={section.styles?.titleStyle?.className}
              >
                {section.title}
              </Typography>
            )}

            {section.desc && (
              <Typography
                sx={section.styles.descStyle?.inlineStyle}
                className={section.styles?.descStyle?.className}
              >
                {section.desc}
              </Typography>
            )}

            <Box sx={{ mt: "1rem", alignItems: "center"}}>
              {section.items?.map((item, idx2) => (
                <DynamicRenderer key={idx2} config={item} />
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      {/* form */}
      <Box sx={{ width: {xs:"full", lg:"60%"} }}>
        <Form type="demo" />
      </Box>
    </Box>
  );
};

export default page;
