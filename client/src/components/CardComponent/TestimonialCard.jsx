import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

const TestimonialCard = ({ onClick, content, avatar, name, desc, className = "", sx = {} }) => {
  return (
    <Card
      onClick={onClick}
      className={className}
      sx={{
        borderRadius: 2,
        p: 2,
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: onClick ? "pointer" : "default",
        ":hover": onClick ? { transform: "scale(1.02)", boxShadow: 3 } : {},
        ...sx,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {content && (
          <Typography
            variant="body1"
            component="blockquote"
            sx={{ mb: 3, lineHeight: 1.6 }}
          >
            "{content}"
          </Typography>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
          {avatar && (
            <Box
              component="img"
              src={avatar}
              alt={name || "User avatar"}
              sx={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                objectFit: "cover",
                bgcolor: "grey.200",
              }}
            />
          )}
          <Box>
            {name && (
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {name}
              </Typography>
            )}
            {desc && (
              <Typography variant="caption" color="text.secondary">
                {desc}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
