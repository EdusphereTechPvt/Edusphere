import {
  Box,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TableCell,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import Dropdown from "../components/Dropdown/Dropdown";

export const DynamicRenderer = ({
  config,
  index,
  isDrawer = false,
  onClick,
  path = "",
}) => {
  switch (config?.type?.toLowerCase()) {
    case "points":
      return (
        <Box
          display="flex"
          alignItems="center"
          mb={1}
          gap={1.2}
          onClick={onClick}
        >
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
          onClick={onClick}
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
          onClick={onClick}
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
              <Accordion key={index} sx={{ padding: "10px" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {item.title}
                  </Typography>
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
    case "logo":
      return (
        <Box
          key={index}
          className={config.styles?.className}
          sx={config.styles?.inlineStyle}
          onClick={onClick}
        >
          <img
            src={config.logoUrl}
            alt={config.name}
            className={config.styles.imgStyle?.className}
            style={{
              maxHeight: "50px",
              ...config.styles.imgStyle?.inlineStyle,
            }}
          />
          {config.name && (
            <Typography
              sx={config.styles.nameStyle?.inlineStyle}
              className={config.styles.nameStyle?.className}
            >
              {config.name}
            </Typography>
          )}
        </Box>
      );

    case "navigate":
      return (
        <Box
          onClick={onClick}
          key={index}
          component="nav"
          className={config.styles?.className}
          sx={{
            display: "flex",
            gap: 2,
            ...config.styles?.inlineStyle,
          }}
        >
          {config?.navItems.map((item, idx) => (
            <Box
              key={idx}
              onClick={onClick}
              sx={{
                display: "inline-block",

                px: { xs: 2, lg: 1 },
                py: { xs: 1, lg: -2 },
                borderRadius: { xs: 1, lg: 0 },
                backgroundColor: {
                  xs: path === item.actionValue ? "#1976d2" : "transparent",
                  lg: "transparent",
                },
                borderBottom:
                  path === item.actionValue ? "2.3px solid #1976d2" : "none",
              }}
            >
              <Link href={item.actionValue} passHref>
                <Typography
                  component="span"
                  sx={{
                    color:
                      path === item.actionValue
                        ? { sm: "white", lg: "black" }
                        : "none",
                  }}
                >
                  {item.label}
                </Typography>
              </Link>
            </Box>
          ))}
        </Box>
      );

    case "action":
      return (
        <Box
          onClick={onClick}
          key={index}
          className={config.styles?.className}
          sx={{ display: "flex", gap: 2, ...config.styles?.inlineStyle }}
        >
          {config.buttons.map((btn, idx) => (
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

//topHeaderRenderer
export const renderTopHeader = (items, handleAction) => {
  return items?.map(
    (
      {
        id,
        label,
        action,
        actionValue,
        actionUse,
        type,
        path,
        onClick,
        Icon,
        disabled,
        variant,
        options = [],
        placeholder,
        required,
        styles,
      },
      idx
    ) => {
      switch (type) {
        case "text":
          return (
            <Typography
              key={idx}
              sx={{ fontWeight: "bold", fontSize: "0.9rem", ...styles }}
            >
              {label}
            </Typography>
          );

        case "link":
          return (
            <a
              href={path}
              key={idx}
              className="flex items-center gap-2 px-2 py-1 text-sm sm:text-base font-medium transition relative"
              style={styles}
            >
              {Icon && <span className="text-lg">{Icon}</span>}
              <span>{label}</span>
            </a>
          );

        case "dropdown":
          return (
            <Dropdown
              key={idx}
              data={items}
              onSelect={(value) => console.log("from dropdown", value)}
              styles={styles}
            />
          );
        case "search":
          return (
            <input
              key={idx}
              type="text"
              className="w-full rounded-4xl p-2 border border-gray-200"
              placeholder={placeholder}
              required={required}
              styles={styles}
            />
          );
        case "button":
          return (
            <Button
              key={idx}
              variant={variant || "contained"}
              disabled={disabled}
              onClick={() => handleAction(action, actionValue, actionUse)}
              sx={{
                borderRadius: "1.5rem",
                flexWrap: "nowrap",
                alignItems: "center",
                px: 2,
                py: 1,
                textTransform: "none",
                fontSize: "0.2rem",
                ":hover": {
                  filter: "brightness(95%)",
                },
                ...styles.elementStyles,
              }}
            >
              {Icon && <Icon sx={{ ...styles?.iconStyles }} />}
              <div style={{ ...styles?.labelStyles }}>{label}</div>
            </Button>
          );

        default:
          return <TableCell key={idx}>{text}</TableCell>;
      }
    }
  );
};
