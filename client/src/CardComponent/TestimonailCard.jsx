import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

const TestimonailCard = ({onclick, styles={}, content, avatar, name, desc}) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        boxShadow: "none",
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "transparent",
        cursor: onclick ? "pointer" : "default",
        transition: "transform 0.2s, box-shadow 0.2s",
        ":hover": onclick ? { transform: "scale(1.02)", boxShadow: 3 } : {},
        ...styles.cardStyle?.inlineStyle,
      }}
      className={styles.cardStyle?.className}
      onClick={onclick}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="body1"
          component="blockquote"
          sx={{
            fontStyle: "normal",
            mb: 3,
            lineHeight: 1.6,
            ...styles.textStyle?.inlineStyle,
          }}
        >
          "{content}"
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
          {avatar && (
            <Box
              component="img"
              src={avatar}
              alt={name}
              sx={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                objectFit: "cover",
                bgcolor: "grey.200",
                ...styles.avatarStyle?.inlineStyle,
              }}
              className={styles.avatarStyle?.className}
            />
          )}
          <Box sx={{ ...styles.infoContainerStyle?.inlineStyle }} className={styles.infoContainerStyle?.className}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: "1em" }}>
              {name}
            </Typography>
            {desc && (
              <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.75em", }}>
                {desc}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TestimonailCard;
