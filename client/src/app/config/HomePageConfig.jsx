import {
  AttachMoneyOutlined,
  CalendarMonthOutlined,
  DesktopWindowsOutlined,
  EventNoteOutlined,
  PeopleOutline,
} from "@mui/icons-material";

export const HomePageConfig = {
  sections: [
    {
      type: "header",
      styles: {
        className: "lg:mb-12 mb-8",
        inlineStyle: {},
      },
      items: [
        {
          type: "overlayImage",
          value: {
            imageUrl: "/img1.png",
            text: "Edusphere: Simplifying School Management for a Brighter Future",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            buttons: [
              {
                text: "Request a Demo",
                variant: "contained",
                action: "demo",
                styles: {
                  className: "",
                  inlineStyle: {
                    color: "white",
                    textTransform: "none",
                    fontWeight: "bold",
                    py: { xs: 1, sm: 1.2, md: 1.5 },
                    minWidth: { sm: 120, md: 140, lg: 160 },
                    fontSize: { xs: "0.6rem", sm: "0.8rem", md: "0.9rem" },
                  },
                },
              },
              {
                text: "Sign Up Now",
                variant: "contained",
                action: "auth/signup",
                styles: {
                  className: "",
                  inlineStyle: {
                    color: "black",
                    textTransform: "none",
                    fontWeight: "bold",
                    backgroundColor: "#e8eef3",
                    py: { xs: 1, sm: 1.2, md: 1.5 },
                    minWidth: { sm: 160, md: 140, lg: 160 },
                    fontSize: { xs: "0.6rem", sm: "0.8rem", md: "0.9rem" },
                  },
                },
              },
            ],
          },
          styles: {
            className: "relative text-center w-full",
            inlineStyle: {},
            imgStyle: {
              className:
                "w-full h-[65vh] sm:h-[68vh] md:h-[70vh] lg:h-screen object-cover rounded bg-gradient-to-t from-white to-transparent ",
              inlineStyle: { display: "block" },
            },
            containerStyle: {
              className:
                "absolute inset-0 flex flex-col item-center justify-center px-[8%] lg:px-[20%] -space-y-3 mt-5 lg:mt-1 md:mt-2",
              inlineStyle: {},
              textStyle: {
                className: "font-bold text-xl md:text-3xl lg:text-6xl",
                inlineStyle: {},
              },
              descStyle: {
                className: "text-[0.7rem] md:text-base lg:text-lg mt-4",
                inlineStyle: {},
              },
              btnCotainerStyle: {
                className:
                  "flex gap-4 mt-12 font-bold items-center justify-center",
                inlineStyle: {},
              },
            },
          },
        },
      ],
    },
    {
      type: "features",
      title: "Core Features",
      desc: "Everything you need to run your school smoothly.",
      styles: {
        className: "lg:mb-[120px] mb-[80px]",
        inlineStyle: {},
        title: {
          className:
            "text-base md:text-xl lg:text-4xl font-bold text-center lg:mb-4",
          inlineStyle: {},
        },
        desc: {
          className: "text-center text-[0.6rem] md:text-base mb-8",
          inlineStyle: {},
        },
      },
      items: [
        {
          // tag: "div",
          type: "card",
          data: {
            type: "",
            icon: EventNoteOutlined,
            title: "RFID Attendance",
            desc: "Automated daily attendance, seamless tracking.",
            styles: {
              cardStyle: {
                inlineStyle: {
                  boxShadow: "none",
                  gap: "0.5rem",
                  cursor: "default",
                },
              },
              textContainerStyle: {
                inlineStyle: { textAlign: "center" },
                titleStyle: {
                  inlineStyle: {
                    fontSize: {
                      xs: "0.59rem",
                      sm: "0.75rem",
                      md: "0.85rem",
                      lg: "1rem",
                    },
                    fontWeight: "bold",
                    marginBottom: "0",
                  },
                },
                descStyle: {
                  inlineStyle: {
                    fontSize: {
                      xs: "0.53rem",
                      sm: "0.65rem",
                      md: "0.8rem",
                      lg: "0.9rem",
                      xl: "1rem",
                    },
                  },
                },
              },
              iconContainerStyle: {
                inlineStyle: {
                  backgroundColor: "#e8eef3",
                  borderRadius: "8px",
                },
              },
              iconStyles: {
                inlineStyle: {
                  color: "#2279ce",
                  fontSize: {
                    xs: "1.5rem",
                    sm: "1.75rem",
                    md: "1.85rem",
                    lg: "1.95rem",
                    xl: "2rem",
                  },
                },
                className: "",
              },
            },
          },
          styles: {
            className: "p-4 border rounded shadow flex flex-col items-center",
            inlineStyle: {},
          },
        },
        {
          tag: "div",
          type: "card",
          data: {
            icon: AttachMoneyOutlined,
            title: "Fee Management",
            desc: "Effortless fee collection and record keeping.",
            styles: {
              cardStyle: {
                inlineStyle: {
                  boxShadow: "none",
                  gap: "0.5rem",
                  cursor: "default",
                },
              },
              textContainerStyle: {
                inlineStyle: { textAlign: "center" },
                titleStyle: {
                  inlineStyle: {
                    fontSize: {
                      xs: "0.59rem",
                      sm: "0.75rem",
                      md: "0.85rem",
                      lg: "1rem",
                    },
                    fontWeight: "bold",
                    marginBottom: "0",
                  },
                },
                descStyle: {
                  inlineStyle: {
                    fontSize: {
                      xs: "0.53rem",
                      sm: "0.65rem",
                      md: "0.8rem",
                      lg: "0.9rem",
                      xl: "1rem",
                    },
                  },
                },
              },
              iconContainerStyle: {
                inlineStyle: {
                  backgroundColor: "#e8eef3",
                  borderRadius: "8px",
                },
              },
              iconStyles: {
                inlineStyle: {
                  color: "#2279ce",
                  fontSize: {
                    xs: "1.5rem",
                    sm: "1.75rem",
                    md: "1.85rem",
                    lg: "1.95rem",
                    xl: "2rem",
                  },
                },
                className: "",
              },
            },
          },
          styles: {
            className:
              "p-4 border rounded shadow flex flex-col items-center md:flex-row",
            inlineStyle: {},
          },
        },
        {
          tag: "div",
          type: "card",
          data: {
            icon: PeopleOutline,
            title: "Communication Tools",
            desc: "Instant updates and seamless interaction.",
            styles: {
              cardStyle: {
                inlineStyle: {
                  boxShadow: "none",
                  gap: "0.5rem",
                  cursor: "default",
                },
              },
              textContainerStyle: {
                inlineStyle: { textAlign: "center" },
                titleStyle: {
                  inlineStyle: {
                    fontSize: {
                      xs: "0.59rem",
                      sm: "0.75rem",
                      md: "0.85rem",
                      lg: "1rem",
                    },
                    fontWeight: "bold",
                    marginBottom: "0",
                  },
                },
                descStyle: {
                  inlineStyle: {
                    fontSize: {
                      xs: "0.53rem",
                      sm: "0.65rem",
                      md: "0.8rem",
                      lg: "0.9rem",
                      xl: "1rem",
                    },
                  },
                },
              },
              iconContainerStyle: {
                inlineStyle: {
                  backgroundColor: "#e8eef3",
                  borderRadius: "8px",
                },
              },
              iconStyles: {
                inlineStyle: {
                  color: "#2279ce",
                  fontSize: {
                    xs: "1.5rem",
                    sm: "1.75rem",
                    md: "1.85rem",
                    lg: "1.95rem",
                    xl: "2rem",
                  },
                },
                className: "",
              },
            },
          },
          styles: {
            className:
              "p-4 border rounded shadow flex flex-col items-center md:flex-row",
            inlineStyle: {},
          },
        },
        {
          tag: "div",
          type: "card",
          data: {
            icon: DesktopWindowsOutlined,
            title: "Academic Tracking",
            desc: "Monitor student progress and performance.",
            styles: {
              cardStyle: {
                inlineStyle: {
                  boxShadow: "none",
                  gap: "0.5rem",
                  cursor: "default",
                },
              },
              textContainerStyle: {
                inlineStyle: { textAlign: "center" },
                titleStyle: {
                  inlineStyle: {
                    fontSize: {
                      xs: "0.59rem",
                      sm: "0.75rem",
                      md: "0.85rem",
                      lg: "1rem",
                    },
                    fontWeight: "bold",
                    marginBottom: "0",
                  },
                },
                descStyle: {
                  inlineStyle: {
                    fontSize: {
                      xs: "0.53rem",
                      sm: "0.65rem",
                      md: "0.8rem",
                      lg: "0.9rem",
                      xl: "1rem",
                    },
                  },
                },
              },
              iconContainerStyle: {
                inlineStyle: {
                  backgroundColor: "#e8eef3",
                  borderRadius: "8px",
                },
              },
              iconStyles: {
                inlineStyle: {
                  color: "#2279ce",
                  fontSize: {
                    xs: "1.5rem",
                    sm: "1.75rem",
                    md: "1.85rem",
                    lg: "1.95rem",
                    xl: "2rem",
                  },
                },
                className: "",
              },
            },
          },
          styles: {
            className:
              "p-4 border rounded shadow flex flex-col items-center md:flex-row",
            inlineStyle: {},
          },
        },
      ],
    },
    {
      type: "dashboards",
      title: "Dashboards for Every Role",
      desc: "Tailored views for admins, teachers, students, and parents.",
      styles: {
        className: "lg:mb-[120px] mb-[80px] px-2",
        inlineStyle: {},
        title: {
          className:
            "text-base md:text-xl lg:text-4xl font-bold text-center lg:mb-4",
          inlineStyle: {},
        },
        desc: {
          className: "text-center text-[0.6rem] md:text-base mb-8",
          inlineStyle: {},
        },
      },
      items: [
        {
          type: "card",
          // styles: {
          //   className: "",
          //   inlineStyle: {},
          // },
          data: {
            type: "imgInfo",
            title: "Admin Dashboard",
            desc: "Manage all aspects of school operations.",
            imgUrl: "/admin.JPG",
            styles: {
              cardStyle: {
                inlineStyle: {
                  width: "100%",
                  height: "280px",
                  maxWidth: "380px",
                  marginBottom: { xs: "1.5rem", md: "1.2rem", lg: "0rem" },
                },
              },
              imgstyle: {
                inlineStyle: { objectFit: "contain" },
              },
              infoContainerStyle: {
                inlineStyle: { padding: "0.5rem", textAlign: "left" },

                titleStyle: {
                  inlineStyle: {
                    fontWeight: "bold",
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.85rem",
                      md: "0.85rem",
                      lg: "1.2rem",
                    },
                    marginBottom: "0.2rem",
                  },
                },
                descStyle: {
                  inlineStyle: {
                    fontSize: {
                      xs: "0.65rem",
                      sm: "0.75rem",
                      md: "0.79rem",
                      lg: "1rem",
                    },
                    marginBottom: 0,
                  },
                },
              },
            },
          },
        },
        {
          type: "card",
          // styles: {
          //   className: "",
          //   inlineStyle: {},
          // },
          data: {
            type: "imgInfo",
            title: "Student Dashboard",
            desc: "Access learning materials and grades.",
            imgUrl: "/student.JPG",
            styles: {
              cardStyle: {
                inlineStyle: {
                  width: "100%",
                  height: "280px",
                  maxWidth: "380px",
                  marginBottom: { xs: "1.5rem", md: "1.2rem", lg: "0rem" },
                },
              },
              imgstyle: {
                inlineStyle: { objectFit: "contain" },
              },
              infoContainerStyle: {
                inlineStyle: { padding: "0.5rem", textAlign: "left" },

                titleStyle: {
                  inlineStyle: {
                    fontWeight: "bold",
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.85rem",
                      md: "0.85rem",
                      lg: "1.2rem",
                    },
                    marginBottom: "0.2rem",
                  },
                },
                descStyle: {
                  inlineStyle: {
                    fontSize: {
                      xs: "0.65rem",
                      sm: "0.75rem",
                      md: "0.79rem",
                      lg: "1rem",
                    },
                    marginBottom: 0,
                  },
                },
              },
            },
          },
        },
        {
          type: "card",
          // styles: {
          //   className: "",
          //   inlineStyle: {},
          // },
          data: {
            type: "imgInfo",
            title: "Teacher Dashboard",
            desc: "Track student proress and communicate",
            imgUrl: "/teacher.JPG",
            styles: {
              cardStyle: {
                inlineStyle: {
                  width: "100%",
                  height: "280px",
                  maxWidth: "380px",
                  marginBottom: { xs: "1.5rem", md: "1.2rem", lg: "0rem" },
                },
              },
              imgstyle: {
                inlineStyle: { objectFit: "contain" },
              },
              infoContainerStyle: {
                inlineStyle: { padding: "0.5rem", textAlign: "left" },

                titleStyle: {
                  inlineStyle: {
                    fontWeight: "bold",
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.85rem",
                      md: "0.85rem",
                      lg: "1.2rem",
                    },
                    marginBottom: "0.2rem",
                  },
                },
                descStyle: {
                  inlineStyle: {
                    fontSize: {
                      xs: "0.65rem",
                      sm: "0.75rem",
                      md: "0.79rem",
                      lg: "1rem",
                    },
                    marginBottom: 0,
                  },
                },
              },
            },
          },
        },
        {
          type: "card",
          // styles: {
          //   className: "",
          //   inlineStyle: {},
          // },
          data: {
            type: "imgInfo",
            title: "Parent Dashboard",
            desc: "Stay connected with your childs education",
            imgUrl: "/parent.JPG",
            styles: {
              cardStyle: {
                inlineStyle: {
                  width: "100%",
                  height: "280px",
                  maxWidth: "380px",
                  marginBottom: { xs: "1.5rem", md: "1.2rem", lg: "0rem" },
                },
              },
              imgstyle: {
                inlineStyle: { objectFit: "contain" },
              },
              infoContainerStyle: {
                inlineStyle: { padding: "0.5rem", textAlign: "left" },

                titleStyle: {
                  inlineStyle: {
                    fontWeight: "bold",
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.85rem",
                      md: "0.85rem",
                      lg: "1.2rem",
                    },
                    marginBottom: "0.2rem",
                  },
                },
                descStyle: {
                  inlineStyle: {
                    fontSize: {
                      xs: "0.65rem",
                      sm: "0.75rem",
                      md: "0.79rem",
                      lg: "1rem",
                    },
                    marginBottom: 0,
                  },
                },
              },
            },
          },
        },
      ],
    },
    {
      type: "howItWorks",
      title: "How It Works",
      desc: "Get started in three simple steps.",
      styles: {
        className: "lg:mb-[120px] mb-[80px]",
        inlineStyle: {},
        title: {
          className:
            "text-base md:text-xl lg:text-4xl font-bold text-center lg:mb-4",
          inlineStyle: {},
        },
        desc: {
          className: "text-center text-[0.6rem] md:text-base mb-8",
          inlineStyle: {},
        },
      },
      items: [
        {
          tag: "div",
          type: "card",
          data: {
            type: "",
            icon: "1",
            title: "Easy Setup & Onboarding",
            desc: "Our team helps you get set up quickly and efficiently.",
            styles: {
              cardStyle: {
                inlineStyle: {
                  boxShadow: "none",
                  gap: "0.5rem",
                  cursor: "default",
                },
              },
              textContainerStyle: {
                inlineStyle: { textAlign: "center" },
                titleStyle: {
                  inlineStyle: {
                    fontSize: {
                      xs: "0.59rem",
                      sm: "0.75rem",
                      md: "0.85rem",
                      lg: "1rem",
                    },
                    fontWeight: "bold",
                    marginBottom: "0",
                  },
                },
                descStyle: {
                  inlineStyle: {
                    fontSize: {
                      xs: "0.53rem",
                      sm: "0.65rem",
                      md: "0.8rem",
                      lg: "0.9rem",
                      xl: "1rem",
                    },
                  },
                },
              },
              iconContainerStyle: {
                inlineStyle: {
                  backgroundColor: "#2279ce",
                  borderRadius: "50%",
                  height: { xs: "35px", sm: "40px", md: "45px", lg: "50px" },
                  width: { xs: "35px", sm: "40px", md: "45px", lg: "50px" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
              },
              iconStyles: {
                inlineStyle: {
                  color: "white",
                  fontSize: { xs: "22px", sm: "25px", md: "27px", lg: "30px" },
                },
              },
            },
          },
          styles: { className: "p-4", inlineStyle: {} },
        },
        {
          tag: "div",
          type: "card",
          data: {
            type: "",
            icon: "2",
            title: "Seamless Daily Operations",
            desc: "Integrate Edusphere into your daily school activities with ease.",
            styles: {
              cardStyle: {
                inlineStyle: {
                  boxShadow: "none",
                  gap: "0.5rem",
                  cursor: "default",
                },
              },
              textContainerStyle: {
                inlineStyle: { textAlign: "center" },
                titleStyle: {
                  inlineStyle: {
                    fontSize: {
                      xs: "0.59rem",
                      sm: "0.75rem",
                      md: "0.85rem",
                      lg: "1rem",
                    },
                    fontWeight: "bold",
                    marginBottom: "0",
                  },
                },
                descStyle: {
                  inlineStyle: {
                    fontSize: {
                      xs: "0.53rem",
                      sm: "0.65rem",
                      md: "0.8rem",
                      lg: "0.9rem",
                      xl: "1rem",
                    },
                  },
                },
              },
              iconContainerStyle: {
                inlineStyle: {
                  backgroundColor: "#2279ce",
                  borderRadius: "50%",
                  height: { xs: "35px", sm: "40px", md: "45px", lg: "50px" },
                  width: { xs: "35px", sm: "40px", md: "45px", lg: "50px" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
              },
              iconStyles: {
                inlineStyle: {
                  color: "white",
                  fontSize: { xs: "22px", sm: "25px", md: "27px", lg: "30px" },
                },
              },
            },
          },
          styles: { className: "p-4", inlineStyle: {} },
        },
        {
          tag: "div",
          type: "card",
          data: {
            type: "",
            icon: "3",
            title: "Empowering Insights",
            desc: "Utilize data and reports to improve school performance.",
            styles: {
              cardStyle: {
                inlineStyle: {
                  boxShadow: "none",
                  gap: "0.5rem",
                  cursor: "default",
                },
              },
              textContainerStyle: {
                inlineStyle: { textAlign: "center" },
                titleStyle: {
                  inlineStyle: {
                    fontSize: {
                      xs: "0.59rem",
                      sm: "0.75rem",
                      md: "0.85rem",
                      lg: "1rem",
                    },
                    fontWeight: "bold",
                    marginBottom: "0",
                  },
                },
                descStyle: {
                  inlineStyle: {
                    fontSize: {
                      xs: "0.53rem",
                      sm: "0.65rem",
                      md: "0.8rem",
                      lg: "0.9rem",
                      xl: "1rem",
                    },
                  },
                },
              },
              iconContainerStyle: {
                inlineStyle: {
                  backgroundColor: "#2279ce",
                  borderRadius: "50%",
                  height: { xs: "35px", sm: "40px", md: "45px", lg: "50px" },
                  width: { xs: "35px", sm: "40px", md: "45px", lg: "50px" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
              },
              iconStyles: {
                inlineStyle: {
                  color: "white",
                  fontSize: { xs: "22px", sm: "25px", md: "27px", lg: "30px" },
                },
              },
            },
          },
          styles: { className: "p-4", inlineStyle: {} },
        },
      ],
    },
    {
      type: "testimonials",
      title: "What Our Users Say",
      desc: "Trusted by schools across India.",
      styles: {
        className: "lg:mb-[120px] mb-[80px] px-2",
        inlineStyle: {},
        title: {
          className:
            "text-base md:text-xl lg:text-4xl font-bold text-center lg:mb-4",
          inlineStyle: {},
        },
        desc: {
          className: "text-center text-[0.6rem] md:text-base mb-8",
          inlineStyle: {},
        },
      },
      items: [
        {
          tag: "div",
          type: "card",
          data: {
            type: "testimonial",
            avatar:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkh_r9oYMaiOOPt14a8eiQqj34C1x33zmmxg&s",
            content:
              "Edusphere has transformed our school's efficiency and communication. Highly recommended!",
            name: "Administrator",
            desc: "Jain Secondary School",
            styles: {
              cardStyle: {
                inlineStyle: {
                  padding: "0",
                  width: "100%",
                  maxWidth: "380px",
                  marginBottom: { xs: "1.5rem", md: "1.2rem", lg: "0rem" },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 22px rgba(0,0,0,0.12)",
                  },
                },
              },
              textStyle: {
                inlineStyle: {
                  fontSize: {
                    xs: "0.75rem",
                    sm: "0.85rem",
                    md: "0.85rem",
                    lg: "1rem",
                  },
                },
              },
              avatarStyle: {
                inlineStyle: {
                  height: { xs: 35, sm: 39, md: 40, lg: 44 },
                  width: { xs: 35, sm: 39, md: 40, lg: 44 },
                  mb: -1,
                },
              },
              infoContainerStyle: {
                inlineStyle: {
                  mb: -1,
                  fontSize: {
                    xs: "0.85rem",
                    sm: "0.9rem",
                    md: "0.92rem",
                    lg: "1rem",
                  },
                },
              },
            },
          },
          styles: {
            className: "p-4 italic border rounded shadow mx-auto",
            inlineStyle: {},
          },
        },
        {
          tag: "div",
          type: "card",
          data: {
            type: "testimonial",
            avatar:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3BmaxMlPPeFoVIlpg8JTLyiPSZvIWxhtEibhT4HabrPC6B57hIK_cW4OxJqAEkEtzzdc&usqp=CAU",
            content:
              "Edusphere helped us embrace the future, adapt to new changes and showing us what we had truly been missing.",
            name: "Principal",
            desc: "Delhi Public School",
            styles: {
              cardStyle: {
                inlineStyle: {
                  padding: "0",
                  width: "100%",
                  maxWidth: "380px",
                  marginBottom: { xs: "1.5rem", md: "1.2rem", lg: "0rem" },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 22px rgba(0,0,0,0.12)",
                  },
                },
              },
              textStyle: {
                inlineStyle: {
                  fontSize: {
                    xs: "0.75rem",
                    sm: "0.85rem",
                    md: "0.85rem",
                    lg: "1rem",
                  },
                },
              },
              avatarStyle: {
                inlineStyle: {
                  height: { xs: 35, sm: 39, md: 40, lg: 44 },
                  width: { xs: 35, sm: 39, md: 40, lg: 44 },
                  mb: -1,
                },
              },
              infoContainerStyle: {
                inlineStyle: {
                  mb: -1,
                  fontSize: {
                    xs: "0.85rem",
                    sm: "0.9rem",
                    md: "0.92rem",
                    lg: "1rem",
                  },
                },
              },
            },
          },
          styles: {
            className: "p-4 italic border rounded shadow mx-auto",
            inlineStyle: {},
          },
        },
        {
          tag: "div",
          type: "card",
          data: {
            type: "testimonial",
            avatar:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyBxpqHlfJqO0Z4sHEHVNAjpR5PhiimtHb0w&s",
            content:
              "It’s a fabulous product for schools with so many features, it allows us to focus more on delivering quality teaching.",
            name: "Admin",
            desc: "Ravi Memmorial School",
            styles: {
              cardStyle: {
                inlineStyle: {
                  padding: "0",
                  width: "100%",
                  maxWidth: "380px",
                  marginBottom: { xs: "1.5rem", md: "1.2rem", lg: "0rem" },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 22px rgba(0,0,0,0.12)",
                  },
                },
              },
              textStyle: {
                inlineStyle: {
                  fontSize: {
                    xs: "0.75rem",
                    sm: "0.85rem",
                    md: "0.85rem",
                    lg: "1rem",
                  },
                },
              },
              avatarStyle: {
                inlineStyle: {
                  height: { xs: 35, sm: 39, md: 40, lg: 44 },
                  width: { xs: 35, sm: 39, md: 40, lg: 44 },
                  mb: -1,
                },
              },
              infoContainerStyle: {
                inlineStyle: {
                  mb: -1,
                  fontSize: {
                    xs: "0.85rem",
                    sm: "0.9rem",
                    md: "0.92rem",
                    lg: "1rem",
                  },
                },
              },
            },
          },
          styles: {
            className: "p-4 italic border rounded shadow mx-auto",
            inlineStyle: {},
          },
        },
        {
          tag: "div",
          type: "card",
          data: {
            type: "testimonial",
            avatar:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-43JWsK8j9fnt0osUplkLGP4otu9KXUNXSw&s",
            content:
              "It’s a remarkable tool for schools — its smart automation and rich features help us dedicate more time to effective teaching.",
            name: "Administrator",
            desc: "Angel Public School",
            styles: {
              cardStyle: {
                inlineStyle: {
                  padding: "0",
                  width: "100%",
                  maxWidth: "380px",
                  marginBottom: { xs: "1.5rem", md: "1.2rem", lg: "0rem" },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 22px rgba(0,0,0,0.12)",
                  },
                },
              },
              textStyle: {
                inlineStyle: {
                  fontSize: {
                    xs: "0.75rem",
                    sm: "0.85rem",
                    md: "0.85rem",
                    lg: "1rem",
                  },
                },
              },
              avatarStyle: {
                inlineStyle: {
                  height: { xs: 35, sm: 39, md: 40, lg: 44 },
                  width: { xs: 35, sm: 39, md: 40, lg: 44 },
                  mb: -1,
                },
              },
              infoContainerStyle: {
                inlineStyle: {
                  mb: -1,
                  fontSize: {
                    xs: "0.85rem",
                    sm: "0.9rem",
                    md: "0.92rem",
                    lg: "1rem",
                  },
                },
              },
            },
          },
          styles: {
            className: "p-4 italic border rounded shadow mx-auto",
            inlineStyle: {},
          },
        },
      ],
    },
    {
      type: "footer",
      title: "Ready to Transform Your School?",
      styles: {
        className: "lg:mb-[120px] mb-[80px] px-2",
        inlineStyle: {},
        title: {
          className:
            "text-base md:text-xl lg:text-4xl font-bold text-center lg:mb-4",
          inlineStyle: {},
        },
        desc: {
          className: "text-center text-[0.6rem] md:text-base mb-8",
          inlineStyle: {},
        },
      },
      items: [
        {
          type: "buttonGroup",
          styles: {
            className: "my-8 lg:my-12 flex justify-center items-center gap-4",
            inlineStyle: {},
          },
          buttons: [
            {
              text: "Request a Demo",
              variant: "contained",
              action: "demo",
              styles: {
                className: "",
                inlineStyle: {
                  color: "white",
                  textTransform: "none",
                  fontWeight: "bold",
                  py: { xs: 1, sm: 1.2, md: 1.5 },
                  minWidth: { sm: 120, md: 140, lg: 160 },
                  fontSize: { xs: "0.6rem", sm: "0.8rem", md: "0.9rem" },
                },
              },
            },
            {
              text: "Sign Up Now",
              variant: "contained",
              action: "auth/signup",
              styles: {
                className: "",
                inlineStyle: {
                  color: "black",
                  textTransform: "none",
                  fontWeight: "bold",
                  backgroundColor: "#e8eef3",
                  py: { xs: 1, sm: 1.2, md: 1.5 },
                  minWidth: { sm: 160, md: 140, lg: 160 },
                  fontSize: { xs: "0.6rem", sm: "0.8rem", md: "0.9rem" },
                },
              },
            },
          ],
        },
      ],
    },
  ],
};
