const formConfig = {
  teacher: {
    api: {
      fetch: "/teacher/search",
      submit: "/teacher/save",
      page: {
        mode: {
          add: "/form/teacher/add",
          edit: "/form/teacher/edit"
        }
      }
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
            value: "Add New Teacher"
          },
          edit: {
            value: "Edit Teacher"
          }
        }
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
            value: "Fill in the details below to add new teacher."
          },
          edit: {
            value: "Fill in the details below to edit teacher."
          }
        }
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
            required: true
          },
          {
            type: "date",
            name: "dateOfBirth",
            label: "Date of Birth",
            placeholder: "Enter Date of Birth",
            required: true
          },
          {
            type: "dropdown",
            name: "gender",
            label: "Gender",
            placeholder: "Gender",
            required: true,
            items: [
              { id: "Male", value: 'Male' },
              { id: "Female", value: 'Female' },
              { id: "Others", value: 'Others' }
            ]
          },
        ],
      },
      {
        title: "Contact Information",
        fields: [
          {
            type: "text",
            name: "phone",
            label: "Contact Number",
            placeholder: "Enter contact number",
            required: true,
            minLenght: 10
          },
          {
            type: "email",
            name: "email",
            label: "Email Address",
            placeholder: "Enter email address",
            required: true
          },
          {
            type: "textArea",
            name: "address",
            label: "Address",
            placeholder: "Address"
          },
        ]
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
            type: "text",
            name: "experienceYears",
            label: "Experience",
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
        ]
      },
      {
        title: "Assignment Details",
        fields: [
          {
            type: "multiselect",
            name: "classes",
            label: "Assigned Classes",
            placeholder: "Select classes",
            items: [],
            isDistinct: true,
            styles: {
              selectStyle: {
                height: "3.5rem"
              }
            }
          },
          {
            type: "multiselect",
            name: "sections",
            label: "Assigned Sections",
            placeholder: "Select sections",
            isDistinct: true,
            dependancy: ["classes"],
            items: [],
            styles: {
              selectStyle: {
                height: "3.5rem"
              }
            }
          },
          {
            type: "multiselect",
            name: "subjects",
            label: "Assigned Subjects",
            placeholder: "Select subjects",
            isDistinct: true,
            dependancy: ["sections"],
            items: [],
            styles: {
              selectStyle: {
                height: "3.5rem"
              }
            }
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
          },
          {
            type: "text",
            name: "emergencyContactRelation",
            label: "Relation To Teacher",
            placeholder: "Enter the relation to teacher",
            required: false,
          },
          {
            type: "text",
            name: "emergencyContactPhone",
            label: "Contact Phone",
            placeholder: "Emergency Contact Phone",
            required: false,
          },
        ],
      },
      {
        fields: [
          {
            type: "checkBox",
            name: "isActive",
            values: [
              { name: "isActive", text: "Active" }
            ],
            styles: {
              className: "font-bold text-black"
            }
          },
        ]
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
                text: "Save Teacher"
              },
              edit: {
                text: "Update Teacher"
              }
            }
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
          { type: "date", name: "dateOfBirth", label: "Date of Birth" },
          {
            type: "dropdown",
            name: "gender",
            label: "Gender",
            placeholder: "Select gender",
            required: true,
            items: [],
          },
          {
            type: "dropdown",
            name: "class",
            label: "Class",
            placeholder: "Select class",
            required: true,
            items: [],
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
      submit: "/requestdemo/add"
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
            minLength: 3,
            title: "Minimum length is 3 characters",
            pattern: "^[a-zA-Z ]+$",
            patternTitle: "Only alphabets and spaces are allowed",
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
            type: "text",
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
              { value: "Less than 100", id : "Less than 100" },
              { value: "Between 100 and 250", id : "Between 100 and 250" },
              { value: "Between 250 and 500", id : "Between 250 and 500" },
              { value: "More than 500", id : "More than 500" },
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
              { value: "Facebook",  id : "Facebook"},
              { value: "Google", id : "Google" },
              { value: "News Paper", id : "New Paper" },
              { value: "Instagram", id : "Instagram" },
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
          edit: "/form/subject/edit"
        }
      }
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
            value: "Add New Subject"
          },
          edit: {
            value: "Edit Subject"
          }
        }
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
            value: "Fill in the details below to add new subject."
          },
          edit: {
            value: "Fill in the details below to edit subject."
          }
        }
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
            name: "subjectCode",
            label: "Subject Code (Optional)",
            placeholder: "e.g., MATH101",
            required: false,
          },
          {
            type: "text",
            name: "credits",
            label: "Credit (Optional)",
            placeholder: "e.g., 10",
            required: false,
          },
          {
            type: "multiselect",
            name: "classIds",
            label: "Classes",
            placeholder: "Enter the classes associated with the subject",
            isDistinct: true,
            required: false,
            items: [],
            styles: {
              selectStyle: {
                height: "3.5rem",
              }
            }
          },
          {
            type: "multiselect",
            name: "teacherIds",
            label: "Teachers",
            placeholder: "Enter the teachers associated with the subject",
            required: false,
            isDistinct: true,
            items: [],
            styles: {
              selectStyle: {
                height: "3.5rem"
              }
            }
          },
          {
            type: "checkBox",
            name: "isActive",
            values: [
              { name: "isActive", text: "Active" }
            ],
            styles: {
              className: "font-bold text-black"
            }
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
                text: "Save Subject"
              },
              edit: {
                text: "Update Subject"
              }
            }
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
          edit: "/form/class/edit"
        }
      }
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
            value: "Add New Class"
          },
          edit: {
            value: "Edit Class"
          }
        }
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
            value: "Fill in the details below to add new class."
          },
          edit: {
            value: "Fill in the details below to edit class."
          }
        }
      },
    ],
    sections: [
      {
        title: "Class Information",
        fields: [
          {
            type: "text",
            name: "name",
            label: "Class Name",
            placeholder: "e.g., 10th",
            required: true,
          },
          {
            type: "text",
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
          },
          {
            type: "multiselect",
            name: "sections",
            label: "Sections",
            placeholder: "Select the sections to include",
            required: false,
            items: [],
            isDistinct: true,
            styles: {
              selectStyle: {
                height: "3.5rem",
              }
            }
          },
          {
            type: "multiselect",
            name: "subjects",
            label: "Subjects",
            placeholder: "Select the Subjects to be included",
            required: true,
            items: [],
            isDistinct: true,
            styles: {
              selectStyle: {
                height: "3.5rem"
              }
            }
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
            values: [
              { name: "isActive", text: "Active" }
            ],
            styles: {
              className: "font-bold text-black"
            }
          }
        ]
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
                text: "Save Class"
              },
              edit: {
                text: "Update Class"
              }
            }
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
          edit: "/form/section/edit"
        }
      }
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
            value: "Add New Section"
          },
          edit: {
            value: "Edit Section"
          }
        }
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
            value: "Fill in the details below to add new section."
          },
          edit: {
            value: "Fill in the details below to edit section."
          }
        }
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
          },
          {
            type: "text",
            name: "capacity",
            label: "Capacity (in number)",
            placeholder: "e.g., 50",
            required: true,
          },
          {
            type: "dropdown",
            name: "classId",
            label: "Select Class",
            placeholder: "e.g., Class 10",
            required: true,
            items: [],
            isDistinct: true
          },
          {
            type: "text",
            name: "roomNumber",
            label: "Room Number",
            placeholder: "e.g., 2025-2026",
            required: false,
          },
          {
            type: "dropdown",
            name: "classTeacher",
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
            placeholder: "Select the students",
            items: [],
            isDistinct: true,
            dependancy: ["classId"],
            styles: {
              selectStyle: {
                height: "3.5rem",
              }
            }
          },
          {
            type: "multiselect",
            name: "teachers",
            label: "Teachers",
            placeholder: "Select the teachers",
            required: true,
            items: [],
            isDistinct: true,
            styles: {
              selectStyle: {
                height: "3.5rem"
              }
            }
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
            values: [
              { name: "isActive", text: "Active" }
            ],
            styles: {
              className: "font-bold text-black"
            }
          }
        ]
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
                text: "Save Subject"
              },
              edit: {
                text: "Update Subject"
              }
            }
          },
        ],
      },
    ],
  },
assessment: {
  api: {
    
  },
  info: [
    {
      type: "title",
      value: "Create Assessment",
      tag: "h1",
      styles: {
        className: "text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-text)]",
        inlineStyle: {},
      },
      mode: {
        add: {
          value: "Create Assessment"
        },
        edit: {
          value: "Edit Assessment"
        }
      }
    }
  ],
  sections: [
    {
      title: "Class & Assessment Selection",
      fields: [
        {
          type: "dropdown",
          name: "classGrade",
          label: "Class/Grade",
          placeholder: "Select Class/Grade",
          required: true,
          items: [],
          isDistinct: true
        },
        {
          type: "dropdown",
          name: "subject",
          label: "Subject",
          placeholder: "Select Subject",
          required: true,
          items: [],
          isDistinct: true,
          dependancy: ["classGrade"]
        },
        {
          type: "dropdown",
          name: "section",
          label: "Section (if applicable)",
          placeholder: "Select Section",
          required: false,
          items: [],
          isDistinct: true,
          dependancy: ["classGrade", "subject"]
        },
        {
          type: "multiselect",
          name: "studentGroups",
          label: "Student Group Filtering",
          placeholder: "Select student groups",
          items: [
            { id: "advancedLearners", value: "Advanced Learners" },
            { id: "studentsWithIEPs", value: "Students with IEPs" },
            { id: "morningGroup", value: "Morning Group" }
          ],
          styles: {
            selectStyle: {
              height: "3.5rem"
            }
          }
        }
      ]
    },
    {
      title: "Assessment Details",
      fields: [
        {
          type: "dropdown",
          name: "assessmentType",
          label: "Assessment Type",
          placeholder: "Select Type",
          required: true,
          items: [
            { id: "quiz", value: "Quiz" },
            { id: "test", value: "Test" },
            { id: "exam", value: "Exam" },
            { id: "assignment", value: "Assignment" },
            { id: "project", value: "Project" }
          ]
        },
        {
          type: "text",
          name: "assessmentTitle",
          label: "Assessment Title & Description",
          placeholder: "e.g., Chapter 3 Quiz",
          required: true
        },
        {
          type: "textArea",
          name: "assessmentDescription",
          label: "",
          placeholder: "Optional: Add notes about the assessment...",
          required: false
        }
      ]
    },
    {
      title: "",
      fields: [
        {
          type: "text",
          name: "maximumMarks",
          label: "Maximum Marks",
          placeholder: "e.g., 100",
          required: true
        },
        {
          type: "text",
          name: "weightage",
          label: "Weightage (%) for Overall Grade",
          placeholder: "e.g., 15",
          required: true
        },
        {
          type: "date",
          name: "dueDate",
          label: "Due Date",
          required: true
        },
        {
          type: "date",
          name: "assessmentDate",
          label: "Assessment Date",
          required: true
        }
      ]
    },
    {
      title: "Actions",
      position: "bottom",
      fields: [
        {
          type: "button",
          variant: "outlined",
          text: "Cancel",
          action: "cancel"
        },
        {
          type: "button",
          variant: "contained",
          text: "Create Assessment",
          action: "submit",
          mode: {
            add: {
              text: "Create Assessment"
            },
            edit: {
              text: "Update Assessment"
            }
          }
        }
      ]
    }
  ]
}
};

export default formConfig;