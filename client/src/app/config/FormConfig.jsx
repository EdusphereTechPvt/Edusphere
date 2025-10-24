const formConfig = {
  teacher: {
    api: {
      fetch: "/teacher/search",
      submit: "/teacher/save",
      page: {
        mode: {
          add: "/form/teacher/add",
          edit: "/form/teacher/edit",
        },
      },
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
        mode: {
          add: {
            value: "Add New Teacher",
          },
          edit: {
            value: "Edit Teacher",
          },
        },
      },
      {
        type: "desc",
        value: "Fill in the details below to add new teacher.",
        tag: "p",
        styles: {
          className: "text-[var(--color-text-secondary)] mb-2",
          inlineStyle: {},
        },
        mode: {
          add: {
            value: "Fill in the details below to add new teacher.",
          },
          edit: {
            value: "Fill in the details below to edit teacher.",
          },
        },
      },
    ],
    sections: [
      {
        title: "Personal Information",
        fields: [
          {
            type: "text",
            name: "name",
            label: "Full Name",
            placeholder: "Enter full name",
            required: true,
            pattern: {
              value: "^[A-Za-z\\s]*$",
              message: "Name can only contain letters and spaces",
            },
          },
          {
            type: "date",
            name: "dateOfBirth",
            label: "Date of Birth",
            placeholder: "Enter Date of Birth",
            required: true,
          },
          {
            type: "dropdown",
            name: "gender",
            label: "Gender",
            placeholder: "Gender",
            required: true,
            items: [
              { id: "Male", value: "Male" },
              { id: "Female", value: "Female" },
              { id: "Others", value: "Others" },
            ],
          },
        ],
      },
      {
        title: "Contact Information",
        fields: [
          {
            type: "number",
            name: "phone",
            label: "Contact Number",
            placeholder: "Enter contact number",
            required: true,
            maxLength: 10,
          },
          {
            type: "email",
            name: "email",
            label: "Email Address",
            placeholder: "Enter email address",
            required: true,
          },
          {
            type: "textArea",
            name: "address",
            label: "Address",
            placeholder: "Address",
          },
        ],
      },
      {
        title: "Academic Information",
        fields: [
          {
            type: "text",
            name: "qualification",
            label: "Qualification",
            placeholder: "Select Qualification",
            required: true,
          },
          {
            type: "number",
            name: "experienceYears",
            label: "Experience (In Years)",
            placeholder: "Select Experience",
            required: true,
          },
          {
            type: "date",
            name: "joiningDate",
            label: "Joining Date",
            placeholder: "Select Date of Joining",
            required: true,
          },
        ],
      },
      {
        title: "Assignment Details",
        fields: [
          {
            type: "multiselect",
            name: "classes",
            fieldName: "name",
            collectionName: "class",
            label: "Assigned Classes",
            placeholder: "Select classes",
            items: [],
            isDistinct: true,
            styles: {
              selectStyle: {
                minHeight: "2.5rem",
              },
            },
          },
          {
            type: "multiselect",
            name: "sections",
            fieldName: "name",
            collectionName: "section",
            label: "Assigned Sections",
            placeholder: "Select sections",
            isDistinct: true,
            dependancy: ["classes"],
            items: [],
            styles: {
              selectStyle: {
                minHeight: "2.5rem",
              },
            },
          },
          {
            type: "multiselect",
            name: "subjects",
            fieldName: "name",
            collectionName: "subject",
            label: "Assigned Subjects",
            placeholder: "Select subjects",
            isDistinct: true,
            required: false,
            dependancy: ["classes"],
            items: [],
            styles: {
              selectStyle: {
                minHeight: "2.5rem",
              },
            },
          },
        ],
      },
      {
        title: "Emergency Contact Information",
        fields: [
          {
            type: "text",
            name: "emergencyContactName",
            label: "Contact Name",
            placeholder: "Emergency Contact Name",
            required: false,
            pattern: {
              value: "^[A-Za-z\\s]*$",
              message: "Contact Name can only contain letters and spaces",
            },
          },
          {
            type: "text",
            name: "emergencyContactRelation",
            label: "Relation To Teacher",
            placeholder: "Enter the relation to teacher",
            required: false,
            pattern: {
              value: "^[A-Za-z\\s]*$",
              message: "Relation can only contain letters and spaces",
            },
          },
          {
            type: "number",
            name: "emergencyContactPhone",
            label: "Contact Phone",
            placeholder: "Emergency Contact Phone",
            required: false,
            maxLength: 10,
          },
        ],
      },
      {
        fields: [
          {
            type: "checkBox",
            name: "isActive",
            values: [{ name: "isActive", text: "Active" }],
            styles: {
              className: "font-bold text-black",
            },
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
            text: "Save Teacher",
            action: "submit",
            mode: {
              add: {
                text: "Save Teacher",
              },
              edit: {
                text: "Update Teacher",
              },
            },
          },
        ],
      },
    ],
  },

  student: {
    api: {
      fetch: "/student/getStudent",
      submit: "/student/save",
      page: {
        mode: {
          add: "/form/student/add",
          edit: "/form/student/edit",
        },
      },
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
        mode: {
          add: {
            value: "Add New Student",
          },
          edit: {
            value: "Edit Student",
          },
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
        mode: {
          add: {
            value:
              "Fill in the destails below to create a new student profile.",
          },
          edit: {
            value: "Fill in the destails below to edit student profile.",
          },
        },
      },
    ],
    sections: [
      {
        title: "Personal Information",
        fields: [
          {
            type: "text",
            name: "name",
            label: "Student Name",
            placeholder: "Enter student's full name",
            required: true,
            pattern: {
              value: "^[A-Za-z\\s]*$",
              message: "Student Name can only contain letters and spaces",
            },
          },
          {
            type: "date",
            name: "dateOfBirth",
            label: "Date of Birth",
            required: true,
          },
          {
            type: "dropdown",
            name: "gender",
            label: "Gender",
            placeholder: "Select gender",
            required: true,
            items: [
              { id: "male", value: "Male" },
              { id: "female", value: "Female" },
              { id: "other", value: "Other" },
            ],
          },
          {
            type: "dropdown",
            name: "classes",
            fieldName: "name",
            collectionName: "class",
            label: "Class",
            placeholder: "Select class",
            required: true,
            items: [],
            isDistinct: true,
          },
          {
            type: "dropdown",
            name: "sections",
            fieldName: "name",
            collectionName: "section",
            label: "Section",
            placeholder: "Select Section",
            required: true,
            dependancy: ["classes"],
            items: [],
            isDistinct: true,
          },
        ],
      },
      {
        title: "Parent/Guardian Informations",
        fields: [
          {
            type: "text",
            name: "parentName",
            label: "Parent Name",
            placeholder: "Enter parent's full name",
            required: true,
            pattern: {
              value: "^[A-Za-z\\s]*$",
              message: "Parent Name can only contain letters and spaces",
            },
          },
          {
            type: "text",
            name: "guardianName",
            label: "Guardian Name",
            placeholder: "Enter guardian's full name",
            pattern: {
              value: "^[A-Za-z\\s]*$",
              message: "Guardian Name can only contain letters and spaces",
            },
          },
          {
            type: "email",
            name: "parentEmail",
            label: "Parent/Guardian Email",
            required: true,
            placeholder: "Enter parent's email",
          },
          {
            type: "number",
            name: "parentContactNumber",
            label: "Parent/Guardian Contact Number",
            placeholder: "Enter parent's contact number",
            required: true,
            maxLength: 10,
          },
          {
            type: "text",
            name: "parentOccupation",
            label: "Occupation",
            placeholder: "Enter parent/guardian's occupation",
            pattern: {
              value: "^[A-Za-z\\s]*$",
              message: "Occupation can only contain letters and spaces",
            },
          },
          {
            type: "text",
            name: "motherName",
            label: "Mother's Name",
            placeholder: "Enter mother's full name",
            pattern: {
              value: "^[A-Za-z\\s]*$",
              message: "Mother's Name can only contain letters and spaces",
            },
          },
        ],
      },
      {
        title: "Contact Information",
        fields: [
          {
            type: "number",
            name: "contactNumber",
            label: "Student Contact Number",
            placeholder: "Enter contact number",
            maxLength: 10,
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
            name: "studentPhoto",
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
            action: "submit",
            mode: {
              add: {
                text: "Save Student",
              },
              edit: {
                text: "Update Student",
              },
            },
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
            name: "selectClasses",
            label: "Select Class",
            placeholder: "Select Class",
            required: true,
            items: [],
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
    api: {
      submit: "/requestdemo/add",
    },
    sections: [
      {
        title: "",
        fields: [
          {
            type: "text",
            name: "name",
            label: "Full Name",
            placeholder: "Enter full name",
            required: true,
            pattern: {
              value: "^[A-Za-z\\s]*$",
              message: "Student Name can only contain letters and spaces",
            },
          },
          {
            type: "text",
            name: "schoolName",
            label: "School Name",
            placeholder: "Enter Your School Name",
          },
          {
            type: "email",
            name: "email",
            label: "Email Address",
            placeholder: "Enter email address",
          },
          {
            type: "number",
            name: "phone",
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
            name: "schoolSize",
            label: "School Size",
            placeholder: "Select Size",
            required: true,
            items: [
              { value: "Less than 100", id: "Less than 100" },
              { value: "Between 100 and 250", id: "Between 100 and 250" },
              { value: "Between 250 and 500", id: "Between 250 and 500" },
              { value: "More than 500", id: "More than 500" },
            ],
          },
          {
            type: "date",
            name: "preferredDate",
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
            name: "reference",
            label: "How did you hear about us?",
            placeholder: "Select an option",
            required: true,
            items: [
              { value: "Facebook", id: "Facebook" },
              { value: "Google", id: "Google" },
              { value: "News Paper", id: "New Paper" },
              { value: "Instagram", id: "Instagram" },
            ],
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
            placeholder:
              "Any specific questions or areas you'd like us to focus on during the demo?",
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
            action: "submit",
          },
        ],
      },
    ],
  },
  subject: {
    api: {
      fetch: "/subject/search",
      submit: "/subject/save",
      page: {
        mode: {
          add: "/form/subject/add",
          edit: "/form/subject/edit",
        },
      },
    },
    info: [
      {
        type: "title",
        value: "Add New Subject",
        tag: "h1",
        styles: {
          className:
            "text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-text)]",
          inlineStyle: {},
        },
        mode: {
          add: {
            value: "Add New Subject",
          },
          edit: {
            value: "Edit Subject",
          },
        },
      },
      {
        type: "desc",
        value: "Fill in the details below to add a new subject.",
        tag: "p",
        styles: {
          className: "text-[var(--color-text-secondary)] mb-2",
          inlineStyle: {},
        },
        mode: {
          add: {
            value: "Fill in the details below to add new subject.",
          },
          edit: {
            value: "Fill in the details below to edit subject.",
          },
        },
      },
    ],
    sections: [
      {
        title: "Subject Information",
        fields: [
          {
            type: "text",
            name: "name",
            label: "Subject Name",
            placeholder: "e.g., Math",
            required: true,
            pattern: {
              value: "^[A-Za-z\\s]*$",
              message: "Subject Name can only contain letters and spaces",
            },
          },
          {
            type: "text",
            name: "description",
            label: "Description",
            placeholder: "e.g., The Subject is based on Mathematics",
            required: true,
          },
          {
            type: "text",
            name: "code",
            label: "Subject Code (Optional)",
            placeholder: "e.g., MATH101",
            pattern: {
              value: "^[A-Za-z0-9s]*$",
              message:
                "Subject Code can only contain letters, numbers, and spaces",
            },
            required: false,
          },
          {
            type: "number",
            name: "credits",
            label: "Credit (Optional)",
            placeholder: "e.g., 10",
            required: false,
          },
          {
            type: "multiselect",
            name: "classes",
            label: "Classes",
            fieldName: "name",
            collectionName: "class",
            placeholder: "Enter the classes associated with the subject",
            isDistinct: true,
            required: true,
            items: [],
            styles: {
              selectStyle: {
                minHeight: "2.5rem",
              },
            },
          },
          {
            type: "multiselect",
            name: "teachers",
            label: "Teachers",
            fieldName: "name",
            collectionName: "teacher",
            placeholder: "Enter the teachers associated with the subject",
            required: false,
            dependancy: ["classes"],
            isDistinct: true,
            items: [],
            styles: {
              selectStyle: {
                minHeight: "2.5rem",
              },
            },
          },
          {
            type: "checkBox",
            name: "isActive",
            values: [{ name: "isActive", text: "Active" }],
            styles: {
              className: "font-bold text-black",
            },
          },
        ],
      },
      {
        title: "Actions",
        fields: [
          {
            type: "button",
            text: "Cancel",
            variant: "outlined",
            action: "cancel",
          },
          {
            type: "button",
            text: "Save Subject",
            variant: "contained",
            action: "submit",
            mode: {
              add: {
                text: "Save Subject",
              },
              edit: {
                text: "Update Subject",
              },
            },
          },
        ],
      },
    ],
  },
  class: {
    api: {
      fetch: "/class/search",
      submit: "/class/save",
      page: {
        mode: {
          add: "/form/class/add",
          edit: "/form/class/edit",
        },
      },
    },
    info: [
      {
        type: "title",
        value: "Add New Class",
        tag: "h1",
        styles: {
          className:
            "text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-text)]",
          inlineStyle: {},
        },
        mode: {
          add: {
            value: "Add New Class",
          },
          edit: {
            value: "Edit Class",
          },
        },
      },
      {
        type: "desc",
        value: "Fill in the details below to add a new Class.",
        tag: "p",
        styles: {
          className: "text-[var(--color-text-secondary)] mb-2",
          inlineStyle: {},
        },
        mode: {
          add: {
            value: "Fill in the details below to add new class.",
          },
          edit: {
            value: "Fill in the details below to edit class.",
          },
        },
      },
    ],
    sections: [
      {
        title: "Class Information",
        fields: [
          {
            type: "number",
            name: "name",
            label: "Class No.",
            placeholder: "e.g., 10",
            max: "12",
            required: true,
          },
          {
            type: "number",
            name: "gradeLevel",
            label: "Grade (in number)",
            placeholder: "e.g., 10",
            required: true,
          },
          {
            type: "text",
            name: "academicYear",
            label: "Academic Year",
            placeholder: "e.g., 2025-2026",
            required: false,
            pattern: {
              value: "^\\d{0,4}(-\\d{0,4})?$",
              message: "Academic Year must be in the format YYYY-YYYY",
            },
          },
          {
            type: "multiselect",
            name: "sections",
            label: "Sections",
            fieldName: "name",
            collectionName: "section",
            filter: {
              add: { classes: null },
              edit: { classes: `$_id` },
            },
            placeholder: "Select the sections to include",
            required: false,
            items: [],
            isDistinct: true,
            styles: {
              selectStyle: {
                minHeight: "2.5rem",
              },
            },
          },
          {
            type: "multiselect",
            name: "subjects",
            label: "Subjects",
            fieldName: "name",
            collectionName: "subject",
            placeholder: "Select the Subjects to be included",
            required: true,
            items: [],
            isDistinct: true,
            styles: {
              selectStyle: {
                minHeight: "2.5rem",
              },
            },
          },
          {
            type: "text",
            name: "comments",
            label: "Description",
            placeholder: "e.g., This class belongs to students of class 10",
            required: false,
          },
        ],
      },
      {
        fields: [
          {
            type: "checkBox",
            name: "isActive",
            values: [{ name: "isActive", text: "Active" }],
            styles: {
              className: "font-bold text-black",
            },
          },
        ],
      },
      {
        title: "Actions",
        fields: [
          {
            type: "button",
            text: "Cancel",
            variant: "outlined",
            action: "cancel",
          },
          {
            type: "button",
            text: "Save Subject",
            variant: "contained",
            action: "submit",
            mode: {
              add: {
                text: "Save Class",
              },
              edit: {
                text: "Update Class",
              },
            },
          },
        ],
      },
    ],
  },
  section: {
    api: {
      fetch: "/section/search",
      submit: "/section/save",
      page: {
        mode: {
          add: "/form/section/add",
          edit: "/form/section/edit",
        },
      },
    },
    info: [
      {
        type: "title",
        value: "Add New Section",
        tag: "h1",
        styles: {
          className:
            "text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-text)]",
          inlineStyle: {},
        },
        mode: {
          add: {
            value: "Add New Section",
          },
          edit: {
            value: "Edit Section",
          },
        },
      },
      {
        type: "desc",
        value: "Fill in the details below to add a new Section.",
        tag: "p",
        styles: {
          className: "text-[var(--color-text-secondary)] mb-2",
          inlineStyle: {},
        },
        mode: {
          add: {
            value: "Fill in the details below to add new section.",
          },
          edit: {
            value: "Fill in the details below to edit section.",
          },
        },
      },
    ],
    sections: [
      {
        title: "Section Information",
        fields: [
          {
            type: "text",
            name: "name",
            label: "Section Name",
            placeholder: "e.g., A",
            required: true,
            maxLength: 1,
            pattern: {
              value: "^[A-Za-z\\s]*$",
              message: "Section Name can only contain one letter",
            },
          },
          {
            type: "number",
            name: "capacity",
            label: "Capacity (in number)",
            placeholder: "e.g., 50",
            required: true,
          },
          {
            type: "dropdown",
            name: "classes",
            label: "Select Class",
            fieldName: "name",
            collectionName: "class",
            placeholder: "e.g., Class 10",
            required: true,
            items: [],
            isDistinct: true,
          },
          {
            type: "number",
            name: "roomNumber",
            label: "Room Number",
            placeholder: "e.g., 102",
            required: false,
          },
          {
            type: "dropdown",
            name: "classTeacher",
            fieldName: "name",
            collectionName: "teacher",
            label: "Select Class Teacher",
            placeholder: "e.g., Mr. Ashutosh",
            required: true,
            items: [],
            isDistinct: true,
          },
          {
            type: "multiselect",
            required: false,
            name: "students",
            label: "Students",
            fieldName: "name",
            collectionName: "student",
            placeholder: "Select the students",
            items: [],
            isDistinct: true,
            dependancy: ["classes"],
            styles: {
              selectStyle: {
                minHeight: "2.5rem",
              },
            },
          },
          {
            type: "multiselect",
            name: "teachers",
            label: "Teachers",
            fieldName: "name",
            collectionName: "teacher",
            placeholder: "Select the teachers",
            required: true,
            items: [],
            isDistinct: true,
            styles: {
              selectStyle: {
                minHeight: "2.5rem",
              },
            },
          },
          {
            type: "text",
            name: "comments",
            label: "Description",
            placeholder: "e.g., This class belongs to students of class 10",
            required: false,
          },
        ],
      },
      {
        fields: [
          {
            type: "checkBox",
            name: "isActive",
            values: [{ name: "isActive", text: "Active" }],
            styles: {
              className: "font-bold text-black",
            },
          },
        ],
      },
      {
        title: "Actions",
        fields: [
          {
            type: "button",
            text: "Cancel",
            variant: "outlined",
            action: "cancel",
          },
          {
            type: "button",
            text: "Save Section",
            variant: "contained",
            action: "submit",
            mode: {
              add: {
                text: "Save Section",
              },
              edit: {
                text: "Update Section",
              },
            },
          },
        ],
      },
    ],
  },
};

export default formConfig;
