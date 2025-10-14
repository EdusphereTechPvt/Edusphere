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
                action: "demo",
                variant: "contained",
                styles: {
                  // className: "font-bold",
                  inlineStyle: {
                    fontWeight: "bold",
                    py: { xs: 0.4, sm: 1.2, md: 1.5 },
                    // maxWidth: {sm:120, md:140, lg:160},
                    fontSize: { xs: "0.4rem", sm: "0.8rem", md: "0.9rem" },
                    textTransform: "none",
                    
              
                  },
                },
              },
              {
                text: "Sign Up Now",
                action: "auth/signup",
                variant: "outlined",
                styles: {
                  className: "",
                  inlineStyle: {
                    backgroundColor: "white",
                    color: "black",
                    fontWeight: "bold",
                    textTransform: "none",
                    border: "none",
                    py: { xs: 0.4, sm: 1.2, md: 1.5 },
                    minWidth: { sm: 120, md: 140, lg: 160 },
                    fontSize: { xs: "0.4rem", sm: "0.8rem", md: "0.9rem" },
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
                "w-full h-auto object-cover rounded bg-gradient-to-t from-white to-transparent ",
              inlineStyle: { display: "block" },
            },
            containerStyle: {
              className:
                "absolute inset-0 flex flex-col item-center justify-center px-[20%] -space-y-3 mt-5 lg:mt-1 md:mt-2",
              inlineStyle: {},
              textStyle: {
                className: "font-bold text-sm md:text-3xl lg:text-6xl",
                inlineStyle: {},
              },
              descStyle: {
                className: "text-[0.6rem] md:text-base lg:text-lg mt-4",
                inlineStyle: {},
              },
              btnCotainerStyle: {
                className:
                  "flex gap-4 mt-2 sm:mt-12 font-bold items-center justify-center",
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
            imgUrl: "https://placehold.co/600x400",
            styles: {
              cardStyle: {
                inlineStyle: {
                  width: "100%",
                  maxWidth: "380px",
                  marginBottom: { xs: "1.5rem", md: "1.2rem", lg: "0rem" },
                },
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
                      lg: "1.5rem",
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
            title: "Admin Dashboard",
            desc: "Manage all aspects of school operations.",
            imgUrl: "https://placehold.co/600x400",
            styles: {
              cardStyle: {
                inlineStyle: {
                  width: "100%",
                  maxWidth: "380px",
                  marginBottom: { xs: "1.5rem", md: "1.2rem", lg: "0rem" },
                },
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
                      lg: "1.5rem",
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
            title: "Admin Dashboard",
            desc: "Manage all aspects of school operations.",
            imgUrl: "https://placehold.co/600x400",
            styles: {
              cardStyle: {
                inlineStyle: {
                  width: "100%",
                  maxWidth: "380px",
                  marginBottom: { xs: "1.5rem", md: "1.2rem", lg: "0rem" },
                },
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
                      lg: "1.5rem",
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
            title: "Admin Dashboard",
            desc: "Manage all aspects of school operations.",
            imgUrl: "https://placehold.co/600x400",
            styles: {
              cardStyle: {
                inlineStyle: {
                  width: "100%",
                  maxWidth: "380px",
                  marginBottom: { xs: "1.5rem", md: "1.2rem", lg: "0rem" },
                },
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
                      lg: "1.5rem",
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
            avatar: "https://placehold.co/500x500",
            content:
              "Edusphere has transformed our school's efficiency and communication. Highly recommended!",
            name: "Administrator",
            desc: "City High School",
            styles: {
              cardStyle: {
                inlineStyle: {
                  padding: "0",
                  width: "100%",
                  maxWidth: "380px",
                  marginBottom: { xs: "1.5rem", md: "1.2rem", lg: "0rem" },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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
            avatar: "https://placehold.co/500x500",
            content:
              "Edusphere has transformed our school's efficiency and communication. Highly recommended!",
            name: "Administrator",
            desc: "City High School",
            styles: {
              cardStyle: {
                inlineStyle: {
                  padding: "0",
                  width: "100%",
                  maxWidth: "380px",
                  marginBottom: { xs: "1.5rem", md: "1.2rem", lg: "0rem" },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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
            avatar: "https://placehold.co/500x500",
            content:
              "Edusphere has transformed our school's efficiency and communication. Highly recommended!",
            name: "Administrator",
            desc: "City High School",
            styles: {
              cardStyle: {
                inlineStyle: {
                  padding: "0",
                  width: "100%",
                  maxWidth: "380px",
                  marginBottom: { xs: "1.5rem", md: "1.2rem", lg: "0rem" },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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
            avatar: "https://placehold.co/500x500",
            content:
              "Edusphere has transformed our school's efficiency and communication. Highly recommended!",
            name: "Administrator",
            desc: "City High School",
            styles: {
              cardStyle: {
                inlineStyle: {
                  padding: "0",
                  width: "100%",
                  maxWidth: "380px",
                  marginBottom: { xs: "1.5rem", md: "1.2rem", lg: "0rem" },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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
            className:
              "my-8 lg:my-12 flex justify-center items-center gap-4",
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
                  fontWeight:"bold",
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