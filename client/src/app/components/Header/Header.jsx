"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import generalConfig, { updateConfig } from "../../config/GeneralConfig";
import MenuIcon from "@mui/icons-material/Menu";
import { Close } from "@mui/icons-material";
import { formatConfig } from "@/app/utils/FormatConfig";
import { getElements } from "@/app/services/ElementAccessService";

const Header = ({ path }) => {
  const [header, setHeader] = useState(generalConfig.header);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  useEffect(() => {
    const fetchNavItems = async () => {
      try {
        const result = await getElements("navbar");
        updateConfig(generalConfig, "header", result);
        setHeader({ ...generalConfig.header });
      } catch (err) {
        console.error("Error fetching navbar items:", err);
      }
    };

    fetchNavItems();
  }, []);

  const renderElements = (section, index) => {
    switch (section.type.toLowerCase()) {
      case "logo":
        return (
          <Box
            key={index}
            className={section.styles?.className}
            sx={section.styles?.inlineStyle}
          >
            <img
              src={section.logoUrl}
              alt={section.name}
              className={section.styles.imgStyle?.className}
              style={{
                maxHeight: "50px",
                ...section.styles.imgStyle?.inlineStyle,
              }}
            />
            {section.name && (
              <Typography
                sx={section.styles.nameStyle?.inlineStyle}
                className={section.styles.nameStyle?.className}
              >
                {section.name}
              </Typography>
            )}
          </Box>
        );

      case "navigate":
        return (
          <Box
            key={index}
            component="nav"
            className={section.styles?.className}
            sx={{
              display: "flex",
              gap: 2,
              ...section.styles?.inlineStyle,
            }}
          >
            {section?.navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.actionValue}
                underline="none"
                className={section.styles?.navStyle?.className}
                sx={{
                  ...section.styles?.navStyle?.inlineStyle,
                  borderBottom:
                    path === item.actionValue ? "2px solid #1976d2" : "none",
                  pb: path === item.actionValue ? "2px" : "0",
                }}
              >
                {item.label}
              </Link>
            ))}
          </Box>
        );

      case "action":
        return (
          <Box
            key={index}
            className={section.styles?.className}
            sx={{ display: "flex", gap: 2, ...section.styles?.inlineStyle }}
          >
            {section.buttons.map((btn, idx) => (
              <Button
                key={idx}
                variant={btn.variant || "contained"}
                onClick={btn.onclick}
                className={btn.styles?.className}
                sx={btn.styles?.inlineStyle}
              >
                {btn.text}
              </Button>
            ))}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      component="header"
      className={header.styles?.className}
      sx={header.styles?.inlineStyle}
    >
      {/* hemburger Icon from smller screen */}
      <IconButton
        color="black"
        sx={{ display: { md: "none" } }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>

      {/* //always visible */}
      {header.sections.map((section, index) => {
        if (section.type === "logo") {
          return renderElements(section, index);
        }
      })}

      {/* conditional render based on screen width */}
      <Box display={{ xs: "none", md: "flex" }} alignItems="center">
        {header.sections.map((section, index) => {
          if (section.type === "navigate") {
            return renderElements(section, index);
          }
        })}
      </Box>

      <Box display={{ xs: "none", md: "flex" }} alignItems="center">
        {header.sections.map((section, index) => {
          if (section.type === "action") {
            return renderElements(section, index);
          }
        })}
      </Box>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={header.styles.drawerStyle?.inlineStyle}
          className={header.styles.drawerStyle?.className}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pt: "1rem",
              px: "0.9rem",
            }}
          >
            <Typography
              variant="h6"
              sx={{ textAlign: "left", fontWeight: "bold" }}
            >
              Menu
            </Typography>
            <Close onClick={toggleDrawer(false)} />
          </Box>

          <Divider />

          <Box sx={{ display: "flex", flexDirection: "column", mt: "1rem" }}>
            {header.sections.map(
              (section, index) =>
                ["nav", "action"].includes(section.type.toLowerCase()) &&
                renderElements(section, index, true)
            )}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;
