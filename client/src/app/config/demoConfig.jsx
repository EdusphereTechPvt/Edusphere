import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";

export const demoConfig = {
  sections: [
    {
      title: "Experience Edusphere in Action",
      desc: "Request a personalized demo and discover how our comprehensive school management system can empower your institution.",
      styles: {
        inlineStyle: { marginBottom: "1.5rem", width:'70%' },
        className: "",
        titleStyle: {
          inlineStyle: {
            fontSize: {
              xs: "1.2rem",
              sm: "1.5rem",
              md: "1.6rem",
              lg: "1.7rem",
            },
            fontWeight: "bold",
          },
        },
        descStyle: {
          inlineStyle: {
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1rem", lg: "1rem" },
            color: "var(--color-text-secondary)",
          },
        },
      },
    },
    {
      title: "What to Expect.",
      items: [
        {
          type: "points",
          Icon: CheckCircleOutlineIcon,
          text: "An instant confirmation email upon submission.",
          styles: {
            iconStyle: {
              className: "",
              inlineStyle: {
                color: "var(--color-primary)",
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1rem", lg: "1rem" },
              },
            },
            titleStyle: {
              className: "",
              inlineStyle: {
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1rem", lg: "1rem" },
                color: "var(--color-text-secondary)",
              },
            },
          },
        },
        {
          type: "points",
          Icon: CallOutlinedIcon,
          text: "A follow-up from our team within 24 hours to schedule your demo.",
          styles: {
            iconStyle: {
              className: "",
              inlineStyle: {
                color: "var(--color-primary)",
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1rem", lg: "1rem" },
              },
            },
            titleStyle: {
              className: "",
              inlineStyle: {
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1rem", lg: "1rem" },
                color: "var(--color-text-secondary)",
              },
            },
          },
        },
        {
          type: "points",
          Icon: VideocamOutlinedIcon,
          text: "A personalized demo showcasing the features most relevant to your school.",
          styles: {
            iconStyle: {
              className: "",
              inlineStyle: {
                color: "var(--color-primary)",
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1rem", lg: "1rem" },
              },
            },
            titleStyle: {
              className: "",
              inlineStyle: {
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1rem", lg: "1rem" },
                color: "var(--color-text-secondary)",
              },
            },
          },
        },
      ],
      styles: {
        inlineStyle: { marginBottom: "1.5rem" },
        className: "",
        titleStyle: {
          inlineStyle: {
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem", lg: "1.3rem" },
            fontWeight: "bold",
          },
        },
      },
    },
    {
      title: "Testimonails",
      styles: {
        inlineStyle: {
          marginBottom: "1.5rem",
        },
        className: "",
        titleStyle: {
          inlineStyle: {
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem", lg: "1.3rem" },
            fontWeight: "bold",
          },
        },
      },
      items: [
        {
          type: "testimonials",
          text: `"Edusphere's demo was incredibly insightful. We were able to see exactly how the system would benefit our school. The team was professional and answered all our questions."`,
          author: "- Mr. A. Sharma, Principal, Bright Future School",
          styles: {
            authorStyle: {
              className: "",
              inlineStyle: {
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1rem", lg: "1rem" },
                fontWeight: "bold",
              },
            },
            textStyle: {
              className: "",
              inlineStyle: {
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1rem", lg: "1rem" },
                color: "var(--color-text-secondary)",
              },
            },
          },
        },
      ],
    },
    {
      title: "Frequently Asked Questions",
      styles: {
        titleStyle: {
          inlineStyle: {
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem", lg: "1.3rem" },
            fontWeight: "bold",
          },
        },
      },
      items: [
        {
          type: "dropdown",
          styles:{
            inlineStyle:{
              width:"80%"
            }
          },
          values: [
            {
              title: "How long does a demo take?",
              desc: "Approximately 30–45 minutes depending on your questions.",
              styles: {
                titleStyle: {},
                descStyle: {},
              },
            },
            {
              title: "Can I invite my team?",
              desc: "Yes, you can invite your entire team to join the demo.",
              styles: {
                titleStyle: {},
                descStyle: {},
              },
            },
            {
              title: "Is there a cost for the demo?",
              desc: "No, the demo is completely free and without obligation.",
              styles: {
                titleStyle: {},
                descStyle: {},
              },
            },
          ],
        },
      ],
    },
  ],
};
