"use client";
import React from "react";
import { Card, CardContent, Typography, Divider, Box, Stack, Button } from "@mui/material";
import ProgressBar from "./ProgressBar";

const HeaderCard = ({ title, items = [], buttons = [], styles = {} }) => (
  <Card
    sx={{
      borderRadius: 2,
      boxShadow: "none",
      border: "1px solid #e0e0e0",
      width: "100%",
      ...styles.cardStyle?.inlineStyle,
    }}
    className={styles.cardStyle?.className}
  >
    {title && (
      <>
        <CardContent>
          <Typography sx={styles.titleStyle?.inlineStyle} className={styles.titleStyle?.className}>{title}</Typography>
        </CardContent>
        <Divider />
      </>
    )}

    <CardContent>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <Box mb={1.5}>
            {item.percentage ? (
              <ProgressBar label={item.label} percentage={item.percentage} />
            ) : (
              <Stack direction="row" spacing={2} alignItems="center">
                {item.icon && (
                  <Box
                    sx={{
                      backgroundColor: `${item?.styles?.iconStyles?.color}33`,
                      p: 2,
                      borderRadius: 2,
                    }}
                  >
                    <item.icon style={item?.styles?.iconStyles} />
                  </Box>
                )}
                <Box>
                  <Typography fontWeight="600">{item.label}</Typography>
                  <Typography>{item.value}</Typography>
                </Box>
              </Stack>
            )}
          </Box>
          {idx < items.length - 1 && <Divider sx={{ my: 1 }} />}
        </React.Fragment>
      ))}

      {buttons.map(({ icon: Icon, label, onClick, variant = "contained", styles = {} }, idx) => (
        <Button
          key={idx}
          variant={variant}
          onClick={onClick}
          fullWidth
          sx={{
            borderRadius: "1.5rem",
            mb: 1.5,
            gap: 2,
            textTransform: "none",
            ":hover": { filter: "brightness(95%)" },
            ...styles.inlineStyle,
          }}
          className={styles.className}
        >
          {Icon && <Icon sx={styles?.iconStyles.inlineStyle} />}
          {label}
        </Button>
      ))}
    </CardContent>
  </Card>
);

export default HeaderCard;
