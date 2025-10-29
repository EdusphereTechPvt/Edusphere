import React, { useEffect } from "react";
import { Chip } from "@mui/material";
import { motion } from "framer-motion";
import { statusConfig } from "@/app/config/StatusConfig";

const MotionChip = motion(Chip);

const LableChip = ({
  value,
  icon: Icon,
  size = "small",
  variant = "contained",
  onClick,
  hoverEffect = false,
  style = {},
  rowStyle
}) => {
  const getDisplayLabel = (val) => {
    if (typeof val === "string") return val;
    if (val === true) return "Active";
    return "Inactive";
  };
  const label = getDisplayLabel(value);
  const key =
    Object.keys(statusConfig).find(
      (key) => key.toLowerCase() === label.toString()?.toLowerCase()?.trim()
    ) || "default";
  const { chipBg, chipColor, bg, hoverBg } = statusConfig[key];

   useEffect(() => {
    if (rowStyle) {
      rowStyle({ chipBg, chipColor, bg, hoverBg });
    }
  }, [chipBg, chipColor, bg, hoverBg]);
  

  return (
    <MotionChip
      label={label}
      size={size}
      icon={Icon ? <Icon style={{ fontSize: "1rem" }} /> : undefined}
      onClick={onClick}
      variant={variant}
      whileHover={hoverEffect ? { scale: 1.05 } : {}}
      sx={{
        backgroundColor: variant === "contained" ? chipColor : chipBg,
        color: variant === "outlined" ? chipColor : "white",
        border: variant === "outlined" ? `1px solid ${chipColor}` : "none",
        fontWeight: 500,
        letterSpacing: "0.3px",
        borderRadius: "2rem",
        px: 1,
        transition: "all 0.2s ease",
        fontSize: {
          xs: "0.65rem",
          sm: "0.75rem",
          md: "0.85rem",
        },
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    />
  );
};

export default LableChip;
