"use client";

import StatCard from "@/app/components/CardComponent/StatCard";
import { getUsers } from "@/app/services/UserService";
import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";

import { manageConfig } from "../../config/ListConfig";
import GenericCard from "@/app/components/CardComponent/GenericCard";
import { useRouter } from "next/navigation";
import { TableComponent } from "@/app/components/Table/TableComponent";
import { formatElement, formatTable } from "@/app/utils/Format";
import { getElements } from "@/app/services/ElementAccessService";

const Manage = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState([]);
  const [elements, setElements] = useState([]);
  const [count, setCount] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    roles: { admin: 0, teacher: 0, student: 0, parent: 0 },
  });  

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await getUsers();
      setUserDetails(res);
      setCount(getCount(res));
    };
    getAllUsers();
  }, []);

  useEffect(() => {
    const fetchElements = async () => {
      let elements = await getElements(`manage`);
      elements = formatElement("table", elements);
      setElements(elements);
    };
    fetchElements();
  }, []);

  const getCount = (result) => {
    const counts = {
      total: result.length,
      active: 0,
      inactive: 0,
      roles: { admin: 0, teacher: 0, student: 0, parent: 0 },
    };

    result.forEach((user) => {
      if (user.isActive) counts.active++;
      else counts.inactive++;
      if (user.role && counts.roles.hasOwnProperty(user.role)) {
        counts.roles[user.role]++;
      }
    });

    return counts;
  };

  // for BAr diagram
  const roleLabels = Object.keys(count.roles);
  const roleValues = Object.values(count.roles);

  // for table
  const tableData = formatTable(
    userDetails,
    manageConfig.sections[3].configField
  );
  return (
    <Box sx={{ px: { xs: 2, lg: 3.5 }, py: 4 }}>
      <Box mb={3}>
        <Typography
          sx={{
            fontSize: {
              xs: "1.2rem",
              sm: "1.4rem",
              md: "1.5rem",
              lg: "1.8rem",
            },
            fontWeight: "bold",
          }}
        >
          {manageConfig.header.title}
        </Typography>
        <Typography
          sx={{
            fontSize: {
              xs: "0.8rem",
              sm: "0.9rem",
              md: "1rem",
            },
          }}
          variant="body1"
          color="text.secondary"
        >
          {manageConfig.header.subtitle}
        </Typography>
      </Box>

      <div className="flex items-center gap-4 flex-wrap mb-9">
        {manageConfig.sections[0].items.map((item, index) => (
          <div key={index} className="flex-1">
            <StatCard
              label={item.label}
              value={
                item?.isRole
                  ? count.roles[item.name] || 0
                  : count[item.name] || 0
              }
              styles={manageConfig.sections[0].styles}
            />
          </div>
        ))}
      </div>

      <div>
        {manageConfig.sections.map((section, index) => {
        if (section.type === "chart" && section.chartType === "bar") {
          return (
            <Box key={index} sx={section.styles.Box.inlineStyle}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  fontSize: {
                    xs: "1rem",
                    sm: "1.1rem",
                    md: "1.2rem",
                  },
                }}
              >
                {section.title}
              </Typography>

              <Typography
                fontSize={{
                  xs: "1rem",
                  sm: "1.1rem",
                  md: "1.2rem",
                }}
                color="text.secondary"
                mb={5}
                pl={5}
              >
                {count.total}
              </Typography>

              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: roleLabels,
                    tickMinStep: 1,
                  },
                ]}
                yAxis={[]}
                series={[
                  {
                    data: roleValues,
                    color: "#7C3AED",
                  },
                ]}
                height={300}
                sx={{
                  "& .MuiChartsAxis-line": { display: "none" },
                  "& .MuiChartsAxis-tickLabel": {
                    fill: "#555",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  },
                  "& .MuiChartsLegend-root": { display: "none" },
                  "& .MuiBarElement-root": {
                    borderRadius: 3,
                    "&:nth-of-type(1)": { fill: "#60A5FA" },
                    "&:nth-of-type(2)": { fill: "#14B8A6" },
                    "&:nth-of-type(3)": { fill: "#A855F7" },
                    "&:nth-of-type(4)": { fill: "#6366F1" },
                  },
                }}
              />
            </Box>
          );
        }
      })}
      <div className="flex items-center gap-4 flex-wrap my-12">
        {manageConfig.sections[2].items.map((item, index) => (
          <div key={index} className="flex-1 w-full">
            <GenericCard
              title={item.title}
              icon={item.icon}
              styles={{
                ...manageConfig.sections[2].styles,
                ...item.styles,
              }}
              onclick={() => router.push(item.onClick)}
            />
          </div>
        ))}
      </div>

      </div>

      {manageConfig.sections[3].type === "table" && (
        <TableComponent
          topHeader={elements}
          headers={tableData.headers}
          data={tableData.data}
          clickableFields={manageConfig.sections[3].clickableFields}
          // checkBox={true} after adding new table to dev
          pagination={true}
        />
      )}
    </Box>
  );
};

export default Manage;
