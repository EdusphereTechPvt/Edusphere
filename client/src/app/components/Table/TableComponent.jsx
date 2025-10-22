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
  TableFooter,
  Tooltip,
} from "@mui/material";
import CustomPagination from "./Pagination";
import {
  getBackgroundColor,
  useHandleAction,
} from "@/app/utils/HelperFunctions";
import { useMemo } from "react";
import LableChip from "../LableChip/LableChip";
import { Checkbox } from "@mui/material";
import { renderTopHeader } from "@/app/utils/DynamicRender";

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
  checkBox = false,
  selectedRow,
  onPaginationChange,
}) => {
  const { handleAction } = useHandleAction();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [statusRowStyle, setStatusRowStyle] = useState({});
  const [selected, setSelected] = useState([]);

  //pagination logic
  useEffect(() => {
    if (!pagination) setRowsPerPage(data.length);
  }, [data, pagination]);

  useEffect(() => {
    if (selectedRow) {
      selectedRow(selected);
    }
  }, [selected]);

  useEffect(() => {
    if (onPaginationChange) onPaginationChange({ page, rowsPerPage });
  }, [page, rowsPerPage]);

  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = useMemo(
    () => data.slice(startIndex, startIndex + rowsPerPage),
    [data, page, rowsPerPage]
  );
  const date = new Date();
  const currentDay = date.toLocaleDateString("en-US", { weekday: "long" });

  const handleCellClick = (header, value, rowData) => {
    if (onClick) onClick(header, value, rowData);
  };

  const handleSelect = (row) => {
    setSelected((prev) => {
      const isSelected = prev.includes(row);
      if (isSelected) return prev.filter((r) => r !== row);
      return [...prev, row];
    });
  };

  const handleSelectAll = () => {
    if (selected.length === data.length) {
      setSelected([]);
    } else {
      setSelected([...data]);
    }
  };

  return (
    <div className={`${className}`}>
      <TableContainer
        component={Paper}
        elevation={0}
        className="border border-gray-200 rounded-4xl"
        sx={{ borderRadius: "0.3rem", overflow: "auto", ...styles }}
      >
        <Table sx={{ fontSize: { xs: "0.75rem", lg: "1rem" } }}>
          {/* Top Header */}
          {topHeader?.length > 0 && (
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={checkBox ? headers?.length + 1 : headers?.length}
                  sx={{ px: 2, py: 1, ...styles?.topHeaderStyles }}
                >
                  {/* conTainer */}
                  <div className="flex flex-row items-center justify-between gap-4 w-full px-2">
                    {/* left */}
                    <div className="flex items-center justify-start gap-5">
                      {topHeader.filter((item) =>
                        ["text", "search", "dropdown"].includes(item.type)
                      )}
                    </div>
                    {/* right */}
                    <div className="flex items-center justify-end gap-5">
                      {renderTopHeader(
                        topHeader.filter((item) =>
                          ["button", "link"].includes(item.type)
                        ),
                        handleAction
                      )}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
          )}

          {/* Table Header Row */}
          <TableHead>
            <TableRow>
              {checkBox && type !== "timetable" && (
                <TableCell
                  sx={{
                    minWidth: 50,
                    whiteSpace: "normal",
                    px: { xs: 1, sm: 1.5, md: 2 },
                    ...styles?.headerCell,
                  }}
                  padding="checkbox"
                >
                  <Tooltip title="Select All" enterDelay={500}>
                    <Checkbox
                      checked={selected.length === data.length}
                      onChange={handleSelectAll}
                      sx={{
                        transform: { xs: "scale(0.7)", md: "scale(0.9)" },
                        padding: 0.5,
                      }}
                    />
                  </Tooltip>
                </TableCell>
              )}

              {headers?.map((header, index) => (
                <TableCell
                  key={index}
                  sx={{
                    width: `${100 / headers.length}%`,

                    fontWeight: 600,
                    whiteSpace: "normal",
                    px: { xs: 1, sm: 1.5, md: 2 },
                    color: "#9ca3af",
                    borderLeft:
                      type === "timetable"
                        ? currentDay === header
                          ? "2px solid #3b82f6 "
                          : "1px solid #e5e7eb"
                        : "none",
                    borderRight:
                      type === "timetable"
                        ? currentDay === header
                          ? "2px solid #3b82f6 "
                          : "1px solid #e5e7eb"
                        : "none",
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
                switch (type) {
                  case "timetable":
                    return (
                      <TableRow key={rowIndex}>
                        {headers.map((header, colIndex) => (
                          <TableCell
                            key={colIndex}
                            sx={{
                              fontSize: { xs: "0.75rem", lg: "0.85rem" },
                              fontWeight: header === "Time" ? "bold" : "500",
                              borderRight:
                                header === currentDay
                                  ? "2px solid #3b82f6 "
                                  : "1px solid #e5e7eb",
                              textAlign: "center",
                              backgroundColor:
                                row[header] &&
                                getBackgroundColor(row[header].status, colors),
                              borderLeft:
                                header === currentDay
                                  ? "2px solid #3b82f6 "
                                  : "1px solid #e5e7eb",
                              borderRadius:
                                row[header] &&
                                row[header].status === "Current Period"
                                  ? "20px"
                                  : "0px",
                            }}
                          >
                            {row[header] && row[header].value ? (
                              row[header].value.split("\n").map((line, idx) => (
                                <div
                                  key={idx}
                                  style={{
                                    fontWeight: idx === 0 ? "bold" : "",
                                  }}
                                >
                                  {line}
                                </div>
                              ))
                            ) : (
                              <div
                                style={{
                                  fontWeight: "500",
                                  fontSize: "2.5rem",
                                }}
                              >
                                -
                              </div>
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  default:
                    return (
                      <TableRow
                        key={rowIndex}
                        sx={{
                          backgroundColor: statusRowStyle[rowIndex]?.bg,
                          "&:hover": {
                            backgroundColor: statusRowStyle[rowIndex]?.hoverBg,
                          },
                        }}
                      >
                        {checkBox && type !== "timetable" && (
                          <TableCell
                            sx={{
                              minWidth: 50,
                              whiteSpace: "normal",
                              px: { xs: 1, sm: 1.5, md: 2 },
                            }}
                            padding="checkbox"
                          >
                            <Checkbox
                              checked={selected.includes(row)}
                              onChange={() => handleSelect(row)}
                              sx={{
                                transform: {
                                  xs: "scale(0.7)",
                                  md: "scale(0.9)",
                                },
                                padding: 0.5,
                              }}
                            />
                          </TableCell>
                        )}
                        {headers?.map((header, colIndex) => {
                          const cellValue =
                            row[header] || row[header.toLowerCase()];
                          const isClickable = clickableFields.some(
                            (field) =>
                              field.toLowerCase() === header.toLowerCase()
                          );

                          return (
                            <TableCell
                              key={colIndex}
                              onClick={
                                isClickable
                                  ? () => handleCellClick(header, cellValue)
                                  : undefined
                              }
                              sx={{
                                cursor: isClickable ? "pointer" : "default",
                                transition: "filter 0.2s",
                                "&:hover": {
                                  filter: isClickable
                                    ? "brightness(0.7)"
                                    : "none",
                                },
                              }}
                            >
                              {/* check to add chip */}
                              {header.toLowerCase().includes("status") ? (
                                <LableChip
                                  value={cellValue}
                                  variant="outlined"
                                  style={columnStyles?.[header]}
                                  rowStyle={(colors) =>
                                    setStatusRowStyle((prev) => ({
                                      ...prev,
                                      [rowIndex]: colors,
                                    }))
                                  }
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
                }
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
                <TableCell
                  colSpan={checkBox ? headers?.length + 1 : headers?.length}
                  sx={{ padding: "16px" }}
                >
                  <CustomPagination
                    limit={rowsPerPage}
                    setLimit={setRowsPerPage}
                    page={page}
                    setPage={setPage}
                    totalValues={data?.length}
                    selectedRow={selected.length}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};
