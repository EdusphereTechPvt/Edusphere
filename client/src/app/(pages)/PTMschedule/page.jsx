"use client";
import Statspage from "./statspage";
import { DynamicRenderer } from "../../utils/DynamicRender";
import { PTMConfig } from "../../config/FAQConfig";
import Calendar from "@/app/components/Calendar/Calendar";

const Page = () => {
    return (
        <div className="p-4">
            
        <h1 className="text-3xl font-bold mb-1">PTM Scheduling</h1>
        <p className="text-gray-600 mb-4">
            Manage and schedule Parent-Teacher Meetings efficiently.
        </p>

        
        

        
        <div className="flex flex-col md:flex-row md:space-x-4 mt-6">
            
            <div className="w-full md:w-2/3 mb-4 md:mb-0">
            <div className="p-4 bg-white min-h-[400px]">
            <Statspage />
                <h2 className="text-xl font-bold mb-2">PTM Overview & Calendar</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-md h-[300px] flex items-center justify-center text-gray-400 text-base">
                    <Calendar />
                </div>
            </div>
            </div>

            
            <div className="w-full md:w-1/3">
            <div className="p-4 bg-white">
                <h2 className="text-xl font-bold mb-2">PTM Creation Wizard</h2>
                <DynamicRenderer config={PTMConfig} index={0} />
            </div>
            </div>
        </div>
    </div>
);
};

export default Page;
