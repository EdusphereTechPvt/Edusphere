"use client";
import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import { Typography, Box } from "@mui/material";
import { TableComponent } from "@/app/components/Table/TableComponent";
import { motion, AnimatePresence } from "framer-motion";
import { fetchStudents, studentDetails } from "@/app/services/StudentService";
import { formatTable } from "@/app/utils/Format";
import { topHeader } from "@/app/config/TableConfig";
import { useParams } from "next/navigation";
import { getListDetails } from "@/app/services/ListService";
// import { fetchTeachers, teacherDetails } from "@/app/Service/teacher.service";

const Page = () => {
  const [role, setRole] = useState("student");
  const [selected, setSelected] = useState(null);
  const [fetchedData, setFetchedData] = useState([]);
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {listname} = useParams();
  if (!listname) return <p>Loading...</p>;

  useEffect(() => {
    const fetchData = async () => {
      let result = await getListDetails(listname);
      console.log(result);
    };
    fetchData();
  }, [listname]);

  useEffect(() => {
    if (!selected) return;

    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        let res;
        if (role === "student") res = await studentDetails(selected);
        // if (role === "teacher") res = await teacherDetails(selected);
        setDetails(res);
      } catch (err) {
        console.error("Error fetching details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [selected, role]);


  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        let res = [];
        if (role === "student") res = await fetchStudents();
        // if (role === "teacher") res = await fetchTeachers();
        setFetchedData(res);
        setSelected(null);
      } catch (err) {
        console.error("Error fetching list:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [role]);
  const requiredFields =
    role === "student"
      ? ["id", "name", "Class", "section", "gender", "status"]
      : ["id", "name", "subject", "gender", "status"];

  const { headers, data } = formatTable(fetchedData, requiredFields);

  return (
    <Box sx={{ px: { xs: 2, lg: 3.5 }, py: 4, gap: 4 }}>
      {/* Heading */}
      <Box mb={3}>
        <Typography
          sx={{
            fontSize: { xs: "1.5rem", sm: "1.6rem", md: "1.7rem", lg: "1.8rem" },
            fontWeight: "bold",
          }}
        >
          {role === "student" ? "Student List" : "Teacher List"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View, manage, and track all {role} information.
        </Typography>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: "3rem",
        }}
      >
        {/* Table */}
        <Box flex={selected ? 2 : 1} sx={{ mt: { xs: 0, md: "3rem" }, order: { xs: 2, md: 1 } }}>
          <TableComponent
          topHeader={topHeader}
            headers={headers}
            data={data}
            columnStyles={{
              Id: { fontWeight: "bold" },
              Name: { color: "#1d7ddd" },
            }}
            onClick={(value) => setSelected(value)}
            pagination={true} // use boolean
            clickableFields={["id", "name"]}
            styles={{
              headerCell: {
                color: "black",
                fontWeight: 600,
                backgroundColor: "#f8fafc",
              },
            }}
          />
        </Box>

        <AnimatePresence>
          {selected && (role === "student" || role === "teacher" || role ==="driver") && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex-1 flex justify-center items-center order-1 md:order-2"
            >
              <ProfileCard role={role} data={details} />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default Page;
