import {
  Box,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const DynamicRenderer = ({ config }) => {
    switch (config.type) {
      case "points":
        return (
          <Box display="flex" alignItems="center" mb={1} gap={1.2}>
            {config.Icon && (
              <Box
                className={config.styles.iconStyle.className}
                style={config.styles.iconStyle.inlineStyle}
              >
                <config.Icon />
              </Box>
            )}
            <Typography
              className={config.styles.titleStyle.className}
              style={config.styles.titleStyle.inlineStyle}
            >
              {config.text}
            </Typography>
          </Box>
        );

      case "testimonials":
        return (
          <Box
            mb={4}
            sx={{
              borderLeft: "4px solid var(--color-primary)",
              py: "0.6rem",
              px: "0.8rem",
              maxWidth: "40rem",
            }}
          >
            <Typography
              className={config.styles.textStyle.className}
              style={config.styles.textStyle.inlineStyle}
              fontStyle="italic"
            >
              {config.text}
            </Typography>
            <Typography
              className={config.styles.authorStyle.className}
              style={config.styles.authorStyle.inlineStyle}
              mt={1}
              // variant="caption"
            >
              {config.author}
            </Typography>
          </Box>
        );

      case "accordion":
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "0.7rem",
              ...config.styles?.inlineStyle,
            }}
            className={config.Formstyles?.className}
          >
            {config.values.map((item, index) => {
              return (
                <Accordion key={index} sx={{padding: '10px'}}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight:'bold'}}>{item.title}</Typography>
                  </AccordionSummary>
                  <Divider />
                  <AccordionDetails>
                    <Typography>{item.desc}</Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        );

      default:
        return null;
    }
  };