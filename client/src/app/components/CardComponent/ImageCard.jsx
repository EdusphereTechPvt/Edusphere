import React from "react";
import { Box, Typography } from "@mui/material";

const ImageCard = ({
  img,
  title,
  desc,
  date,
  time,
  longDesc,
  styles = {},
}) => (
  <div
    className={`w-full bg-white rounded-xl shadow p-3 gap-3 flex flex-col lg:flex-row ${
      styles.cardStyle?.className || ""
    }`}
    style={styles.cardStyle?.inlineStyle}
  >
    {img && (
      <div className="sm:w-full lg:w-1/3 md:w-1/2 aspect-video overflow-hidden rounded-lg">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>
    )}

    <div className="mt-2 w-full sm:w-2/3 flex flex-col space-y-1.5">
      {title && (
        <h2
          className={`text-indigo-600 text-sm sm:text-base font-medium ${
            styles.titleStyle?.className || ""
          }`}
          style={styles.titleStyle?.inlineStyle}
        >
          {title}
        </h2>
      )}
      {desc && (
        <p
          className={`text-base sm:text-lg font-bold text-gray-900 ${
            styles.descStyle?.className || ""
          }`}
          style={styles.descStyle?.inlineStyle}
        >
          {desc}
        </p>
      )}
      {(date || time) && (
        <p
          className={`text-gray-600 text-xs sm:text-sm mt-1 ${
            styles.dateStyle?.className || ""
          }`}
          style={styles.dateStyle?.inlineStyle}
        >
          📅 {date}
          {time && `, ${time}`}
        </p>
      )}
      {longDesc && (
        <p
          className={`text-gray-600 text-xs sm:text-sm mt-1 ${
            styles.longDescStyle?.className || ""
          }`}
          style={styles.longDescStyle?.inlineStyle}
        >
          {longDesc}
        </p>
      )}
    </div>
  </div>
);

export default ImageCard;
