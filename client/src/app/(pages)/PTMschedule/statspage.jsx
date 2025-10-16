"use client";
import React from "react";
import GenericCard from "../../components/CardComponent/GenericCard";

const StatsPage = () => {
  const data = [
    { title: "Total Scheduled Meetings", desc: "250" },
    { title: "Upcoming Sessions", desc: "30" },
    { title: "Participation Rate", desc: "95%" },
  ];

  return (
    <div className="w-full p-2">
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-10">
        {data.map((item, index) => (
          <div key={index} className="sm:flex-1 ">
            <GenericCard
              title={item.title}
              desc={item.desc}
              styles={{
                cardStyle: {
                  inlineStyle: {
                    minHeight: 100,
                    minWidth: 140,
                    backgroundColor: "#f5f5f5",
                    padding: "1px",
                  },
                },
                textContainerStyle: {
                  titleStyle: {
                    inlineStyle: {
                      fontSize: "0.75rem",
                      color: "#666",
                      marginBottom: "4px",
                    },
                  },
                  descStyle: {
                    inlineStyle: {
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "#333",
                    },
                  },
                },
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsPage;