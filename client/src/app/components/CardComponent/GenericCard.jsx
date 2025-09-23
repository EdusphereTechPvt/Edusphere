"use client";
import React from "react";
import { Card, Typography, Avatar, Box, Link } from "@mui/material";

const GenericCard = ({
  avatar,
  icon: Icon,
  title,
  desc,
  additionalInfo = [],
  docUrl,
  onclick,
  styles = {},
}) => (
  <Card
  onClick={onclick || undefined}
  sx={{
      maxWidth: 360,
      p: 2,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      ...(onclick && {
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        ":hover": {
          transform: "scale(1.02)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        },
      }),
      ...styles.cardStyle?.inlineStyle,
    }}
    className={styles.cardStyle?.className}
  >
    {avatar && (
      <Avatar
        src={avatar}
        sx={{
          width: 64,
          height: 64,
          mx: "auto",
          mb: 2,
          ...styles.avatarStyle?.inlineStyle,
        }}
        className={styles.avatarStyle?.className}
      />
    )}
    {Icon && (
      <Box
        className="p-3 flex items-center justify-center rounded-full bg-gray-100"
        sx={styles.iconContainerStyle?.inlineStyle}
      >
        {typeof Icon === "string" ? (
          <Typography variant="h5" sx={styles.iconStyles?.inlineStyle} className={styles.iconStyles?.className}>
            {Icon}
          </Typography>
        ) : (
          <Icon className={`text-3xl ${styles.iconStyles?.className}`} sx={styles.iconStyles?.inlineStyle} style={styles.iconStyles?.inlineStyle} />
        )}
      </Box>
    )}

    <Box
      sx={styles.textContainerStyle?.inlineStyle}
      className={styles.textContainerStyle?.className}
    >
      <Typography
        sx={{ ...styles.textContainerStyle?.titleStyle?.inlineStyle }}
        className={styles.textContainerStyle?.titleStyle?.className}
      >
        {title}
      </Typography>

      {desc && (
        <Typography
          sx={styles.textContainerStyle?.descStyle?.inlineStyle}
          className={styles.textContainerStyle?.descStyle?.className}
        >
          {desc}
        </Typography>
      )}
      {additionalInfo && additionalInfo.map((info, index) => {

        const [key, value] = Object.entries(info)[0];

        const baseStyle = styles.textContainerStyle?.additionalInfoStyle?.inlineStyle || {};
        const baseClass = styles.textContainerStyle?.additionalInfoStyle?.className || "";

        const keyStyle = styles.textContainerStyle?.additionalInfoStyle?.[key]?.inlineStyle || {};
        const keyClass = styles.textContainerStyle?.additionalInfoStyle?.[key]?.className || "";
        return (
          <Typography
            key={index}
            sx={{ ...baseStyle, ...keyStyle }}
            className={`${baseClass} ${keyClass}`}
          >
            {value}
          </Typography>
        );
      })}

      {docUrl && (
        <Box mt={1}>
          <Link href={docUrl} target="_blank" underline="hover">
            View More →
          </Link>
        </Box>
      )}
    </Box>
  </Card>
);

export default GenericCard;
