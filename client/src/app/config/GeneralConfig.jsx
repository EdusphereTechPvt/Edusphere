import { Twitter, Facebook, LinkedIn, Instagram, Email, Phone, LocationOn } from "@mui/icons-material";
import { Person, Settings, Logout } from "@mui/icons-material";
export const excludeRoutes = [
  /^\/auth\/login$/,
  /^\/auth\/signup$/,
  /^\/forgotpassword(\/.*)?$/
];

export const generalRoutes = [
  "/",
  '/about',
  "/demo",
  "/contact",
  "/privacy",
  "/pricing",
  "/help"
]

export const errorRoutes = ["/error/404", "/error/403", "/error/401"]

export const navItems = {
  default: [
    { id: "home", label: "Home", actionValue: "/", type: "link", action: "navigate" },
    { id: "about", label: "About", actionValue: "/about", type: "link", action: "navigate" },
    { id: "demo", label: "Demo", actionValue: "/demo", type: "link", action: "navigate" },
    { id: "contact", label: "Contact", actionValue: "/contact", type: "link", action: "navigate" },
    { id: "privacy", label: "Privacy", actionValue: "/privacy", type: "link", action: "navigate" },
    { id: "Pricing", label: "Pricing", actionValue: "/pricing", type: "link", action: "navigate" },
  ],
  admin: [
    { id: "dashboard", label: "Dashboard", actionValue: "/dashboard", type: "link", action: "navigate" },
    { id: "manage", label: "Manage School", actionValue: "/manage", type: "link", action: "navigate" },
  ],
  teacher: [
  ],
  student: [
  ],
  parent: [
  ],
};


export const userMenuItems = [
  {
    label: "Profile",
    icon: <Person fontSize="small" />,
    action: "navigate",
    actionValue: "/profile",
  },
  {
    label: "Settings",
    icon: <Settings fontSize="small" />,
    action: "navigate",
    actionValue: "/settings",
  },
  {
    label: "Logout",
    icon: <Logout fontSize="small" />,
    action: "logout",
    actionValue: "/auth/login",
  },
];

export const connectionStatusConfig = {
    connected: { 
      label: "Connected", 
      color: "success",
      bgColor: "rgba(76, 175, 80, 0.1)",
      borderColor: "rgba(76, 175, 80, 0.3)"
    },
    disconnected: { 
      label: "Disconnected", 
      color: "error",
      bgColor: "rgba(244, 67, 54, 0.1)",
      borderColor: "rgba(244, 67, 54, 0.3)"
    },
    connecting: { 
      label: "Connecting...", 
      color: "warning",
      bgColor: "rgba(255, 152, 0, 0.1)",
      borderColor: "rgba(255, 152, 0, 0.3)"
    },
  };

const generalConfig = {
  header: {
    sections: [
      {
        position: "start",
        type: "logo",
        logoUrl: "https://placehold.co/600x400",
        name: "Edushpere",
        styles: {
          inlineStyle: {
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            cursor: 'pointer'
          },
          imgStyle: {
            inlineStyle: {
              // width: {lg:"1rem"}
            },
            className: "w-[3.5rem]",
          },
          nameStyle: {
            inlineStyle: {
              fontSize: { lg: "1.1rem" },
              fontWeight: "bold",
              color: "black",
            },
            className: "",
          },
        },
      },
      {
        position: "center",
        type: "navigate",
        navItems: [],
        styles: {
          inlineStyle: {
            flexDirection: { xs: "column", lg: "row" },
            gap: { xs: "1.5rem", lg: "2em" },
            px: { xs: "1.5rem", md: "1rem", lg: 0 },
          },
          navStyle: {
            inlineStyle: {
              color: "black",
              fontWeight: "600",
              fontSize: "1.2rem",
            },
            className: "",
          },
        },
      },
      {
        position: "end",
        type: "action",
        buttons: [
          {
            variant: "contained",
            text: "Request a Demo",
            onclick: () => window.location.href = "/demo",
            styles: {
              inlineStyle: {
                textTransform: "none",
                fontSize: { xs: "0.7rem", lg: "0.9rem" },
                fontWeight: "bold",
              },
            },
          },
          {
            variant: "contained",
            text: "Sign Up Now",
            onclick: () => window.location.href = "/auth/signup",
            styles: {
              inlineStyle: {
                textTransform: "none",
                fontSize: { xs: "0.7rem", lg: "0.9rem" },
                backgroundColor: "#e8eef3",
                color: "black",
                fontWeight: "bold",
              },
            },
          },
        ],
        styles: {
          inlineStyle: {
            justifyContent: "center",
            mt: { xs: "2rem", md: "1rem", lg: 0 },
          },
        },
      },
      {
        position: "end",
        type: "userMenu",
        menuItems: userMenuItems,
        styles: {
          inlineStyle: {
            display: "flex",
            alignItems: "center",
            gap: 1,
          },
          avatarStyle: {
            sx: {
              width: 32,
              height: 32,
              backgroundColor: "#1a237e",
              cursor: "pointer"
            }
          },
          menuStyle: {
            sx: {
              mt: 1,
              '& .MuiPaper-root': {
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                borderRadius: 2,
              }
            }
          }
        },
      },
    ],
    styles: {
      inlineStyle: {
        display: "flex",
        justifyContent: { lg: "space-between" },
        alignItems: "center",
        py: { xs: "0.4rem", sm: "0.6rem", md: "0.8rem", lg: "1rem" },
        px: { xs: "0.7rem", sm: "0.8rem", md: "1.4rem", lg: "2rem" },
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1100,
      },
      drawerStyle: {
        inlineStyle: {
          width: "17rem",
          alignItems: "center",
        },
      },
    },
  },

  footer: {
    styles: {
      inlineStyle: {
        backgroundColor: "#1a237e",
        background: "linear-gradient(135deg, #1a237e 0%, #283593 50%, #303f9f 100%)",
        color: "white",
        py: { xs: 4, md: 6 },
        px: 2,
        mt: "auto",
      },
    },
    sections: [
      {
        type: "brand",
        logoUrl: "/logo-white.png",
        name: "Edusphere",
        description: "Transforming education through innovative school management solutions that streamline administration, enhance learning, and connect communities.",
        contactInfo: {
          email: "hello@edusphere.com",
          phone: "+91 1234567890",
          address: "Somewhere in India, 700392"
        },
        styles: {
          container: {
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pr: { md: 4 },
          },
          logoStyle: {
            width: 160,
            height: "auto",
            filter: "brightness(0) invert(1)"
          },
          nameStyle: {
            fontSize: "1.75rem",
            fontWeight: "bold",
            color: "white",
            background: "linear-gradient(45deg, #ffffff, #e3f2fd)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          },
          descriptionStyle: {
            color: "#e3f2fd",
            fontSize: "0.95rem",
            lineHeight: 1.6,
            maxWidth: 320
          },
          contactStyle: {
            color: "#e3f2fd",
            fontSize: "0.9rem",
            "&:hover": { color: "white" }
          }
        }
      },
      {
        type: "links",
        title: "Product",
        links: [
          { label: "Features", action: "navigate", actionValue: "/features" },
          { label: "Pricing", action: "navigate", actionValue: "/pricing" },
          { label: "Demo", action: "navigate", actionValue: "/demo" },
        ],
        styles: {
          container: {
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          },
          title: {
            color: "white",
            fontWeight: 700,
            fontSize: "1.1rem",
            mb: 2,
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          },
          link: {
            color: "#e3f2fd",
            fontSize: "0.95rem",
            textDecoration: "none",
            transition: "all 0.3s ease",
            textAlign: "left",
            "&:hover": {
              color: "white",
              transform: "translateX(5px)"
            }
          },
        },
      },
      {
        type: "links",
        title: "Company",
        links: [
          { label: "About Us", action: "navigate", actionValue: "/about" },
          { label: "Careers", action: "navigate", actionValue: "/careers" },
          { label: "Blog", action: "navigate", actionValue: "/blog" },
          { label: "Contact", action: "navigate", actionValue: "/contact" },
          { label: "Partners", action: "navigate", actionValue: "/partners" },
        ],
        styles: {
          container: {
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          },
          title: {
            color: "white",
            fontWeight: 700,
            fontSize: "1.1rem",
            mb: 2,
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          },
          link: {
            color: "#e3f2fd",
            fontSize: "0.95rem",
            textDecoration: "none",
            transition: "all 0.3s ease",
            textAlign: "left",
            "&:hover": {
              color: "white",
              transform: "translateX(5px)"
            }
          },
        },
      },
      {
        type: "links",
        title: "Support",
        links: [
          { label: "Help Center", action: "navigate", actionValue: "/help" },
          { label: "Documentation", action: "navigate", actionValue: "/docs" },
          { label: "Community", action: "navigate", actionValue: "/community" },
        ],
        styles: {
          container: {
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          },
          title: {
            color: "white",
            fontWeight: 700,
            fontSize: "1.1rem",
            mb: 2,
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          },
          link: {
            color: "#e3f2fd",
            fontSize: "0.95rem",
            textDecoration: "none",
            transition: "all 0.3s ease",
            textAlign: "left",
            "&:hover": {
              color: "white",
              transform: "translateX(5px)"
            }
          },
        },
      },
      {
        type: "social",
        title: "Connect With Us",
        links: [
          {
            icon: <Twitter />,
            label: "Twitter",
            action: "external",
            actionValue: "https://twitter.com/edusphere"
          },
          {
            icon: <Facebook />,
            label: "Facebook",
            action: "external",
            actionValue: "https://facebook.com/edusphere"
          },
          {
            icon: <LinkedIn />,
            label: "LinkedIn",
            action: "external",
            actionValue: "https://linkedin.com/company/edusphere"
          },
          {
            icon: <Instagram />,
            label: "Instagram",
            action: "external",
            actionValue: "https://instagram.com/edusphere"
          },
        ],
        styles: {
          container: {
            display: "flex",
            flexDirection: "column",
            gap: 2
          },
          title: {
            color: "white",
            fontWeight: 700,
            fontSize: "1.1rem",
            mb: 2,
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          },
          socialContainer: {
            display: "flex",
            gap: 1,
            flexWrap: "wrap"
          },
          iconStyle: {
            color: "#e3f2fd",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            "&:hover": {
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              transform: "translateY(-2px)"
            },
            transition: "all 0.3s ease",
            width: 48,
            height: 48
          }
        },
      },
    ],
    bottomBar: {
      copyright: `© ${new Date().getFullYear()} Edusphere. All rights reserved.`,
      additionalLinks: [
        { label: "Privacy Policy", action: "navigate", actionValue: "/privacy" },
        { label: "Terms of Service", action: "navigate", actionValue: "/terms" },
        { label: "Cookie Policy", action: "navigate", actionValue: "/cookies" },
      ],
      styles: {
        container: {
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
          pt: 3,
        },
        copyright: {
          color: "#e3f2fd",
          fontSize: "0.9rem",
          fontWeight: 500
        },
        link: {
          color: "#e3f2fd",
          fontSize: "0.9rem",
          textDecoration: "none",
          fontWeight: 500,
          transition: "color 0.3s ease",
          "&:hover": {
            color: "white",
          }
        }
      }
    }
  },
};

export default generalConfig;