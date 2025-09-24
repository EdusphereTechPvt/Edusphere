const studentData = [
    {
        id: "#1024",
        name: "Olivia Rhye",
        Class: "Grade 10",
        section: "B",
        gender: "Female",
        status: "Active",
    },
    {
        id: "#1025",
        name: "Phoenix Baker",
        Class: "Grade 9",
        section: "A",
        gender: "Male",
        status: "Active",
    },
    {
        id: "#1026",
        name: "Lana Steiner",
        Class: "Grade 11",
        section: "C",
        gender: "Female",
        status: "On Hold",
    },
    {
        id: "#1027",
        name: "Demi Wilkinson",
        Class: "Grade 10",
        section: "A",
        gender: "Female",
        status: "Inactive",
    },
    {
        id: "#1028",
        name: "Candice Wu",
        Class: "Grade 12",
        section: "B",
        gender: "Male",
        status: "Active",
    },
];

export const studentDetails = (id) => {

    return studentData.find((student) => student.id === id) || null;
};

export const fetchStudents = () => {

    return studentData
}