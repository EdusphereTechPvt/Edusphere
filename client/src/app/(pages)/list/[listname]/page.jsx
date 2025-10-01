"use client";
import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import { Typography, Box } from "@mui/material";
import { TableComponent } from "@/app/components/Table/TableComponent";
import { motion, AnimatePresence } from "framer-motion";
import { formatElement, formatTable } from "@/app/utils/Format";
import { useParams, useRouter } from "next/navigation";
import { getListDetails, getProfileCardData } from "@/app/services/ListService";
import { allowedListRoutes } from "@/app/config/RouterConfig";
import { getElements } from "@/app/services/ElementAccessService";
import { listConfig } from "@/app/config/ListConfig";

const Page = () => {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [profileCardData, setProfileCardData] = useState(null);
  const [fetchedData, setFetchedData] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false)
  const [elements, setElements] = useState([]);

  const { listname } = useParams();
  if (!listname) return <p>Loading...</p>;

  useEffect(() => {
    !allowedListRoutes.includes(listname) && router.push("/error/404");
    const fetchData = async () => {
      if (!listname) return;

      let result = await getListDetails(listname);
      setFetchedData(result.data);

      let elements = await getElements(`list/${listname}`);
      elements = formatElement("table", elements);
      setElements(elements);
    };
    fetchData();
  }, [listname, updateFlag]);

  useEffect(()=>{
    const fetchProfileCardData = async() => {
      if(!selected) return;

      let column = listConfig[listname].tableHeader.filter(data => data.displayName === selected.header)
      let profileCardData = await getProfileCardData(listname,{key: column[0].map, value: selected.value})
      setProfileCardData(profileCardData)

      let elements = await getElements(`list/${listname}/profilecard`)
      elements = formatElement("profile", elements)
      setProfileCardData({...profileCardData, buttons: elements})
    }
    fetchProfileCardData()
  },[selected])

  const { headers, data } = formatTable(
    fetchedData,
    listConfig[listname]?.tableHeader || []
  );

  return (
    <Box sx={{ px: { xs: 2, lg: 3.5 }, py: 4, gap: 4 }}>
      {/* Heading */}
      <Box mb={3}>
        <Typography
          sx={{
            fontSize: {
              xs: "1.5rem",
              sm: "1.6rem",
              md: "1.7rem",
              lg: "1.8rem",
            },
            fontWeight: "bold",
          }}
        >
          {`${listname.substring(0,1).toUpperCase()+ listname.substring(1)} Lists`}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View, manage, and track all {listname} information.
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
        <Box
          flex={selected ? 2 : 1}
          sx={{ mt: { xs: 0, md: "3rem" }, order: { xs: 2, md: 1 } }}
        >
          <TableComponent
            topHeader={elements}
            headers={headers}
            data={data}
            columnStyles={{
              Id: { fontWeight: "bold" },
              Name: { color: "#1d7ddd" },
            }}
            onClick={(header,value) => setSelected({header,value})}
            pagination={true} // use boolean
            clickableFields={listConfig[listname]?.clickableFields}
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
          {selected &&
          (
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex-1 flex justify-center items-center order-1 md:order-2"
              >
                <ProfileCard role={listname} data={profileCardData || {}} updateFlag={updateFlag} setUpdateFlag={setUpdateFlag}/>
              </motion.div>
            )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default Page;
