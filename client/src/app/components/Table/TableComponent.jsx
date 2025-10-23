"use client";
import React, { useCallback, useEffect, useState } from "react";
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
  Checkbox,
  Box,
} from "@mui/material";
import CustomPagination from "./Pagination";
import {
  getBackgroundColor,
  useHandleAction,
} from "@/app/utils/HelperFunctions";
import { useMemo } from "react";
import { DynamicRenderer, renderTopHeader } from "@/app/utils/DynamicRender";
import { getSubjectColors } from "@/app/config/StatusConfig";

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
  editableFields = [],
  checkBox = true,
  selectedRow,
  onPaginationChange,
}) => {
  const { handleAction } = useHandleAction();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [statusRowStyle, setStatusRowStyle] = useState({});
  const [selected, setSelected] = useState([]);
  const [isEditable, setEditable] = useState(false);
  const [tableData, setTableData] = useState(data);
  

  useEffect(() => {
    setTableData(data);
  }, [data]);

  //pagination logic
  useEffect(() => {
    if (!pagination) setRowsPerPage(data.length);
  }, [data, pagination]);

  useEffect(() => {
    if (selectedRow) {
      const newData = selected.map(({ select, ...rest }) => rest);
      selectedRow(newData);
    }
  }, [selected]);

  useEffect(() => {
    if (onPaginationChange) onPaginationChange({ page, rowsPerPage });
  }, [page, rowsPerPage]);

  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = useMemo(
    () => tableData.slice(startIndex, startIndex + rowsPerPage),
    [tableData, page, rowsPerPage]
  );
  const date = new Date();
  const currentDay = date.toLocaleDateString("en-US", { weekday: "long" });

  const getCellData = (row, header) => {
    if (!row || !header) return null;
    const key = Object.keys(row).find(
      (k) => k.toLowerCase() === header.toLowerCase()
    );
    return key ? row[key] : null;
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

  const handleEdit = useCallback(
    (rowIndex, header, newValue) => {
      const updatedData = [...tableData];
      updatedData[rowIndex] = {
        ...updatedData[rowIndex],
        [header]: newValue,
      };
      setTableData(updatedData);

      setSelected((prev) =>
        prev.includes(tableData[rowIndex])
          ? prev.map((r) =>
              r === tableData[rowIndex] ? { ...r, [header]: newValue } : r
            )
          : prev
      );
    },
    [tableData]
  );

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
                      {renderTopHeader(
                        topHeader.filter((item) =>
                          ["text", "search", "dropdown"].includes(item.type)
                        ),
                        {
                          isEditable,
                          selected,
                          setEditable,
                          tableData,
                          setTableData,
                          handleAction,
                        }
                      )}
                    </div>
                    {/* right */}
                    <div className="flex items-center justify-end gap-5">
                      {renderTopHeader(
                        topHeader.filter((item) =>
                          ["button", "link"].includes(item.type)
                        ),
                        {
                          isEditable,
                          selected,
                          setEditable,
                          tableData,
                          setTableData,
                          handleAction,
                        }
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
                  <Tooltip popover="top" title="Select All" enterDelay={500}>
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
                    whiteSpace: "normal",
                    px: { xs: 1, sm: 1.5, md: 2 },
                    color: "#9ca3af",
                    borderLeft:
                      type === "timetable"
                        ? currentDay === header
                          ? "3px solid #3b82f6 "
                          : "1px solid #e5e7eb"
                        : "none",
                    borderRight:
                      type === "timetable"
                        ? currentDay === header
                          ? "3px solid #3b82f6 "
                          : "1px solid #e5e7eb"
                        : "none",
                    ...styles?.headerCell,
                  }}
                >
                  <DynamicRenderer
                    config={{
                      text: header,
                      styles: {
                        fontWeight: 600,
                        fontSize: {
                          xs: "0.75rem",
                          sm: "0.82rem",
                          md: "0.87rem",
                          lg: "0.9rem",
                        },
                      },
                    }}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {paginatedData?.length > 0 ? (
              paginatedData.map((row, rowIndex) => {
                if (type === "timetable") {
                  return (
                    <TableRow key={rowIndex}>
                      {headers.map((header, colIndex) => {
                        const cellData = getCellData(row, header);
                        const { bg, text, hover } = getSubjectColors(
                          cellData?.subject || ""
                        );

                        return (
                          <TableCell
                            key={colIndex}
                            sx={{
                              textAlign: "center",
                              borderRight:
                                header === currentDay
                                  ? "3px solid #3b82f6"
                                  : "1px solid #e5e7eb",
                              borderLeft:
                                header === currentDay
                                  ? "3px solid #3b82f6"
                                  : "1px solid #e5e7eb",
                              backgroundColor: bg,
                              cursor: cellData?.subject && cellData?.teacher ? "pointer" : "default",
                              transition: "0.2s",
                              color: text,
                              "&:hover": {
                                backgroundColor: cellData?.subject && cellData?.teacher
                                  ? hover
                                  : "transparent",
                              },
                            }}
                            onClick={() => {
                              if (cellData?.subject)
                                handleCellClick(header, cellData);
                            }}
                          >
                            {cellData &&
                            typeof cellData === "object" &&
                            Object.values(cellData).some(Boolean) ? (
                              <Box
                                fontSize={{
                                  xs: "0.75rem",
                                  sm: "0.82rem",
                                  md: "0.87rem",
                                  lg: "0.9rem",
                                }}
                                className="flex flex-col items-center leading-tight text-center"
                              >
                                {cellData.subject && (
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      fontWeight: 600,
                                      fontSize: "1em",
                                      color: text,
                                    }}
                                  >
                                    {cellData.subject}
                                  </Typography>
                                )}
                                {cellData.teacher && (
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontStyle: "italic",
                                      fontSize: "0.9em",
                                      color: "#555",
                                    }}
                                  >
                                    {cellData.teacher}
                                  </Typography>
                                )}
                                {cellData.roomno && (
                                  <Typography
                                    variant="caption"
                                    sx={{ fontSize: "0.8em", color: "#777" }}
                                  >
                                    {cellData.roomno}
                                  </Typography>
                                )}
                              </Box>
                            ) : (
                              <Typography
                                variant="body2"
                                sx={{ color: cellData === "" ? "#999" : text }}
                              >
                                {cellData === "" ? "-" : cellData}
                              </Typography>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                } else {
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
                      {headers.map((header, colIndex) => {
                        const editableFieldConfig = editableFields.find(
                          (f) => f.name?.toLowerCase() === header?.toLowerCase()
                        );
                        const type =
                          header?.toLowerCase() === "status"
                            ? "labelchip"
                            : selected.includes(row) && isEditable
                            ? editableFieldConfig?.type
                            : "default";
                        return (
                          <TableCell
                            key={colIndex}
                            onClick={
                              clickableFields.some(
                                (field) =>
                                  field.toLowerCase() === header.toLowerCase()
                              )
                                ? () =>
                                    handleCellClick(header, row[header], row)
                                : undefined
                            }
                            sx={{
                              cursor: clickableFields.some(
                                (field) =>
                                  field.toLowerCase() === header.toLowerCase()
                              )
                                ? "pointer"
                                : "default",
                            }}
                          >
                            <DynamicRenderer
                              config={{
                                ...editableFieldConfig,
                                type: type,
                                text: getCellData(row, header),
                                styles: columnStyles?.[header] || {},
                                rowStyle: (colors) =>
                                  setStatusRowStyle((prev) => ({
                                    ...prev,
                                    [rowIndex]: colors,
                                  })),
                                onChangeValue: (newVal) =>
                                  handleEdit(rowIndex, header, newVal),
                              }}
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                }
              })
            ) : (
              <TableRow>
                <TableCell colSpan={headers.length + 1} align="center">
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
