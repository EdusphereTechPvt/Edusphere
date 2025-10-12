"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Close, Person, Settings, Logout } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import generalConfig, { generalRoutes, navItems, userMenuItems } from "../../config/GeneralConfig";
import { staticUpdateConfig } from "@/app/utils/FormatConfig";
import { DynamicRenderer } from "@/app/utils/DynamicRender";
import { logout } from "@/app/services/AuthService";

const Header = ({ path, userData }) => {
  const [header, setHeader] = useState(generalConfig.header);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const router = useRouter();
  const toggleDrawer = (open) => () => setDrawerOpen(open);

  useEffect(() => {
    try {
      const result = generalRoutes.includes(path)
        ? navItems.default
        : navItems[userData?.role];

      staticUpdateConfig(generalConfig, [
        { key: "header", childType: "object" },
        { key: "sections", childType: "array" },
        { matchKey: "type", matchValue: "navigate" },
        { dataKey: "navItems", data: result },
      ]);

      setHeader({ ...generalConfig.header });
      setUserLoggedIn(!!userData);
    } catch (err) {
      console.error("Error fetching navbar items:", err);
    }
  }, [userData, path]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = async (item = null) => {
    setAnchorEl(null);
    if (!item) return;

    if (item.action === "navigate") {
      router.push(item.actionValue);
    } else if (item.action === "logout") {
      const response = await logout();
      if (response) {
        setUserLoggedIn(false);
        router.push(item.actionValue);
      }
    }
  };

  return (
    <Box
      component="header"
      className={header.styles?.className}
      sx={header.styles?.inlineStyle}
    >
      <IconButton
        color="black"
        sx={{ display: { lg: "none" } }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>

      {header.sections.map(
        (section, index) =>
          section.type === "logo" && (
            <DynamicRenderer
              key={index}
              config={section}
              index={index}
              onClick={() => router.push("/")}
            />
          )
      )}

      <Box display={{ xs: "none", lg: "flex" }} alignItems="center">
        {header.sections.map(
          (section, index) =>
            section.type === "navigate" && (
              <DynamicRenderer
                key={index}
                config={section}
                index={index}
                path={path}
              />
            )
        )}
      </Box>

      <Box display={{ xs: "none", lg: "flex" }} alignItems="center">
        {!userLoggedIn ? (
          <>
            {header.sections.map(
              (section, index) =>
                section.type === "action" && (
                  <DynamicRenderer key={index} config={section} index={index} />
                )
            )}
          </>
        ) : (
          <>
            <IconButton onClick={handleMenuClick} sx={{ ml: 1 }}>
              <Avatar
                alt={userData?.name || "User"}
                src={userData?.avatar || "/default-avatar.png"}
                sx={{ width: 36, height: 36 }}
              />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => handleMenuClose()}
              PaperProps={{
                elevation: 3,
                sx: { mt: 1.5, borderRadius: "12px", minWidth: 160 },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {userMenuItems.map((item, index) => (
                <MenuItem key={index} onClick={() => handleMenuClose(item)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.label}</ListItemText>
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </Box>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ display: { xs: "block", lg: "none" } }}
      >
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
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
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
