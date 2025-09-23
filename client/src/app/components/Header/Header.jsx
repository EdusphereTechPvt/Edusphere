"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import generalConfig from "../../config/GeneralConfig";
import MenuIcon from "@mui/icons-material/Menu";
import { Close } from "@mui/icons-material";
import { getElements } from "@/app/services/ElementAccessService";
import { useRouter } from "next/navigation";
import { updateConfig } from "@/app/utils/FormatConfig";
import { DynamicRenderer } from "@/app/utils/DynamicRender";

const Header = ({ path }) => {
  const [header, setHeader] = useState(generalConfig.header);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const router = useRouter();
  const navigation = 

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

  return (
    <Box
      component="header"
      className={header.styles?.className}
      sx={header.styles?.inlineStyle}
    >
      {/* hemburger Icon from smller screen */}
      <IconButton
        color="black"
        sx={{ display: { lg: "none"  } }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>

      {/* //always visible */}
      {header.sections.map(
        (section, index) =>
          section.type === "logo" && (
            <DynamicRenderer key={index} config={section} index={index} onClick={()=>router.push("/")}/>
          )
      )}

      {/* conditional render based on screen width */}
      <Box display={{ xs: "none", lg: "flex" }} alignItems="center">
        {header.sections.map(
          (section, index) =>
            section.type === "navigate" && (
              <DynamicRenderer key={index} config={section} index={index} path={path}/>
            )
        )}
      </Box>

      <Box display={{ xs: "none", lg: "flex" }} alignItems="center">
        {header.sections.map(
          (section, index) =>
            section.type === "action" && (
              <DynamicRenderer key={index} config={section} index={index} />
            )
        )}
      </Box>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} sx={{ display: { xs: "block", lg: "none" } }}>
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
                ["navigate", "action"].includes(section.type.toLowerCase()) && (
                  <DynamicRenderer
                    key={index}
                    config={section}
                    index={index}
                    isDrawer
                    path={path}
                    onClick={toggleDrawer(false)}
                  />
                )
            )}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;
