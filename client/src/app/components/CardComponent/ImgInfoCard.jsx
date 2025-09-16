import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const ImgInfoCard = ({ title, desc, imgUrl, styles={} }) => {
  return (
    <Card
      sx={{
        width: 300,
        position: "relative",
        overflow: "hidden",
        ...styles.cardStyle?.inlineStyle,
      }}
      className={styles.cardStyle?.className}
    >
      <Box component="img" src={imgUrl || "https://placehold.co/600x400"} alt={title} sx={{ width: '100%', display: 'block', ...styles.imgstyle?.inlineStyle }} className={styles.imgstyle?.className}/>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          color: "#fff",
          padding: "0.5rem",
          textAlign: "center",
          ...styles.infoContainerStyle?.inlineStyle,
        }}
        className={styles.infoContainerStyle?.className}
      >
        <Typography variant="h9" sx={styles.infoContainerStyle?.titleStyle?.inlineStyle} className={styles.infoContainerStyle?.titleStyle?.className}>{title}</Typography>
         <Typography variant="body1" sx={styles.infoContainerStyle?.descStyle?.inlineStyle} className={styles.infoContainerStyle?.descStyle?.className}>{desc}</Typography>
      </Box>
    </Card>
  );
};

export default ImgInfoCard;
