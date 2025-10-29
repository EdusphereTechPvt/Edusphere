"use client";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";
import generalConfig from "@/app/config/GeneralConfig";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const { footer } = generalConfig;

  const handleAction = (link) => {
    if (link.action === "navigate") {
      window.location.href = link.actionValue;
    } else if (link.action === "external") {
      window.open(link.actionValue, "_blank", "noopener,noreferrer");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const renderSection = (section, index) => {
    switch (section.type) {
      case "brand":
        return (
          <motion.div key={index} variants={itemVariants}>
            <Box
              sx={{
                ...section.styles.container,
                textAlign: isMobile ? "center" : "left",
                flex: isMobile ? "1 1 100%" : isTablet ? "1 1 45%" : "1 1 30%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isMobile ? "center" : "flex-start",
                  gap: 2,
                  mb: 2,
                }}
              >
                {section.logoUrl && (
                  <img src={section.logoUrl} alt={section.name} style={section.styles.logoStyle} />
                )}
                <Typography variant="h6" sx={section.styles.nameStyle}>
                  {section.name}
                </Typography>
              </Box>

              <Typography sx={{ ...section.styles.descriptionStyle, textAlign: isMobile ? "center" : "left" }}>
                {section.description}
              </Typography>

              {section.contactInfo && (
                <Stack spacing={1} sx={{ mt: 2, alignItems: isMobile ? "center" : "flex-start" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Email sx={{ fontSize: 18, color: "#b0b0b0" }} />
                    <Typography sx={section.styles.contactStyle}>{section.contactInfo.email}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Phone sx={{ fontSize: 18, color: "#b0b0b0" }} />
                    <Typography sx={section.styles.contactStyle}>{section.contactInfo.phone}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "start", gap: 1 }}>
                    <LocationOn sx={{ fontSize: 18, color: "#b0b0b0", mt: 0.2 }} />
                    <Typography sx={section.styles.contactStyle}>{section.contactInfo.address}</Typography>
                  </Box>
                </Stack>
              )}
            </Box>
          </motion.div>
        );

      case "links":
      case "legal":
        return (
          <motion.div key={index} variants={itemVariants}>
            <Box
              sx={{
                ...section.styles.container,
                textAlign: "center",
                flex: isMobile ? "1 1 100%" : isTablet ? "1 1 45%" : "1 1 20%",
              }}
            >
              <Typography variant="h6" sx={section.styles.title}>{section.title}</Typography>
              <Stack spacing={1} alignItems="center">
                {section.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    component="button"
                    onClick={() => handleAction(link)}
                    sx={section.styles.link}
                    underline="none"
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Box>
          </motion.div>
        );

      case "social":
        return (
          <motion.div key={index} variants={itemVariants}>
            <Box
              sx={{
                ...section.styles.container,
                textAlign: isMobile ? "center" : "left",
                flex: isMobile ? "1 1 100%" : isTablet ? "1 1 45%" : "1 1 20%",
              }}
            >
              <Typography variant="h6" sx={section.styles.title}>{section.title}</Typography>
              <Box
                sx={{
                  ...section.styles.socialContainer,
                  display: "flex",
                  justifyContent: isMobile ? "center" : "flex-start",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {section.links.map((social, socialIndex) => (
                  <motion.div key={socialIndex} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <IconButton
                      onClick={() => handleAction(social)}
                      sx={section.styles.iconStyle}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Box component="footer" sx={{ ...footer.styles.inlineStyle, py: isMobile ? 4 : 6 }}>
      <Container maxWidth={false} sx={{ width: "100%", px: { xs: 2, sm: 3, md: 4 } }}>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: isMobile ? "center" : "space-between",
              alignItems: "flex-start",
              gap: isMobile ? 4 : 6,
            }}
          >
            {footer.sections.map((section, index) => renderSection(section, index))}
          </Box>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <Box sx={{ ...footer.bottomBar.styles.container, mt: isMobile ? 4 : 6 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: isMobile ? 2 : 0,
                textAlign: "center",
              }}
            >
              <Typography sx={footer.bottomBar.styles.copyright}>
                {footer.bottomBar.copyright}
              </Typography>
              <Stack direction={isMobile ? "column" : "row"} spacing={isMobile ? 1 : 3}>
                {footer.bottomBar.additionalLinks.map((link, index) => (
                  <Link
                    key={index}
                    component="button"
                    onClick={() => handleAction(link)}
                    sx={footer.bottomBar.styles.link}
                    underline="none"
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;