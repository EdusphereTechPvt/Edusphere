const formConfig = {
  teacher: {
    api: {
      fetch: "/teacher/get",
      submit: "/teacher/save",
    },
    info: [
      {
        type: "title",
        value: "Add New Teacher",
        tag: "h1",
        styles: {
          className:
            "text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-text)]",
          inlineStyle: {},
        },
      },
      {
        type: "desc",
        value: "Fill in the destails below to add new teacher.",
        tag: "p",
        styles: {
          className: "text-[var(--color-text-secondary)] mb-2",
          inlineStyle: {},
        },
      },
    ],
    sections: [
      {
        title: "Personal Information",
        fields: [
          {
            type: "text",
            name: "fullName",
            label: "Full Name",
            placeholder: "Enter full name",
          },
          {
            type: "text",
            name: "contactNumber",
            label: "Contact Number",
            placeholder: "Enter contact number",
          },
          {
            type: "email",
            name: "emailAddress",
            label: "Email Address",
            placeholder: "Enter email address",
          },
        ],
      },
      {
        title: "Assignment Details",
        fields: [
          {
            type: "dropdown",
            data: {
              name: "qualifications",
              label: "Qualifications",
              placeholder: "Select qualification",
              required: true,
              items: [],
            },
          },
          {
            type: "dropdown",
            data: {
              name: "assignedSubjects",
              label: "Assigned Subjects",
              placeholder: "Select subjects",
              required: true,
              items: [],
            },
          },
          {
            type: "dropdown",
            data: {
              name: "assignedClasses",
              label: "Assigned Classes",
              placeholder: "Select classes",
              required: true,
              items: [],
            },
          },
        ],
      },
      {
        title: "Identification",
        fields: [{ type: "qr", name: "qrId", label: "Generate QR ID" }],
      },
      {
        title: "Actions",
        position: "bottom",
        fields: [
          {
            type: "button",
            variant: "outlined",
            text: "Cancel",
            action: "cancel",
          },
          {
            type: "button",
            variant: "contained",
            text: "Save Teacher",
            action: "save",
          },
        ],
      },
    ],
  },

  student: {
    api: {
      fetch: "/student/getStudent",
      submit: "/student/save",
    },
    info: [
      {
        type: "title",
        value: "Add New Student",
        tag: "h1",
        styles: {
          className:
            "text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-text)]",
          inlineStyle: {},
        },
      },
      {
        type: "desc",
        value: "Fill in the destails below to create a new student profile.",
        tag: "p",
        styles: {
          className: "text-[var(--color-text-secondary)] mb-2",
          inlineStyle: {},
        },
      },
    ],
    sections: [
      {
        title: "Personal Information",
        fields: [
          {
            type: "text",
            name: "studentName",
            label: "Student Name",
            placeholder: "Enter student's full name",
          },
          { type: "date", name: "dob", label: "Date of Birth" },
          {
            type: "dropdown",
            data: {
              name: "gender",
              label: "Gender",
              placeholder: "Select gender",
              required: true,
              items: [],
            },
          },
          {
            type: "dropdown",
            data: {
              name: "class",
              label: "Class",
              placeholder: "Select class",
              required: true,
              items: [],
            },
          },
        ],
      },
      {
        title: "Contact Information",
        fields: [
          {
            type: "text",
            name: "contactNumber",
            label: "Parent/Guardian Contact Number",
            placeholder: "Enter contact number",
          },
          {
            type: "text",
            name: "address",
            label: "Address",
            placeholder: "Enter student's address",
          },
        ],
      },
      {
        title: "Student Profile",
        fields: [
          {
            type: "file",
            name: "photo",
            label: "Student Photo",
            placeholder: "Upload Photo",
          },
        ],
      },
      {
        title: "Identification",
        fields: [{ type: "qr", name: "qrId", label: "Generate QR ID" }],
      },
      {
        title: "Actions",
        position: "bottom",
        fields: [
          {
            type: "button",
            variant: "outlined",
            text: "Cancel",
            action: "cancel",
          },
          {
            type: "button",
            variant: "contained",
            text: "Save Student",
            action: "save",
          },
        ],
      },
    ],
  },
  homework: {
    api: {
      fetch: "/home/getHomework",
      submit: "/home/saveHomework",
    },
    sections: [
      {
        title: "",
        fields: [
          {
            type: "dropdown",
            data: {
              name: "selectClasses",
              label: "Select Class",
              placeholder: "Select Class",
              required: true,
              items: [],
            },
          },
        ],
      },
      {
        title: "",
        fields: [
          {
            type: "file",
            name: "file",
            label: "Upload Homework File",
            placeholder: "Upload Photo",
          },
        ],
      },
      {
        title: "",
        fields: [
          {
            type: "textArea",
            name: "details",
            label: "Enter Homework Details",
            placeholder: "Enter homework details here...",
          },
        ],
      },
      {
        title: "Actions",
        position: "bottom",
        fields: [
          {
            type: "button",
            variant: "outlined",
            text: "Cancel",
            action: "cancel",
          },
          {
            type: "button",
            variant: "contained",
            text: "Save Homework",
            action: "save",
          },
        ],
      },
    ],
  },
  demo: {
    api: {},
    sections: [
      {
        title: "",
        fields: [
          {
            type: "text",
            name: "fullName",
            label: "Full Name",
            placeholder: "Enter full name",
          },
          {
            type: "text",
            name: "schoolName",
            label: "School Name",
            placeholder: "Enter Your School Name",
          },
          {
            type: "email",
            name: "emailAddress",
            label: "Email Address",
            placeholder: "Enter email address",
          },
          {
            type: "text",
            name: "phoneNo.",
            label: "Phone Number",
            placeholder: "Enter Your Phone Number",
          },
        ],
      },
      {
        title: "",
        fields: [
          {
            type: "dropdown",
            data: {
              name: "schoolSize",
              label: "School Size",
              placeholder: "Select Size",
              required: true,
              items: [],
            },
          },
          {
            type: "date",
            name: "startingDate",
            label: "Preferred Demo Date",
          },
        ],
      },
      {
        title: "",
        fields: [
          {
            type: "checkBox",
            name: "features",
            label: "Specific Features of Interest",
            values: [
              { name: "attendanceSystem", text: "Attendance System" },
              { name: "leaveManagement", text: "Leave Management" },
              { name: "communicationTools", text: "Communication Tools" },
              { name: "academicTracking", text: "Academic Tracking" },
              { name: "allFeatures", text: "All Features" },
            ],
          },
        ],
      },
      {
        title: "",
        fields: [
          {
            type: "dropdown",
            data: {
              name: "refrence",
              label: "How did you hear about us?",
              placeholder: "Select an option",
              required: true,
              items: [],
            },
          },
        ],
      },
      {
        title: "",
        fields: [
          {
            type: "textArea",
            name: "message",
            label: "Message/Questions",
            placeholder: "Any specific questions or areas you'd like us to focus on during the demo?",
          },
        ],
      },
      {
        title: "Actions",
        position: "bottom",
        fields: [
          {
            type: "button",
            variant: "outlined",
            text: "Cancel",
            action: "cancel",
          },
          {
            type: "button",
            variant: "contained",
            text: "Submit Demo Request",
            action: "save",
          },
        ],
      },
    ],
  },
};

export default formConfig;
