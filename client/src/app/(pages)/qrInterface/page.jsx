import React from "react";
import QrInterfaceConfig from "@/app/config/QrInterfaceConfig";
import Image from "next/image";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { Button } from "@mui/material";

const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="max-w-5xl w-full py-12 text-center">
        <div className="w-full flex items-center justify-center mb-10">
          <div className="md:w-3/4 w-full">
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800 mb-4">
              {QrInterfaceConfig.maintitle}
            </h2>
            <p className="text-sm md:text-lg text-gray-600 mb-4">
              {QrInterfaceConfig.description}
            </p>
          </div>
        </div>

        <div className="space-y-12">
          {QrInterfaceConfig.sections.map((section, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${
                section.image_position === "right" ? "md:flex-row-reverse" : ""
              } items-center gap-6`}
            >
              <div className="md:w-1/2 w-full relative h-56 md:h-80">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover sm:object-contain rounded-lg"
                />
              </div>

              {/* Text */}
              <div className="md:w-1/2 w-full text-center md:text-left px-2">
                <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-3">
                  {section.title}
                </h2>
                <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex items-center justify-center mt-12">
          <div className="md:w-3/4 w-full">
            <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-4">
              {QrInterfaceConfig.last_title}
            </h2>
            <p className="text-sm md:text-lg text-gray-600 mb-4">
              {QrInterfaceConfig.last_description}
            </p>
          </div>
        </div>


        <div className="flex justify-center mt-7">
          <Button
            variant="contained"
            startIcon={<ReportGmailerrorredIcon />}
            sx={{
              color: "white",
              fontWeight: "600",
              py: 1,
              px: 3,
              borderRadius: "5px",
              width: { xs: "100%", md: "auto" },
            }}
          >
            Report Lost Code
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
