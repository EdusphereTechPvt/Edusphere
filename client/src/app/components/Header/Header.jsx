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
  Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Close, Person, Settings, Logout } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import generalConfig, { connectionStatusConfig, generalRoutes, navItems, userMenuItems } from "../../config/GeneralConfig";
import { staticUpdateConfig } from "@/app/utils/FormatConfig";
import { DynamicRenderer } from "@/app/utils/DynamicRender";
import { logout } from "@/app/services/AuthService";
import { useAppSelector } from "@/app/store";
import { AnimatedConnectionIcon } from "@/app/utils/Animation";

const ConnectionChip = ({ status }) => {

  const config = connectionStatusConfig[status] || connectionStatusConfig.disconnected;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Chip
        icon={<AnimatedConnectionIcon status={status} />}
        label={config.label}
        color={config.color}
        size="small"
        variant="outlined"
        sx={{
          ml: 1,
          backgroundColor: config.bgColor,
          borderColor: config.borderColor,
          padding: '1rem',
          fontWeight: 600,
          fontSize: '0.75rem',
          marginLeft: '0',
          '& .MuiChip-icon': {
            color: 'inherit'
          },
          '&:hover': {
            backgroundColor: config.bgColor,
            filter: 'brightness(0.95)'
          }
        }}
      />
    </motion.div>
  );
};

const Header = ({ path, connectionStatus }) => {
  const [header, setHeader] = useState(generalConfig.header);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = async (item = null) => {
    setAnchorEl(null);
    if (!item) return;

    if (item.action === "navigate") {
      router.push(item.actionValue);
      setDrawerOpen(false);
    } else if (item.action === "logout") {
      await logout();
      router.push("/")
    }
  };

  const handleMobileMenuClose = async (item = null) => {
    setMobileMenuAnchorEl(null);
    if (!item) return;

    if (item.action === "navigate") {
      router.push(item.actionValue);
      setDrawerOpen(false);
    } else if (item.action === "logout") {
      await logout();
      router.push("/")
    }
  };

  useEffect(() => {
    try {
      let navItemsToUse;
      if (generalRoutes.includes(path)) {
        if (user) {
          navItemsToUse = [
            ...navItems.default,
            { id: "dashboard", label: "Dashboard", actionValue: "/dashboard", type: "link", action: "navigate" }
          ];
        }
        else {
          navItemsToUse = navItems.default;
        }
      } else {
        navItemsToUse = navItems[user?.role]
      }

      staticUpdateConfig(generalConfig, [
        { key: "header", childType: "object" },
        { key: "sections", childType: "array" },
        { matchKey: "type", matchValue: "navigate" },
        { dataKey: "navItems", data: navItemsToUse },
      ]);

      setHeader({ ...generalConfig.header });
    } catch (err) {
      console.error("Error updating navbar items:", err);
    }
  }, [user, path]);

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
        <AnimatePresence>
          {user && <ConnectionChip status={connectionStatus} />}
        </AnimatePresence>

        {!user ? (
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
            <IconButton
              onClick={handleMenuClick}
              sx={{ ml: 1 }}
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Avatar
                alt={user?.name || "User"}
                src={user?.avatar || "/default-avatar.png"}
                sx={{ width: 36, height: 36 }}
              />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => handleMenuClose()}
              PaperProps={{
                elevation: 3,
                sx: {
                  mt: 1.5,
                  borderRadius: "12px",
                  minWidth: 160,
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.1))',
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  }
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {userMenuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleMenuClose(item)}
                  component={motion.div}
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.04)' }}
                  transition={{ duration: 0.2 }}
                >
                  <ListItemIcon>
                    {React.cloneElement(item.icon, {
                      sx: { fontSize: 20 }
                    })}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                  />
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
            <IconButton onClick={toggleDrawer(false)}>
              <Close />
            </IconButton>
          </Box>

          <Divider />

          {/* User Info Section */}
          {user && (
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                <Avatar
                  alt={user?.name || "User"}
                  src={user?.avatar || "/default-avatar.png"}
                  sx={{ width: 48, height: 48 }}
                  component={motion.div}
                  whileHover={{ scale: 1.05 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight="600">
                    {user?.name || "User"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user?.email}
                  </Typography>
                </Box>
                <ConnectionChip status={connectionStatus} />
              </Box>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {userMenuItems.map((item, index) => (
                  <Chip
                    key={index}
                    icon={React.cloneElement(item.icon, { sx: { fontSize: 16 } })}
                    label={item.label}
                    variant="outlined"
                    size="small"
                    onClick={() => handleMobileMenuClose(item)}
                    sx={{
                      mb: 0.5,
                      '& .MuiChip-icon': {
                        marginLeft: '6px',
                        fontSize: '16px'
                      }
                    }}
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Navigation Sections */}
          <Box sx={{ display: "flex", flexDirection: "column", mt: "1rem", p: 2 }}>
            {header.sections
              .filter((section) => {
                if (!["navigate", "action"].includes(section.type.toLowerCase())) return false;
                if (user && section.type.toLowerCase() === "action") return false;
                return true;
              })
              .map((section, index) => (
                <DynamicRenderer
                  key={index}
                  config={section}
                  index={index}
                  isDrawer
                  path={path}
                  onClick={toggleDrawer(false)}
                />
              ))}
          </Box>


          {!user && (
            <Box sx={{ p: 2, mt: 'auto', borderTop: 1, borderColor: 'divider' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Connection Status
              </Typography>
              <ConnectionChip status={connectionStatus} />
            </Box>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;