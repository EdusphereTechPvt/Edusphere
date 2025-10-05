"use client";
import HeaderCard from "@/app/components/CardComponent/HeaderCard";
import ClassInfoCard from "./classInfo";
import {Box , Typography} from "@mui/material";

const items = [
    {
        label: "Math",
        percentage: 50,
    },
    {
        label: "Science",
        percentage: 60,
    },
    {
        label: "Hindi",
        percentage: 30,
    },
    {
        label: "Physics",
        percentage: 70,
    },
];
const classInfoData = {
    classTeacher: "Ms. Anjali Sharma",
    assignedroom: "Room 101",
    totalperiodsweeks: "10 periods/week",
}
const SubjectDistribution = ({items}) => {
    return (
        <Box sx={{minWidth: "100%" ,p:"10px" , boxShadow: "0px 1px 3px rgba(0,0,0,0.05)"}}> 
            <HeaderCard title="Subject Distribution" items={items} styles={{
                titleStyle: {
                    inlineStyle: {
                        fontSize: "1.2rem",
                        fontWeight: "600",
                    },
                },
            }}/>
        </Box>
    );
}

const page= ()=>{
    return (
    <>
        <Box sx={{minWidth: "100%"}}>
            <SubjectDistribution items={items} />
        </Box>
        <Box sx={{minWidth: "100%" ,p:"10px"}}>
            <ClassInfoCard data={classInfoData} />
        </Box>
    </>
    
    )
}

export default page;