"use client";
import React from "react";
import faqconfig from "@/app/config/FAQConfig";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import VisibilityIcon from '@mui/icons-material/Visibility';
const Page = () => {
  const { title, subtitle, tabs } = faqconfig;
  const [value, setValue] = React.useState("0"); // default 0 index tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <div className="text-center mb-6 mt-5">
        <h1 className="text-5xl font-extrabold">{title}</h1>
        <p className="mt-3 text-gray-500">{subtitle}</p>
        <div className="flex justify-center mb-8 mt-5">
          <div className="relative w-[25%]">
            {/* Search Icon */}
            <SearchRoundedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 " />

            {/* Input Box */}
            <input
              type="text"
              placeholder="Search for answers"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-[#2196F3] shadow-sm"
              style={{ borderColor: "#E5E7EB" }}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <TabContext value={value}>
        {/* tabs-name */}
        <Box
          sx={{
          width: "68%", 
          margin: "auto",
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TabList onChange={handleChange} aria-label="faq tabs">
            {tabs.map((tab, idx) => (
              <Tab
                key={idx}
                label={tab.name}
                value={idx.toString()}
                sx={{ textTransform: "none" }}
              />
            ))}
          </TabList>
        </Box>
        {/* tab-items */}
        <div className="ml-[28%] mt-10">
          <h1 className="text-xl font-bold">Popular Questions</h1>
        </div>
        {tabs.map((tab, idx) => (
          <TabPanel key={idx} value={idx.toString()}>
            <div className="flex flex-col gap-4">
              {tab.items.map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg p-6 mb-6 shadow-lg border-t border-[#2196F3] w-[45%] max-w-3xl mx-auto"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-bold">{item.title}</h3>

                    <span className=" flex items-center gap-1 text-xs text-gray-400">
                       <VisibilityIcon  fontSize="4rem" />{item.views}</span>
                  </div>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                  <div className="mt-3 border-t border-gray-200">
                    <span className="text-gray-500 text-sm">{item.ques}</span>
                  </div>
                  {/* Buttons */}
                  <div className="flex gap-2 mt-3">
                    <button className=" flex items-center gap-1 px-3 py-1 border border-[#E5E7EB] rounded-md text-black cursor-pointer">
                      <ThumbUpRoundedIcon  fontSize="small" />
                     {item.likes}
                    </button>
                    <button className=" flex items-center gap-1 px-3 py-1  border border-[#E5E7EB] rounded text-gray-500 cursor-pointer">
                      <ThumbDownRoundedIcon fontSize="small" />
                      {item.dislikes}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default Page;