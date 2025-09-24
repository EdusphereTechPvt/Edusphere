"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
  Chip,
  TableFooter,
  Button,
} from "@mui/material";
import CustomPagination from "./Pagination";
import { statusConfig } from "@/app/config/TableConfig";

export const TableComponent = ({
  topHeader = [],
  headers = [],
  data = [],
  type,
  onClick,
  pagination = false,
  className = "lg:text-base text-sm",
  columnStyles,
  styles = {},
  colors = [],
  clickableFields = [],
}) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (!pagination) {
      setRowsPerPage(data.length);
    }
  }, [data, pagination]);

  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = data?.slice(startIndex, startIndex + rowsPerPage);
  const date = new Date();
  const currentDay = date.toLocaleDateString("en-US", { weekday: "long" });

  // get color
  const getStatusStyle = (status) =>
    statusConfig[status] || statusConfig.default;

  //topHeaderRenderer
  const renderTopHeader = (items) => {
    return items?.map(
      (
        {
          text,
          type,
          path,
          onClick,
          Icon,
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
                {text}
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
                <span>{text}</span>
              </a>
            );

          case "dropdown":
            return (
              <Dropdown
                key={idx}
                data={{
                  label: text,
                  placeholder: placeholder,
                  required: required,
                  items: options,
                }}
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
                onClick={onClick}
                sx={{
                  borderRadius: "1.5rem",
                  width: "100%",
                  flexWrap: "nowrap",
                  gap: 2,
                  display: "flex",
                  alignItems: "center",
                  textTransform: "none",
                  ":hover": {
                    filter: "brightness(95%)",
                  },
                  ...styles.elementStyles,
                }}
              >
                {Icon && <Icon style={{...styles.iconStyles}} sx={{color:"black", ...styles?.iconStyles}} />}
                {text}
              </Button>
            );

          default:
            return <TableCell key={idx}>{text}</TableCell>;
        }
      }
    );
  };

    const handleCellClick = (value) => {
    console.log(value);
    if (onClick) {
      onClick(value);
    }
  };



  return (
    <div className={`${className}`}>
      <TableContainer
        component={Paper}
        elevation={0}
        className="border border-gray-200 rounded-4xl"
        sx={{ borderRadius: "0.3rem", overflow: "hidden", ...styles }}
      >
        <Table sx={{ fontSize: { xs: "0.75rem", lg: "1rem" } }}>
          {/* Top Header */}
          {topHeader?.length > 0 && (
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={headers?.length}
                  sx={{ px: 2, py: 1, ...styles?.topHeaderStyles }}
                >
                  {/* conTainer */}
                  <div className="flex flex-row items-center justify-between gap-4 w-full px-2">
                    {/* left */}
                    <div className="flex items-center justify-start gap-5">
                      {renderTopHeader(
                        topHeader.filter(
                          (item) =>
                            item.type === "text" ||
                            item.type === "search" ||
                            item.type === "dropdown"
                        )
                      )}
                    </div>
                    {/* right */}
                    <div className="flex items-center justify-end gap-5">
                      {renderTopHeader(
                        topHeader.filter(
                          (item) =>
                            item.type === "button" || item.type === "link"
                        )
                      )}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
          )}

          {/* Table Column Headers */}
          <TableHead>
            <TableRow>
              {headers?.map((header, index) => (
                <TableCell
                  key={index}
                  sx={{
                    width: `${100 / headers.length}%`,

                    fontWeight: 600,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    px: { xs: 1, sm: 1.5, md: 2 },
                    color: "#9ca3af",
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.82rem",
                      md: "0.87rem",
                      lg: "0.9rem",
                    },
                    ...styles?.headerCell,
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {paginatedData?.length > 0 ? (
              paginatedData?.map((row, rowIndex) => {
                const rowStatus = row["Status"] || row["status"];
                const { bg, hoverBg, chipBg, chipColor } =
                  getStatusStyle(rowStatus);

                return (
                  <TableRow
                    key={rowIndex}
                    sx={{
                      backgroundColor: bg,
                      "&:hover": {
                        backgroundColor: hoverBg,
                      },
                    }}
                  >
                    {headers?.map((header, colIndex) => {
                      const cellValue =
                        row[header] || row[header.toLowerCase()];

                      // Check if current header is clickable
                      const isClickable = clickableFields.includes(
                        header.toLowerCase()
                      );

                      return (
                        <TableCell
                          key={colIndex}
                          onClick={
                            isClickable
                              ? () => handleCellClick(cellValue)
                              : undefined
                          }
                          sx={{
                            cursor: isClickable ? "pointer" : "default",
                            transition: "filter 0.2s",
                            "&:hover": {
                              filter: isClickable ? "brightness(0.7)" : "none",
                            },
                          }}
                        >
                          {header === "Status" ? (
                            <Chip
                              label={`● ${cellValue}`}
                              size="small"
                              sx={{
                                backgroundColor: chipBg,
                                color: chipColor,
                                fontSize: {
                                  xs: "0.65rem",
                                  sm: "0.75rem",
                                  md: "0.85rem",
                                },
                                ...columnStyles?.[header],
                              }}
                            />
                          ) : (
                            <Typography
                              sx={{
                                fontSize: {
                                  xs: "0.65rem",
                                  sm: "0.75rem",
                                  md: "0.85rem",
                                },

                                ...columnStyles?.[header],
                              }}
                            >
                              {cellValue}
                            </Typography>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headers?.length}
                  align="center"
                  sx={{ py: 6, color: "gray" }}
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {/* Pagination Footer */}
          {pagination && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={headers?.length} sx={{ padding: "16px" }}>
                  <div className="flex justify-between items-center w-full">
                    <Typography variant="body2" className="text-gray-500">
                      Showing {startIndex + 1} to{" "}
                      {Math.min(startIndex + rowsPerPage, data?.length)} of{" "}
                      {data?.length} results
                    </Typography>

                    <CustomPagination
                      limit={rowsPerPage}
                      setLimit={setRowsPerPage}
                      page={page}
                      setPage={setPage}
                      totalValues={data?.length}
                    />
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};